package com.vehiclemanagement.Vehicle_Manangement_spring.controller;

import com.vehiclemanagement.Vehicle_Manangement_spring.dto.CarDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/vehicle")
    public ResponseEntity<?> postCarVehicle(
            @RequestPart("carDto") CarDto carDto,
            @RequestPart("image") MultipartFile image) throws IOException {

        // Log the received data
        log.info("Received request to post vehicle: {}", carDto);
        log.info("Received image: {}", image.getOriginalFilename());

        // Convert MultipartFile to byte[]
        if (image != null && !image.isEmpty()) {
            carDto.setImage(image.getBytes());
        }

        boolean success = adminService.postCarVehicle(carDto);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/vehicles")
    public ResponseEntity<?> getAllCars() {
        log.info("Fetching all cars");
        List<CarDto> cars = adminService.getAllCars();
        log.info("Fetched cars: {}", cars);
        return ResponseEntity.ok(cars);
    }


    @DeleteMapping("/vehicle/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id){
        adminService.deleteCar(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/vehicle/{id}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long id){
        CarDto carDto = adminService.getCarById(id);
        return ResponseEntity.ok(carDto);
    }

    @PutMapping("/vehicle/{carId}")
    public ResponseEntity<Void> updateCar(@PathVariable Long carId,
                                          @RequestPart("carDto") CarDto carDto,
                                          @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {

        try {
            if (image != null && !image.isEmpty()) {
                carDto.setImage(image.getBytes());
            } else {
                // No new image provided; do not modify the existing image
                carDto.setImage(null);
            }
            boolean success = adminService.updateCar(carId, carDto);
            if (success) {
                return ResponseEntity.status(HttpStatus.OK).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


}
