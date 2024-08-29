package com.vehiclemanagement.Vehicle_Manangement_spring.repository;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    // Additional operations specific to Car
}
