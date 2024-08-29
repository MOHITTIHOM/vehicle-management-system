package com.vehiclemanagement.Vehicle_Manangement_spring.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
public class CarDto extends VehicleDto {
    private String name;
    private String brand;
    private String color;
    private String type;
    private String transmission;
    private String description;
    private Long price;
    private Date year;
    private byte[] image;//private MultipartFile image; // Only keep MultipartFile
}
