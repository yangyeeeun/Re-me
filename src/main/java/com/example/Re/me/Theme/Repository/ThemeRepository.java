package com.example.Re.me.Theme.Repository;

import com.example.Re.me.Theme.Entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {
    Optional<Theme> findById(Long id);
}
