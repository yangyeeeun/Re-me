package com.example.Re.me.Location.Entity;

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

}
