package com.cms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.cms.utilities.Constant;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = Constant.RESOURCE_NOT_DELETED)
public class ResourceNotDeletedException extends Exception {
  public ResourceNotDeletedException() {
    super();
  }
}
