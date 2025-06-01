package com.example.Re.me.Theme.DTO;

import com.example.Re.me.Theme.Entity.Theme;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ThemeResponseDto {
    private Long id;
    private String name;
    private String imageUrl;

    public ThemeResponseDto(Theme theme){
        this.id = theme.getId();
        this.name = theme.getName();
        this.imageUrl = theme.getImageUrl();
    }
}
