package com.example.ticket_management_system.DTOs;

import com.example.ticket_management_system.Model.Role;
import com.example.ticket_management_system.Model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Role role;

    public static UserResponse fromEntity(User user){
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
