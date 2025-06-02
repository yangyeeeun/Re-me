package com.example.Re.me.Capsule.DTO;

import com.example.Re.me.Capsule.Entity.Capsule;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CapsuleResponseDto {
    private Long id;
    private Long themeId;
    private String title;
    private String content;
    private String locationName;
    private LocalDateTime openDate;
    private String media;  // mediaPath 값을 응답에서 사용
    private LocalDateTime createdAt;
    private Boolean isOpened;
    private Double latitude;
    private Double longitude;

    public CapsuleResponseDto(Capsule capsule){
        this.id = capsule.getId();
        this.themeId = capsule.getThemeId();
        this.title = capsule.getTitle();
        this.content = capsule.getContent();
        this.locationName = capsule.getLocationName();
        this.openDate = capsule.getOpenDate();
        this.media = capsule.getMediaPath();
        this.isOpened = capsule.getIsOpened();
        this.createdAt= capsule.getCreatedAt();
        if (capsule.getLocation().getLatitude() != null) {
            this.latitude = capsule.getLocation().getLatitude();
            this.longitude = capsule.getLocation().getLongitude();
        } else {
            this.latitude = null;
            this.longitude = null;
        }
    }
}

