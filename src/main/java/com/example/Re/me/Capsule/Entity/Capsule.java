package com.example.Re.me.Capsule.Entity;

import com.example.Re.me.MediaFile.Entity.Media;
import com.example.Re.me.Theme.Entity.Theme;
import com.example.Re.me.User.Entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "capsule")
public class Capsule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "open_date")
    @LastModifiedDate
    private LocalDateTime openDate;

    @Column(name = "location")
    private String location;

    @Column(name = "is_opened")
    private Boolean isOpened;

    @Column(name = "media_path")  // 파일 경로를 저장할 필드 추가
    private String mediaPath;

    @Column(name = "theme_id")
    private Long themeId;

}
