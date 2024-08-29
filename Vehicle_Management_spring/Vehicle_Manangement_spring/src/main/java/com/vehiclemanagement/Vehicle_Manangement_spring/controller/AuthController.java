package com.vehiclemanagement.Vehicle_Manangement_spring.controller;

import com.vehiclemanagement.Vehicle_Manangement_spring.Utils.JWTUtil;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.AuthenticationRequest;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.AuthenticationResponse;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.SignupRequest;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.UserDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.User;
import com.vehiclemanagement.Vehicle_Manangement_spring.repository.UserRepository;
import com.vehiclemanagement.Vehicle_Manangement_spring.services.auth.AuthService;
import com.vehiclemanagement.Vehicle_Manangement_spring.services.jwt.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final JWTUtil jwtUtil;

    private final UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/signup")
    public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest) {
        // Log the details of the signupRequest
        logger.info("Received signup request: {}", signupRequest);
        System.out.println("Received signup request: "+ signupRequest);
        // if the email already exists
        if (authService.hasCustomerWithEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("Customer already exists with this email", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto createdUserDto = authService.createCustomer(signupRequest);
        if (createdUserDto == null) {
            return new ResponseEntity<>("Customer not created, come again later", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(createdUserDto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(
            @RequestBody AuthenticationRequest authenticationRequest)
            throws BadCredentialsException, DisabledException, UsernameNotFoundException {

        System.out.println("Received authentication request: " + authenticationRequest);

        try {
            // Check the credentials
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));
            System.out.println("Authentication successful");
        } catch (BadCredentialsException e) {
            System.err.println("Authentication failed: " + e.getMessage());
            throw new BadCredentialsException("Incorrect email or password.");
        }

        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        System.out.println("UserDetails retrieved: " + userDetails);
        if (userDetails == null) {
            System.err.println("UserDetails is null");
            throw new UsernameNotFoundException("User not found");
        }

        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        System.out.println("User retrieved from repository: " + optionalUser);
        if (optionalUser.isEmpty()) {
            System.err.println("User not found in repository");
            throw new UsernameNotFoundException("User not found in the repository");
        }

        final String jwt = jwtUtil.generateToken(Map.of(), userDetails);
        System.out.println("JWT generated: " + jwt);

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        System.out.println("Creating authentication response");

        authenticationResponse.setJwt(jwt);
        authenticationResponse.setUserId(optionalUser.get().getId());
        authenticationResponse.setUserRole(optionalUser.get().getUserRole());

        return ResponseEntity.ok(authenticationResponse);
    }

}
