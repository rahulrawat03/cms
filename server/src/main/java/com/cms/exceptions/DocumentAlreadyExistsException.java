package com.cms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.cms.utilities.Constant;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = Constant.DOCUMENT_ALREADY_EXISTS)
public class DocumentAlreadyExistsException extends Exception {
  public DocumentAlreadyExistsException() {
    super();
  }
}
