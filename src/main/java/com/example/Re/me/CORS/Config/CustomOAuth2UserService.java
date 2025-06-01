//package com.example.Re.me.CORS.Config;
//
//import com.example.Re.me.User.Entity.User;
//import com.example.Re.me.User.Repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.util.Collections;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
//
//    private final UserRepository userRepository;
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
//        OAuth2User oAuth2User = delegate.loadUser(userRequest);
//
//        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // kakao
//        Map<String, Object> attributes = oAuth2User.getAttributes();
//
//        // 카카오에서 받아온 데이터
//        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
//        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
//
//        Long kakaoId = ((Number) attributes.get("id")).longValue();
//        String email = (String) kakaoAccount.get("email");
//        String nickname = (String) profile.get("nickname");
//        String profileImage = (String) profile.get("profile_image_url");
//
//        // 외부 변수 final 처리
//        final Long finalKakaoId = kakaoId;
//        final String finalEmail = email;
//        final String finalNickname = nickname;
//        final String finalProfileImage = profileImage;
//
//        // 저장 or 업데이트
//        User user = userRepository.findByEmail(finalEmail)
//                .orElseGet(() -> userRepository.save(
//                        User.builder()
//                                .kakaoId(finalKakaoId)
//                                .email(finalEmail)
//                                .nickname(finalNickname)
//                                .profileImage(finalProfileImage)
//                                .provider("kakao")
//                                .role("USER")
//                                .build()
//                ));
//
//        return new DefaultOAuth2User(
//                Collections.singleton(new SimpleGrantedAuthority(user.getRole())),
//                attributes,
//                "id" // 카카오의 기본 키 속성 이름
//        );
//    }
//}
//
//
