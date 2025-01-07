package org.example.ims_backend.service;

import com.nimbusds.jose.JOSEException;
import org.example.ims_backend.dto.admin.request.AuthenticationRequest;
import org.example.ims_backend.dto.admin.request.IntrospectRequest;
import org.example.ims_backend.dto.admin.request.LogoutRequest;
import org.example.ims_backend.dto.admin.request.RefreshRequest;
import org.example.ims_backend.dto.admin.response.AuthenticationResponse;
import org.example.ims_backend.dto.admin.response.IntrospectResponse;

import java.text.ParseException;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest request);
    IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;
    void logout(LogoutRequest request) throws JOSEException, ParseException;
    AuthenticationResponse refreshToken(RefreshRequest request)throws ParseException, JOSEException;
}
