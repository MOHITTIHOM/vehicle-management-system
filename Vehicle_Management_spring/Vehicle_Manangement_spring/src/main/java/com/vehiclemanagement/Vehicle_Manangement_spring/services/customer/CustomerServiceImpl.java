package com.vehiclemanagement.Vehicle_Manangement_spring.services.customer;

import com.vehiclemanagement.Vehicle_Manangement_spring.dto.BookAVehicleDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.CarDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.BookAVehicle;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.Car;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.User;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.Vehicle;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.enums.BookVehicleStatus;
import com.vehiclemanagement.Vehicle_Manangement_spring.repository.BookAVehicleRepository;
import com.vehiclemanagement.Vehicle_Manangement_spring.repository.CarRepository;
import com.vehiclemanagement.Vehicle_Manangement_spring.repository.UserRepository;
import com.vehiclemanagement.Vehicle_Manangement_spring.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final BookAVehicleRepository bookAVehicleRepository;

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public boolean bookAVehicle(BookAVehicleDto bookAVehicleDto) {
        Optional<Vehicle> optionalVehicle = vehicleRepository.findById(bookAVehicleDto.getVehicleId());
        Optional<User> optionalUser = userRepository.findById(bookAVehicleDto.getUserId());
        if(optionalVehicle.isPresent() && optionalUser.isPresent()){

            Vehicle existingVehicle = optionalVehicle.get();
            BookAVehicle bookAVehicle = new BookAVehicle();
            bookAVehicle.setUser(optionalUser.get());
            bookAVehicle.setVehicle(existingVehicle);
            bookAVehicle.setBookVehicleStatus(BookVehicleStatus.PENDING);
            long diffInMilliSecond = bookAVehicleDto.getToDate().getTime() - bookAVehicleDto.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(diffInMilliSecond);
            bookAVehicleDto.setDays(days);
            bookAVehicle.setPrice(existingVehicle.getPrice() * days);
            bookAVehicleRepository.save(bookAVehicle);
            return true;
        }
        return false;
    }

    @Override
    public CarDto getCarById(Long carId) {
        Optional<Car> optionalCar = carRepository.findById(carId);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }
}
