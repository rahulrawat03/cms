package com.cms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.cms.utilities.Constant;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = Constant.RESOURCE_NOT_FOUND)
public class ResourceNotFoundException extends Exception {
  public ResourceNotFoundException() {
    super(Constant.RESOURCE_NOT_FOUND);
  }

  public ResourceNotFoundException(String message) {
    super(message);
  }
}
