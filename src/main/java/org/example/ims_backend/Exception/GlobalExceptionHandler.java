package org.example.ims_backend.Exception;

import org.example.ims_backend.common.ErrorCode;
import org.example.ims_backend.dto.admin.request.AppException;
import org.example.ims_backend.dto.admin.response.ApiReponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiReponse> handleRuntimeException(RuntimeException e) {
        ApiReponse response = new ApiReponse();
        response.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        response.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
        return ResponseEntity.badRequest().body(response);
    }
    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiReponse> handleAccessDeniedException(AccessDeniedException e) {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
        return ResponseEntity
                .status(errorCode.getHttpStatusCode())
                .body(
                        ApiReponse.builder()
                                .code(errorCode.getCode())
                                .message(errorCode.getMessage())
                                .build());
    }
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiReponse> handlingValidation(MethodArgumentNotValidException e) {
       String enumKey = e.getFieldError().getDefaultMessage();

       ErrorCode errorCode = ErrorCode.INVALID_KEY;
       try {
              errorCode = ErrorCode.valueOf(enumKey);
         } catch (IllegalArgumentException ignored) {

       }
         ApiReponse response = new ApiReponse();
         response.setCode(errorCode.getCode());
         response.setMessage(errorCode.getMessage());
         return ResponseEntity.status(errorCode.getHttpStatusCode()).body(response);

    }
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiReponse> handleAppException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        ApiReponse response = new ApiReponse();
        response.setCode(errorCode.getCode());
        response.setMessage(errorCode.getMessage());
        return ResponseEntity
                .status(errorCode.getHttpStatusCode())
                .body(response);
    }
}
