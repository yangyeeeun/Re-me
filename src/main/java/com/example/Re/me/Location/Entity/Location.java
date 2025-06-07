package com.example.Re.me.Location.Entity;

import java.time.LocalDateTime;

import com.example.Re.me.User.Entity.User;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "latitude")
    private Double latitude;// 위도
    @Column(name = "longitude")
    private Double longitude; // 경도

    @Column(name = "name")
    private String name;
    
    // 추가 필드
//    private String address; // 주소
    private LocalDateTime createdAt; // 작성일

    // 작성자와의 연관관계
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
