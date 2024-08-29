package com.vehiclemanagement.Vehicle_Manangement_spring.entity;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.enums.VehicleType;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "vehicle_seq")
    @SequenceGenerator(name = "vehicle_seq", sequenceName = "vehicle_sequence", allocationSize = 1)
    private Long id;

    private Long price;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

}
