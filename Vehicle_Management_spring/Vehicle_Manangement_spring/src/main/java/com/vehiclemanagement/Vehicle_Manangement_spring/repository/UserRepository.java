package com.vehiclemanagement.Vehicle_Manangement_spring.repository;

import com.vehiclemanagement.Vehicle_Manangement_spring.entity.User;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByEmail(String email);

    User findByUserRole(UserRole userRole);
}
