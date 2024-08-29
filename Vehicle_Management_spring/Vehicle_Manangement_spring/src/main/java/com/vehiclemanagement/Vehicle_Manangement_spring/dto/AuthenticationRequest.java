package com.vehiclemanagement.Vehicle_Manangement_spring.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String email;

    private String password;

    @Override
    public String toString() {
        return "AuthenticationRequest{" +
                "email='" + email + '\'' +
                ", password='" + (password != null ? password : null) + '\'' + // Avoid printing actual password
                '}';
    }
}
