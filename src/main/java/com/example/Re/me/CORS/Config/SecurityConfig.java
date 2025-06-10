package com.example.Re.me.CORS.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final CustomOAuth2UserService customOAuth2UserService;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http
	        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	        .csrf(AbstractHttpConfigurer::disable)
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/", "/login", "/oauth2/**").permitAll()
	            .anyRequest().authenticated()
	        )
	        .oauth2Login(oauth2 -> oauth2
	            .userInfoEndpoint(userInfo -> userInfo
	                .userService(customOAuth2UserService)
	            )
	            .successHandler((request, response, authentication) -> {
	                response.sendRedirect("http://localhost:3000/dashboard");
	            })
	        );
	    return http.build();
	}



	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration config = new CorsConfiguration();
	    config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // React 프론트 허용
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    config.setAllowCredentials(true); // 쿠키/인증 허용
	    config.setExposedHeaders(Arrays.asList("Set-Cookie")); // 쿠키 접근 허용

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);
	    return source;
	}

}
