package com.vehiclemanagement.Vehicle_Manangement_spring.services.admin;

import com.vehiclemanagement.Vehicle_Manangement_spring.dto.CarDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.VehicleDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.Car;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.Vehicle;
import com.vehiclemanagement.Vehicle_Manangement_spring.repository.CarRepository;
import com.vehiclemanagement.Vehicle_Manangement_spring.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService {
    private final VehicleRepository vehicleRepository;
    private final CarRepository carRepository;

    @Override
    public boolean postCarVehicle(CarDto carDto) throws IOException {
        Vehicle vehicle;

        try {
            Car car = new Car();
            car.setId(carDto.getId());
            car.setVehicleType(carDto.getVehicleType());
            car.setName(carDto.getName());
            car.setBrand(carDto.getBrand());
            car.setColor(carDto.getColor());
            car.setType(carDto.getType());
            car.setTransmission(carDto.getTransmission());
            car.setDescription(carDto.getDescription());
            car.setPrice(carDto.getPrice());
            car.setYear(carDto.getYear());

            if (carDto.getImage() != null && carDto.getImage().length > 0) {
                car.setImage(carDto.getImage()); // Use byte[]
            }
            carRepository.save(car);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<CarDto> getAllCars() {
        List<Car> cars = carRepository.findAll();
        List<CarDto> carDtos = cars.stream()
                .map(car -> {
                    CarDto dto = car.getCarDto();
                    // Ensure image is not null or handle default value
                    if (dto.getImage() == null) {
                        log.warn("Car with ID {} has no image", car.getId());
                    }
                    return dto;
                })
                .collect(Collectors.toList());
        return carDtos;
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car::getCarDto).orElse(null);

    }

    @Override
    public boolean updateCar(Long carId, CarDto carDto) {
        Optional<Car> optionalCar = carRepository.findById(carId);
        if (optionalCar.isPresent()) {
            Car existingCar = optionalCar.get();

            // Update image only if provided; otherwise, retain existing image
            if (carDto.getImage() != null && carDto.getImage().length > 0) {
                existingCar.setImage(carDto.getImage());
            }

            // Update other fields
            existingCar.setVehicleType(carDto.getVehicleType());
            existingCar.setName(carDto.getName());
            existingCar.setBrand(carDto.getBrand());
            existingCar.setColor(carDto.getColor());
            existingCar.setType(carDto.getType());
            existingCar.setTransmission(carDto.getTransmission());
            existingCar.setDescription(carDto.getDescription());
            existingCar.setPrice(carDto.getPrice());
            existingCar.setYear(carDto.getYear());
            carRepository.save(existingCar);
            return true;
        }
        return false;
    }



}
