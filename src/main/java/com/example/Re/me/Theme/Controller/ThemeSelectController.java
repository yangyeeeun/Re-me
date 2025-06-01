package com.example.Re.me.Theme.Controller;

import com.example.Re.me.Theme.DTO.ThemeResponseDto;
import com.example.Re.me.Theme.Service.ThemeSelectService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ThemeSelectController {
    private final ThemeSelectService themeSelectService;

    @PostConstruct
    public void init() {
        themeSelectService.initializeThemes();
    }

    @GetMapping("/api/themes/{id}")
    public ResponseEntity<ThemeResponseDto> ThemeSelectOne(@PathVariable Long id){
        try {
            ThemeResponseDto theme = themeSelectService.getThemeById(id);
            return ResponseEntity.ok(theme);
        }catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/api/themes")
    public ResponseEntity<List<ThemeResponseDto>> getAllThemes(){
        List<ThemeResponseDto> themes = themeSelectService.getAllThemes();
        return ResponseEntity.ok(themes);
    }
}
