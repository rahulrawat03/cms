package com.cms.exceptions;

public class ResourceNotFoundException extends Exception {
  public ResourceNotFoundException() {
    super();
  }

  public ResourceNotFoundException(String message) {
    super(message);
  }
}
