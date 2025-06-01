//package com.example.Re.me.CORS.Config;
//
//import com.example.Re.me.User.Entity.User;
//import lombok.Getter;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//
//import java.util.Collection;
//import java.util.Collections;
//import java.util.Map;
//
//@Getter
//public class CustomUserDetails implements OAuth2User {
//
//    private final User user;
//    private final Map<String, Object> attributes;
//
//    public CustomUserDetails(User user, Map<String, Object> attributes) {
//        this.user = user;
//        this.attributes = attributes;
//    }
//
//    @Override
//    public Map<String, Object> getAttributes() {
//        return attributes;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
//    }
//
//    @Override
//    public String getName() {
//        return user.getEmail();
//    }
//}
//
