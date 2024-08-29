package com.vehiclemanagement.Vehicle_Manangement_spring.services.customer;

import com.vehiclemanagement.Vehicle_Manangement_spring.dto.BookAVehicleDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.CarDto;

import java.util.List;

public interface CustomerService {
    List<CarDto> getAllCars();

    boolean bookAVehicle(BookAVehicleDto bookAVehicleDto);

    CarDto getCarById(Long carId);
}
