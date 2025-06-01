package com.example.Re.me.Capsule.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CapsuleResponseDto {
    private Long themeId;
    private String title;
    private String content;
    private String location;
    private LocalDateTime openDate;
    private String media;  // mediaPath 값을 응답에서 사용
    private Boolean isOpened;
}

