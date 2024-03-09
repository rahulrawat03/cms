package com.cms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.cms.utilities.Constant;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = Constant.UNKNOWN_RESOURCE)
public class UnknownFileException extends Exception {
  public UnknownFileException() {
    super();
  }
}
