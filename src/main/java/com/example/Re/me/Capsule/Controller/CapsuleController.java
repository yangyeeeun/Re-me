package com.example.Re.me.Capsule.Controller;

import com.example.Re.me.Capsule.DTO.CapsuleRequestDto;
import com.example.Re.me.Capsule.DTO.CapsuleResponseDto;
import com.example.Re.me.Capsule.Service.CapsuleService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CapsuleController {
    private final CapsuleService capsuleService;

    public CapsuleController(CapsuleService capsuleService) {
        this.capsuleService = capsuleService;
    }

    @PostMapping(value = "/letter", consumes = {"multipart/form-data"})
    public CapsuleResponseDto saveCapsule(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("location") String location,
            @RequestParam("openDate") String openDate,
            @RequestParam(value = "media", required = false) MultipartFile media,
            @RequestParam(value="themeId") Long theme_id
    ) {
        CapsuleRequestDto capsuleDto = new CapsuleRequestDto();
        capsuleDto.setThemeId(theme_id);
        capsuleDto.setTitle(title);
        capsuleDto.setContent(content);
        capsuleDto.setLocation(location);
        capsuleDto.setOpenDate(LocalDateTime.parse(openDate));
        capsuleDto.setMedia(media);
        return capsuleService.saveCapsule(capsuleDto);
    }

    @GetMapping("/letters")
    public List<CapsuleResponseDto> getMyCapsules() {
        return capsuleService.getAllCapsules();
    }
}
