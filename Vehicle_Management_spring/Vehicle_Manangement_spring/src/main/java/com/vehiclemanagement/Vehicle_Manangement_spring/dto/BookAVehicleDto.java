package com.vehiclemanagement.Vehicle_Manangement_spring.dto;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.enums.BookVehicleStatus;
import lombok.Data;

import java.util.Date;

@Data
public class BookAVehicleDto{

    private Long id;

    private Date fromDate;
    private Date toDate;
    private Long days;
    private Long price;
    private BookVehicleStatus bookVehicleStatus;

    private Long vehicleId;
    private Long userId;
}
