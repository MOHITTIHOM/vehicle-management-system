package com.vehiclemanagement.Vehicle_Manangement_spring.controller;

import com.vehiclemanagement.Vehicle_Manangement_spring.dto.BookAVehicleDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.CarDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/vehicles")
    public ResponseEntity<List<CarDto>> getAllCars(){
        List<CarDto> carDtoList = customerService.getAllCars();
        return ResponseEntity.ok(carDtoList);
    }

    @PostMapping("/vehicle/book")
    public ResponseEntity<Void> bookAVehicle(@RequestBody BookAVehicleDto bookAVehicleDto){
        boolean success = customerService.bookAVehicle(bookAVehicleDto);
        if(success){
            return  ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/vehicle/{id}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long id){
        CarDto carDto = customerService.getCarById(id);
        if( carDto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(carDto);
    }
}
