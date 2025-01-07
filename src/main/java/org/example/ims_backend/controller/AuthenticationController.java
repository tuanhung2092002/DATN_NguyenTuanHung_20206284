package org.example.ims_backend.controller;

import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.admin.request.AuthenticationRequest;
import org.example.ims_backend.dto.admin.request.IntrospectRequest;
import org.example.ims_backend.dto.admin.request.LogoutRequest;
import org.example.ims_backend.dto.admin.request.RefreshRequest;
import org.example.ims_backend.dto.admin.response.ApiReponse;
import org.example.ims_backend.dto.admin.response.AuthenticationResponse;
import org.example.ims_backend.dto.admin.response.IntrospectResponse;
import org.example.ims_backend.service.AuthenticationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true , level = AccessLevel.PRIVATE)
public class AuthenticationController {
    AuthenticationService authenticationService;
    @PostMapping("/login")
    ApiReponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        var result = authenticationService.authenticate(request);
        return ApiReponse.<AuthenticationResponse>builder()
                .result(result)
                .build();

    }
    @PostMapping("/introspect")
    ApiReponse<IntrospectResponse>authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiReponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }
    @PostMapping("/logout")
    ApiReponse<Void> logout(@RequestBody LogoutRequest request)
            throws ParseException, JOSEException {
       authenticationService.logout(request);
        return ApiReponse.<Void>builder()
                .build();
    }
    @PostMapping("/refresh")
    ApiReponse<AuthenticationResponse> authenticate(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ApiReponse.<AuthenticationResponse>builder()
                .result(result)
                .build();

    }
}
