package com.example.Re.me.Location.Repository;

import com.example.Re.me.Location.Entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
