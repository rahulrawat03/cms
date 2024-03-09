package com.cms.payloads.responses;

public class IdResponse<T> {
  private final T id;

  public IdResponse(T id) {
    this.id = id;
  }

  public T getId() {
    return id;
  }
}
