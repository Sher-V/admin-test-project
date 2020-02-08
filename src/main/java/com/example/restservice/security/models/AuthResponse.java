package com.example.restservice.security.models;

public class AuthResponse {

    private String jwt;

    public String getJwt() {
        return jwt;
    }

    public AuthResponse(String jwt) {
        this.jwt = jwt;
    }
}
