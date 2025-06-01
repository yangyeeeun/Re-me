package com.example.Re.me.Theme.Entity;

import com.example.Re.me.Theme.DTO.ThemeResponseDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "theme")
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    public Theme(String name, String imageUrl) {
        this.name = name;
        this.imageUrl = imageUrl;
    }
}
