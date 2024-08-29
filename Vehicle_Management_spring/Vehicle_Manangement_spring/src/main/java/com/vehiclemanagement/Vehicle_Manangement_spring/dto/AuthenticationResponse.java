package com.vehiclemanagement.Vehicle_Manangement_spring.dto;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;

    private UserRole userRole;

    private Long userId;
}
