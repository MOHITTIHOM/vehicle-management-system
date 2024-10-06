package com.vehiclemanagement.Vehicle_Manangement_spring.services.admin;

import com.vehiclemanagement.Vehicle_Manangement_spring.dto.BookAVehicleDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.CarDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.VehicleDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    boolean postCarVehicle(CarDto vehicleDto) throws IOException;

    List<CarDto> getAllCars();

    void deleteCar(Long id);

    CarDto getCarById(Long id);

    boolean updateCar(Long carId, CarDto carDto);

    List<BookAVehicleDto> getBookings();

    boolean changeBookingStatus(Long bookingId, String status);
}
