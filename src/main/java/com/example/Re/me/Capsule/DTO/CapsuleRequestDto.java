package com.example.Re.me.Capsule.DTO;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
public class CapsuleRequestDto {
    private Long themeId;
    private String title;
    private String content;
    private String locationName;
    private LocalDateTime openDate;
    private MultipartFile media;

    private Double latitude;
    private Double longitude;
}
