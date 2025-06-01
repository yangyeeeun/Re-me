package com.example.Re.me.Capsule.Repository;

import com.example.Re.me.Capsule.Entity.Capsule;
import com.example.Re.me.User.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CapsuleRepository extends JpaRepository<Capsule, Long> {
    List<Capsule> findByUser(User user);
}

