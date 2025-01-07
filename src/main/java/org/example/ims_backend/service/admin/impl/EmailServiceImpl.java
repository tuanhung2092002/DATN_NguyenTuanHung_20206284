package org.example.ims_backend.service.admin.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.service.admin.EmailService;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    @Override
    public void sendEmail(String password, String email, String username) {
        try {
            if (email == null || email.isEmpty()) {
                throw new IllegalArgumentException("To address must not be null or empty");
            }
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("Thay đổi mật khẩu tài khoản " + username);
            helper.setText("Mật khẩu của bạn là : "+ password, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("Failed to send email to {}", email, e);
        } catch (IllegalArgumentException e) {
            log.error("Failed to send email: {}", e.getMessage());
        }
    }
}
