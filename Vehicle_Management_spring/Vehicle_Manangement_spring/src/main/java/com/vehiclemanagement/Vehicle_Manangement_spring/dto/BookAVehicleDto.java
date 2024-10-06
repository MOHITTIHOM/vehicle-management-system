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
    private String userName;
    private String email;
    @Override
    public String toString() {
        return "BookAVehicleDto{" +
                "id=" + id +
                ", fromDate=" + fromDate +
                ", toDate=" + toDate +
                ", days=" + days +
                ", price=" + price +
                ", bookVehicleStatus=" + bookVehicleStatus +
                ", vehicleId=" + vehicleId +
                ", userId=" + userId +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
