package com.cms.payloads.requests;

import com.fasterxml.jackson.databind.JsonNode;

public class DocumentUpdatePayload {
  private JsonNode data;
  private String identifier;

  public DocumentUpdatePayload(JsonNode data, String identifier) {
    this.data = data;
    this.identifier = identifier;
  }

  public JsonNode getData() {
    return data;
  }

  public void setData(JsonNode data) {
    this.data = data;
  }

  public String getIdentifier() {
    return identifier;
  }

  public void setIdentifier(String identifier) {
    this.identifier = identifier;
  }
}
