package com.example.Re.me.User.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(name = "kakaoId")
    private Long kakaoId;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "profileImage")
    private String profileImage;

    @Column(name = "email")
    private String email;

    @Column(name = "provider")
    private String provider;

    @Column(name = "role")
    private String role;

    @CreatedDate
    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Builder
    public User(Long kakaoId, String nickname, String profileImage, String email, String provider, String role) {
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.email = email;
        this.provider = provider;
        this.role = role;
    }
}
