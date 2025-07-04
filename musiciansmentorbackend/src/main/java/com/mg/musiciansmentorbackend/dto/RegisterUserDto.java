package com.mg.musiciansmentorbackend.dto;

import com.mg.musiciansmentorbackend.model.AccountType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {
    private String email;
    private String password;
    private String username;
    private AccountType accountType;
}
