package com.cms.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class JsonConverter implements AttributeConverter<JsonNode, String> {
  private static final ObjectMapper mapper = new ObjectMapper();

  @Override
  public String convertToDatabaseColumn(JsonNode json) {
    return json.toString();
  }

  @Override
  public JsonNode convertToEntityAttribute(String data) {
    JsonNode json = getJson(data);
    if (json != null) {
      return json;
    }

    return getJson("{}");
  }

  private JsonNode getJson(String data) {
    try {
      return mapper.readTree(data);
    } catch (JsonProcessingException ex) {
      return null;
    }
  }
}
