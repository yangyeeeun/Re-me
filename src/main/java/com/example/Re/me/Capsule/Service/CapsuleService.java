package com.example.Re.me.Capsule.Service;

import com.example.Re.me.Capsule.DTO.CapsuleRequestDto;
import com.example.Re.me.Capsule.DTO.CapsuleResponseDto;
import com.example.Re.me.Capsule.Entity.Capsule;
import com.example.Re.me.Capsule.Repository.CapsuleRepository;
import com.example.Re.me.Location.Repository.LocationRepository;
import org.springframework.boot.context.config.ConfigDataLocationResolver;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import com.example.Re.me.Location.Entity.Location;
@Service
public class CapsuleService {

    private final CapsuleRepository capsuleRepository;
    private final LocationRepository locationRepository;
    private final String UPLOAD_DIR = "uploads/";

    public CapsuleService(CapsuleRepository capsuleRepository, LocationRepository locationRepository) {
        this.capsuleRepository = capsuleRepository;
        this.locationRepository = locationRepository;
    }

    @Transactional
    public CapsuleResponseDto saveCapsule(CapsuleRequestDto capsuleDto) {
        Capsule capsule = new Capsule();
        capsule.setTitle(capsuleDto.getTitle());
        capsule.setContent(capsuleDto.getContent());
        capsule.setLocationName(capsuleDto.getLocationName());
        capsule.setCreatedAt(LocalDateTime.now());
        capsule.setOpenDate(capsuleDto.getOpenDate());
        capsule.setIsOpened(false);
        capsule.setThemeId(capsuleDto.getThemeId());

        if (capsuleDto.getLatitude() != null && capsuleDto.getLongitude() != null) {
            Location location = new Location();
            location.setLatitude(capsuleDto.getLatitude());
            location.setLongitude(capsuleDto.getLongitude());
            location.setName(capsuleDto.getLocationName());

            // Location 저장
            Location savedLocation = locationRepository.save(location);
            capsule.setLocation(savedLocation);
        }

        // 파일 저장 처리
        if (capsuleDto.getMedia() != null && !capsuleDto.getMedia().isEmpty()) {
            try {
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath); // 폴더 자동 생성
                }

                String originalFilename = capsuleDto.getMedia().getOriginalFilename();
                String uuid = UUID.randomUUID().toString();
                String filename = uuid + "_" + originalFilename;

                // 파일 저장용 경로 (실제 파일 저장)
                String fullPath = UPLOAD_DIR + File.separator + filename;
                Path filePath = Paths.get(fullPath);
                Files.write(filePath, capsuleDto.getMedia().getBytes());

                // DB 저장용 URL 경로 (슬래시로 통일)
                String mediaPath = "/uploads/" + filename;
                capsule.setMediaPath(mediaPath);

            } catch (Exception e) {
                throw new RuntimeException("파일 저장 오류 발생: " + e.getMessage());
            }
        }
        capsuleRepository.save(capsule);

        return convertToDto(capsule);
    }

    // 캡슐 상태 자동 업데이트: 지정한 날짜가 도달하면 isOpened = true로 변경
    @Scheduled(cron = "0 * * * * ?") // 매시간 실행
    @Transactional
    public void updateCapsuleStatus() {
        LocalDateTime now = LocalDateTime.now();
        List<Capsule> capsules = capsuleRepository.findAll();

        capsules.stream()
                .filter(capsule -> !capsule.getIsOpened() && capsule.getOpenDate() != null && capsule.getOpenDate().isBefore(now))
                .forEach(capsule -> {
                    capsule.setIsOpened(true);

                    capsuleRepository.save(capsule);
                });
    }

    // 캡슐 Entity를 DTO로 변환
    private CapsuleResponseDto  convertToDto(Capsule capsule) {
        CapsuleResponseDto  dto = new CapsuleResponseDto ();
        dto.setTitle(capsule.getTitle());
        dto.setContent(capsule.getContent());
        dto.setLocationName(capsule.getLocationName());
        dto.setOpenDate(capsule.getOpenDate());
        dto.setMedia(capsule.getMediaPath());
        dto.setThemeId(capsule.getThemeId());
        dto.setIsOpened(capsule.getIsOpened());
        dto.setId(capsule.getId());

        if (capsule.getLocation() != null) {
            dto.setLatitude(capsule.getLocation().getLatitude());
            dto.setLongitude(capsule.getLocation().getLongitude());
        }

        return dto;
    }
    @Transactional(readOnly = true) // 읽기 전용 트랜잭션으로 설정하여 성능 최적화
    public List<CapsuleResponseDto> getAllCapsules() {
        List<Capsule> capsules = capsuleRepository.findAll();
        // 모든 Capsule 엔티티를 CapsuleResponseDto로 변환하여 반환
        return capsules.stream()
                .map(this::convertToDto) // 각 Capsule을 DTO로 변환
                .collect(Collectors.toList()); // DTO 리스트로 수집
    }

    @Transactional
    public CapsuleResponseDto getCapsule(Long id){
        Optional<Capsule> capsule = capsuleRepository.findById(id);
        if(capsule.isPresent()){
            return new CapsuleResponseDto(capsule.get());
        }else{
            throw new IllegalStateException("캡슐을 찾을 수 없습니다.");
        }
    }
}
