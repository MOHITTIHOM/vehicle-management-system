package com.vehiclemanagement.Vehicle_Manangement_spring.repository;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.BookAVehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookAVehicleRepository extends JpaRepository<BookAVehicle, Long> {
}
