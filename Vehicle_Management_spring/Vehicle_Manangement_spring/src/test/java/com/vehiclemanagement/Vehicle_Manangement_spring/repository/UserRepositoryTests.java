package com.vehiclemanagement.Vehicle_Manangement_spring.repository;

import com.vehiclemanagement.Vehicle_Manangement_spring.controller.AuthController;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.User;
import com.vehiclemanagement.Vehicle_Manangement_spring.entity.enums.UserRole;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;


@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserRepositoryTests.class);

//    @Test
//    public void UserRepository_SaveAll_ReturnsSavedUser() {
//        User user = User.builder()
//                .name("Test User")
//                .email("test@test.com")
//                .password("test")
//                .userRole(UserRole.CUSTOMER)
//                .build();
//
//        User savedUser = userRepository.save(user);
//
//        logger.info("User saved: {}", savedUser);
//
//        Assertions.assertThat(savedUser).isNotNull();
//        Assertions.assertThat(savedUser.getName()).isEqualTo("Test User");
//        Assertions.assertThat(savedUser.getId()).isNotNull();
//        Assertions.assertThat(savedUser.getId()).isGreaterThan(0);
//    }
}