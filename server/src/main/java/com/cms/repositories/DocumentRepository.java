package com.cms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.Nullable;

import com.cms.models.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
  public @Nullable Document findFirst1ByOrderByCreatedAtDesc();
}
