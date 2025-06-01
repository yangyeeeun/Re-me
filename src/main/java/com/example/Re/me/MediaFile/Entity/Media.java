package com.example.Re.me.MediaFile.Entity;

import com.example.Re.me.Capsule.Entity.Capsule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "media")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fileName")
    private String fileName;

    @Column(name = "filePath")
    private String filePath;

    @Column(name = "fileType")
    private String fileType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "capsule_id") // DB 테이블에 생성될 외래키 컬럼 이름
    private Capsule capsule;
}
