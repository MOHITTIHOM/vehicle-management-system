package com.vehiclemanagement.Vehicle_Manangement_spring.repository;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.BookAVehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookAVehicleRepository extends JpaRepository<BookAVehicle, Long> {
    List<BookAVehicle> findAllByUserId(Long userId);
}
