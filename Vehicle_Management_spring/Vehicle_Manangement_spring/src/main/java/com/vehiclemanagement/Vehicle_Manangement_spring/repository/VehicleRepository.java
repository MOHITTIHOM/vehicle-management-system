package com.vehiclemanagement.Vehicle_Manangement_spring.repository;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
