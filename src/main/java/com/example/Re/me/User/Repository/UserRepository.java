package com.example.Re.me.User.Repository;

import com.example.Re.me.User.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일로 사용자 검색
    Optional<User> findByEmail(String email);

    // 카카오 ID로 사용자 검색 (필요할 경우)
    Optional<User> findByKakaoId(Long kakaoId);
}