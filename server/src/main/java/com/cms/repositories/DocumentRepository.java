package com.cms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cms.models.Document;
import com.cms.payloads.responses.DocumentPreview;

public interface DocumentRepository extends JpaRepository<Document, Long> {
  @Query("""
        SELECT
          doc
        FROM
          Document doc
      """)
  public List<DocumentPreview> findAllPreviews();

  public Optional<Document> findByIdentifier(String identifier);

  public boolean existsByIdentifier(String identifier);
}
