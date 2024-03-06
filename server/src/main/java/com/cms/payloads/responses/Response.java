package com.cms.payloads.responses;

public class Response<T> {
  private T data;
  private Boolean success;
  private String message;

  public Response(T data, Boolean success, String message) {
    this.data = data;
    this.success = success;
    this.message = message;
  }

  public Boolean getSuccess() {
    return success;
  }

  public void setSuccess(Boolean success) {
    this.success = success;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }
}
