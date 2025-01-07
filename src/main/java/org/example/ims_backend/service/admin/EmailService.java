package org.example.ims_backend.service.admin;

import jakarta.validation.constraints.Email;

public interface EmailService {
    void sendEmail(String password, String email,String username);
}
