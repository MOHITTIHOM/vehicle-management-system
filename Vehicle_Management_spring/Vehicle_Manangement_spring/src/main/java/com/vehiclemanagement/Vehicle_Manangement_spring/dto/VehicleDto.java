package com.vehiclemanagement.Vehicle_Manangement_spring.dto;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.enums.VehicleType;
import lombok.Data;

@Data
public class VehicleDto {
    private Long id;

    private VehicleType vehicleType;
}
