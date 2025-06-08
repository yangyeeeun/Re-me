package com.example.Re.me.CORS.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry){
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("POST", "GET", "PUT", "DELETE")
                        .allowCredentials(true);
            }

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                // 이미지 URL 매핑 (e.g., http://localhost:8080/uploads/파일명)
                registry.addResourceHandler("/uploads/**")
                        .addResourceLocations("file:uploads/");  // uploads 폴더 경로 앞에 꼭 'file:' 붙이기!
            }
        };
    }
}
