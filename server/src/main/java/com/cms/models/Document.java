package com.cms.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnTransformer;
import com.fasterxml.jackson.databind.JsonNode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "document")
public class Document {
  @Id
  @SequenceGenerator(name = "pk_document", sequenceName = "document_sequence", allocationSize = 1)
  @GeneratedValue(generator = "pk_document", strategy = GenerationType.SEQUENCE)
  @Column(name = "id", insertable = false)
  private Long id;

  @Column(name = "type", columnDefinition = "VARCHAR(50)")
  private String type;

  @Column(name = "identifier", columnDefinition = "VARCHAR(255) DEFAULT ''")
  private String identifier;

  @Column(name = "data", columnDefinition = "JSONB")
  @ColumnTransformer(write = "?::JSONB")
  private JsonNode data;

  @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT NOW()", insertable = false, nullable = false)
  private LocalDateTime createdAt;

  public Document(Long id, String type, JsonNode data, LocalDateTime createdAt) {
    this(type, data, createdAt);
    this.id = id;
  }

  public Document(String type, JsonNode data, LocalDateTime createdAt) {
    this.type = type;
    this.data = data;
    this.createdAt = createdAt;
  }

  public Document() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
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

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
