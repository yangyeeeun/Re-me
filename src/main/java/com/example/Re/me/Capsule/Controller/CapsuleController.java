package com.example.Re.me.Capsule.Controller;

import com.example.Re.me.Capsule.DTO.CapsuleRequestDto;
import com.example.Re.me.Capsule.DTO.CapsuleResponseDto;
import com.example.Re.me.Capsule.Entity.Capsule;
import com.example.Re.me.Capsule.Repository.CapsuleRepository;
import com.example.Re.me.Capsule.Service.CapsuleService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
public class CapsuleController {
    private final CapsuleService capsuleService;
    private final CapsuleRepository capsuleRepository;
    private final Map<String, LocalDateTime> userLastCheckTimes = new ConcurrentHashMap<>();

    public CapsuleController(CapsuleService capsuleService, CapsuleRepository capsuleRepository) {
        this.capsuleService = capsuleService;
        this.capsuleRepository = capsuleRepository;
    }

    @PostMapping(value = "/letter", consumes = {"multipart/form-data"})
    public CapsuleResponseDto saveCapsule(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("locationName") String locationName,
            @RequestParam("openDate") String openDate,
            @RequestParam(value = "media", required = false) MultipartFile media,
            @RequestParam(value="themeId") Long theme_id,
            @RequestParam(value = "latitude", required = false) Double latitude,
            @RequestParam(value = "longitude", required = false) Double longitude
    ) {
        CapsuleRequestDto capsuleDto = new CapsuleRequestDto();
        capsuleDto.setThemeId(theme_id);
        capsuleDto.setTitle(title);
        capsuleDto.setContent(content);
        capsuleDto.setLocationName(locationName);
        capsuleDto.setOpenDate(LocalDateTime.parse(openDate));
        capsuleDto.setMedia(media);

        capsuleDto.setLatitude(latitude);
        capsuleDto.setLongitude(longitude);

        return capsuleService.saveCapsule(capsuleDto);
    }

    @GetMapping("/letters")
    public List<CapsuleResponseDto> getMyCapsules() {
        return capsuleService.getAllCapsules();
    }

    @GetMapping("/letter/{id}")
    public CapsuleResponseDto getMyCapsule(@PathVariable Long id){
        return capsuleService.getCapsule(id);
    }

    @PutMapping("/letter/{id}/open") // 또는 PATCH를 사용해도 됩니다. (PUT /api/letters/{id}/open)
    @Transactional // 트랜잭션 처리
    public ResponseEntity<Void> markCapsuleAsOpened(@PathVariable Long id) {
        return capsuleRepository.findById(id)
                .map(capsule -> {
                    if (!capsule.getIsOpened()) { // 이미 열리지 않은 상태일 때만 업데이트
                        capsule.setIsOpened(true);
                        capsuleRepository.save(capsule); // 변경사항 저장
                        System.out.println("Capsule ID: " + id + " manually marked as opened by frontend request."); // 서버 로그
                    }
                    return ResponseEntity.ok().<Void>build(); // 성공 응답 (내용 없음)
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // 캡슐이 없으면 404
    }

    @GetMapping("/letters/inbox")
    public ResponseEntity<List<Capsule>> getOpenedLetters() {
        // 여기서는 간단히 isOpened=true인 모든 캡슐을 반환합니다.
        // "새로 변경된" 캡슐만 보내고 싶다면, 이 엔드포인트도 lastCheckTimes를 활용해야 합니다.
        List<Capsule> openedCapsules = capsuleRepository.findByIsOpenedTrue();
        return ResponseEntity.ok(openedCapsules);
    }

//    @GetMapping("/letters/inbox/new-messages-exist")
//    public ResponseEntity<Map<String, Boolean>> newMessagesExist(@RequestParam(required = false, defaultValue = "defaultUser") String userId) {
//        LocalDateTime safeMinDate = LocalDateTime.of(2025, 5, 30, 0, 0);
//        LocalDateTime lastCheckTime = userLastCheckTimes.getOrDefault(userId, safeMinDate);
//
//        // 마지막 확인 시간 이후에 isOpened가 true로 변경된 캡슐이 있는지 확인
//        List<Capsule> newOpenedCapsules = capsuleRepository.findByIsOpenedTrueAndLastModifiedDateAfter(lastCheckTime);
//
//        boolean exists = !newOpenedCapsules.isEmpty();
//        return ResponseEntity.ok(Map.of("newMessages", exists));
//    }
//
//    @PostMapping("/letters/inbox/mark-as-read")
//    public ResponseEntity<Void> markNewMessagesAsRead(@RequestParam(required = false, defaultValue = "defaultUser") String userId) {
//        userLastCheckTimes.put(userId, LocalDateTime.now());
//        System.out.println("User " + userId + " marked new messages as read at: " + LocalDateTime.now());
//        return ResponseEntity.ok().build();
//    }
    @GetMapping("/letters/inbox/new-messages-exist")
    public ResponseEntity<Map<String, Boolean>> newMessagesExist(
        @RequestParam(value = "userId", required = false, defaultValue = "defaultUser") String userId
    ) {
        // 안전 최소 날짜 (이전 체크 기록 없을 때)
        LocalDateTime safeMinDate = LocalDateTime.of(2025, 5, 30, 0, 0);
        // 마지막으로 읽음 체크한 시간
        LocalDateTime lastCheckTime = userLastCheckTimes.getOrDefault(userId, safeMinDate);

        // 마지막 확인 이후 isOpened=true로 바뀐 캡슐 찾기
        List<Capsule> newOpenedCapsules = capsuleRepository.findByIsOpenedTrueAndLastModifiedDateAfter(lastCheckTime);

        boolean exists = !newOpenedCapsules.isEmpty();
        return ResponseEntity.ok(Map.of("newMessages", exists));
    }

    @PostMapping("/letters/inbox/mark-as-read")
    public ResponseEntity<Void> markNewMessagesAsRead(
        @RequestParam(value = "userId", required = false, defaultValue = "defaultUser") String userId
    ) {
        userLastCheckTimes.put(userId, LocalDateTime.now());
        System.out.println("User " + userId + " marked new messages as read at: " + LocalDateTime.now());
        return ResponseEntity.ok().build();
    }

}
