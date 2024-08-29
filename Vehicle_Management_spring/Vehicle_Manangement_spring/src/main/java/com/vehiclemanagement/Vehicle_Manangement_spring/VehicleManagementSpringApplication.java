package com.vehiclemanagement.Vehicle_Manangement_spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class VehicleManagementSpringApplication {

	public static void main(String[] args) {
		System.out.println("First");
		SpringApplication.run(VehicleManagementSpringApplication.class, args);
	}

}
