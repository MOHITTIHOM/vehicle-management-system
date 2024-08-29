package com.vehiclemanagement.Vehicle_Manangement_spring.services.jwt;

import com.vehiclemanagement.Vehicle_Manangement_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService(){
            @Override
            public UserDetails loadUserByUsername(String username){
                return userRepository.findFirstByEmail(username)
                        .orElseThrow(()-> new UsernameNotFoundException("User not Found"));
            }
        };
    }
}
