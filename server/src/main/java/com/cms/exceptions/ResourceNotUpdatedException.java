package com.cms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.cms.utilities.Constant;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = Constant.RESOURCE_NOT_UPDATED)
public class ResourceNotUpdatedException extends Exception {
  public ResourceNotUpdatedException() {
    super(Constant.RESOURCE_NOT_UPDATED);
  }

  public ResourceNotUpdatedException(String message) {
    super(message);
  }
}
