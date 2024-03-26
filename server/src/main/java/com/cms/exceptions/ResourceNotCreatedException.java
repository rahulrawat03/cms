package com.cms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.cms.utilities.Constant;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = Constant.RESOURCE_NOT_CREATED)
public class ResourceNotCreatedException extends Exception {
  public ResourceNotCreatedException() {
    super(Constant.RESOURCE_NOT_CREATED);
  }

  public ResourceNotCreatedException(String message) {
    super(message);
  }
}
