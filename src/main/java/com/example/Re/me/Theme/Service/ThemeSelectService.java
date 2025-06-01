package com.example.Re.me.Theme.Service;

import com.example.Re.me.Theme.DTO.ThemeResponseDto;
import com.example.Re.me.Theme.Entity.Theme;
import com.example.Re.me.Theme.Repository.ThemeRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ThemeSelectService {
    private final ThemeRepository themeRepository;
    @Transactional
    public ThemeResponseDto getThemeById(Long id){
        Optional<Theme> themeOptional =  themeRepository.findById(id);
        if (themeOptional.isPresent()) {
            return new ThemeResponseDto(themeOptional.get());
        } else {
            throw new IllegalStateException("테마를 찾을 수 없습니다.");
        }
    }

    public List<ThemeResponseDto> getAllThemes(){
        return themeRepository.findAll().stream()
                .map(ThemeResponseDto::new)
                .collect(Collectors.toList());
    }

    @PostConstruct
    public void initializeThemes(){
        if(themeRepository.count() == 0){
            themeRepository.save(new Theme("happy", "/images/themes/happy.png"));
            themeRepository.save(new Theme("surprise", "/images/themes/surprise.png"));
            themeRepository.save(new Theme("sad", "/images/themes/sad.png"));
            themeRepository.save(new Theme("enjoy", "/images/themes/enjoy.png"));
            themeRepository.save(new Theme("shiver", "/images/themes/shiver.png"));
            themeRepository.save(new Theme("calm", "/images/themes/calm.png"));
            themeRepository.save(new Theme("nervous", "/images/themes/nervous.png"));
            themeRepository.save(new Theme("upset", "/images/themes/upset.png"));
        }
    }
}
