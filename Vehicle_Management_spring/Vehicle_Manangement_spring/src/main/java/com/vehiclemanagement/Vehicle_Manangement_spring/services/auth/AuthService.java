package com.vehiclemanagement.Vehicle_Manangement_spring.services.auth;

import com.vehiclemanagement.Vehicle_Manangement_spring.dto.SignupRequest;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.UserDto;

public interface AuthService {

    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
