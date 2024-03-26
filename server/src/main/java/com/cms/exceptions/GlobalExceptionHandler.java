package com.cms.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
  private static final String MESSAGE_KEY = "message";

  @ExceptionHandler
  public ResponseEntity<Object> handleException(ResourceNotCreatedException ex) {
    return new ResponseEntity<>(getBody(ex), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<Object> handleException(ResourceNotDeletedException ex) {
    return new ResponseEntity<>(getBody(ex), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<Object> handleException(ResourceNotFoundException ex) {
    return new ResponseEntity<>(getBody(ex), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler
  public ResponseEntity<Object> handleException(ResourceNotUpdatedException ex) {
    return new ResponseEntity<>(getBody(ex), HttpStatus.BAD_REQUEST);
  }

  private Map<String, Object> getBody(Exception ex) {
    Map<String, Object> body = new HashMap<>();
    body.put(MESSAGE_KEY, ex.getMessage());

    return body;
  }
}
