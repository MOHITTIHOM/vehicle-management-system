package com.vehiclemanagement.Vehicle_Manangement_spring.dto;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;

    private String name;

    private String email;

    private UserRole userRole;
}
