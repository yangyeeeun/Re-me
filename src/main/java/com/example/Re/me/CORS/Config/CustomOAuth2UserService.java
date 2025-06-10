package com.example.Re.me.CORS.Config;

import com.example.Re.me.User.Entity.User;
import com.example.Re.me.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        Map<String, Object> attributes = null;
        try {
            OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
            OAuth2User oAuth2User = delegate.loadUser(userRequest);
            attributes = oAuth2User.getAttributes();
            
            // ✅ 로그 추가: 카카오에서 받은 데이터 전체 출력
            System.out.println("카카오 응답 데이터: " + attributes);

            // 사용자 정보 추출 로직
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
            
            // 필수 필드 검증
            if (profile == null) {
                throw new RuntimeException("프로필 정보가 없습니다.");
            }

            Long kakaoId = ((Number) attributes.get("id")).longValue();
            String nickname = (String) profile.get("nickname");
            String profileImage = (String) profile.get("profile_image_url");
            String email = (String) kakaoAccount.get("email");

            // DB 저장 로직
            User user = userRepository.findByKakaoId(kakaoId)
                    .orElseGet(() -> userRepository.save(
                            User.builder()
                                    .kakaoId(kakaoId)
                                    .nickname(nickname)
                                    .profileImage(profileImage)
                                    .email(email)
                                    .provider("kakao")
                                    .role("USER")
                                    .build()
                    ));

            // ✅ 로그 추가: 저장된 사용자 정보 출력
            System.out.println("저장된 사용자: " + user);

            return new DefaultOAuth2User(
                    Collections.singleton(new SimpleGrantedAuthority(user.getRole())),
                    attributes,
                    "id"
            );
        } catch (Exception e) {
            // ✅ 예외 상세 정보 출력
            System.err.println("OAuth2 인증 실패: " + e.getMessage());
            e.printStackTrace();
            throw new OAuth2AuthenticationException(new OAuth2Error("authentication_failed", e.getMessage(), null), e);
        }
    }
}