package com.example.Re.me.Capsule.Entity;

import com.example.Re.me.Location.Entity.Location;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@Table(name = "capsule", indexes = {
    @Index(name = "idx_opened_date", columnList = "isOpened, openDate")
})
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
    private LocalDateTime openDate;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "is_opened")
    private Boolean isOpened;

    @Column(name = "media_path")  // 파일 경로를 저장할 필드 추가
    private String mediaPath;

    @Column(name = "theme_id")
    private Long themeId;

    @Column(name = "modified_at")
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "location_id")
    private Location location;
}
