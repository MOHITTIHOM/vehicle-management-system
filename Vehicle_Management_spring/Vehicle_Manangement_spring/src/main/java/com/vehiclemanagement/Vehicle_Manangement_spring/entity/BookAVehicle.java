package com.vehiclemanagement.Vehicle_Manangement_spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vehiclemanagement.Vehicle_Manangement_spring.dto.BookAVehicleDto;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.enums.BookVehicleStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
public class BookAVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date fromDate;
    private Date toDate;
    private Long days;
    private Long price;
    private BookVehicleStatus bookVehicleStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Vehicle vehicle;


    public BookAVehicleDto getBookAVehicleDto() {
        BookAVehicleDto bookAVehicleDto = new BookAVehicleDto();
        bookAVehicleDto.setId(this.id);
        bookAVehicleDto.setFromDate(this.fromDate);
        bookAVehicleDto.setToDate(this.toDate);
        bookAVehicleDto.setDays(this.days);
        bookAVehicleDto.setPrice(this.price);
        bookAVehicleDto.setBookVehicleStatus(this.bookVehicleStatus);
        bookAVehicleDto.setVehicleId(this.vehicle.getId());
        bookAVehicleDto.setUserId(this.user.getId());
        bookAVehicleDto.setUserName(this.user.getUsername());
        bookAVehicleDto.setEmail(this.user.getEmail());
        return bookAVehicleDto;
    }

}
