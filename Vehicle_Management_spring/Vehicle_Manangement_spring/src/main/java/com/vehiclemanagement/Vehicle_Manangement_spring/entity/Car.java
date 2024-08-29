package com.vehiclemanagement.Vehicle_Manangement_spring.entity;

import com.vehiclemanagement.Vehicle_Manangement_spring.dto.CarDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Entity
@Data
@Table(name = "cars")
@EqualsAndHashCode(callSuper = true)
public class Car extends Vehicle {
    private String name;
    private String brand;
    private String color;
    private String type;
    private String transmission;
    private String description;

    private Date year;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] image; // Store the image as byte[]

    public CarDto getCarDto(){
        CarDto carDto = new CarDto();
        carDto.setId(this.getId());
        carDto.setName(name);
        carDto.setBrand(brand);
        carDto.setColor(color);
        carDto.setType(type);
        carDto.setTransmission(transmission);
        carDto.setDescription(description);
        carDto.setPrice(this.getPrice());
        carDto.setYear(year);
        carDto.setImage(image);
        // Don't include image here; handle image separately
        return carDto;
    }
}
