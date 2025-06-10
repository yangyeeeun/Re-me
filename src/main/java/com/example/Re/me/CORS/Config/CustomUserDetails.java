package com.example.Re.me.CORS.Config;

import com.example.Re.me.User.Entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@Getter
public class CustomUserDetails implements OAuth2User {

    private final User user;
    private final Map<String, Object> attributes;
    private final String nameAttributeKey;

    public CustomUserDetails(User user, Map<String, Object> attributes, String nameAttributeKey) {
        this.user = user;
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // ✅ User 엔티티의 role을 권한으로 변환 (예: "USER" → "ROLE_USER")
        return Collections.singleton(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase())
        );
    }

    @Override
    public String getName() {
        // ✅ user-name-attribute와 일치하는 속성 반환 (카카오는 "id")
        return attributes.get(nameAttributeKey).toString();
    }

    // 추가: 편의 메서드
    public Long getKakaoId() {
        return user.getKakaoId();
    }

    public String getNickname() {
        return user.getNickname();
    }
}
