package com.cms.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cms.exceptions.ResourceNotCreatedException;
import com.cms.exceptions.ResourceNotDeletedException;
import com.cms.exceptions.ResourceNotFoundException;
import com.cms.exceptions.ResourceNotUpdatedException;
import com.cms.models.Document;
import com.cms.payloads.requests.DocumentUpdatePayload;
import com.cms.payloads.responses.DocumentPreview;
import com.cms.repositories.DocumentRepository;
import com.cms.utilities.Constant;

@Service
public class DocumentService {
  private final DocumentRepository documentRepository;

  public DocumentService(DocumentRepository documentRepository) {
    this.documentRepository = documentRepository;
  }

  public List<DocumentPreview> findAll() {
    return documentRepository.findAllPreviews();
  }

  public Document find(Long id) throws ResourceNotFoundException {
    Optional<Document> document = documentRepository.findById(id);

    if (!document.isPresent()) {
      throw new ResourceNotFoundException();
    }

    return document.get();
  }

  public Document findByIdentifier(String identifier) throws ResourceNotFoundException {
    Optional<Document> document = documentRepository.findByIdentifier(identifier);

    if (!document.isPresent()) {
      throw new ResourceNotFoundException();
    }

    return document.get();
  }

  @Transactional
  public Long save(Document document) throws ResourceNotCreatedException {
    try {
      if (document.getIdentifier().length() == 0) {
        throw new ResourceNotCreatedException(Constant.EMPTY_IDENTIFIER);
      }

      if (documentRepository.existsByIdentifier(document.getIdentifier())) {
        throw new ResourceNotCreatedException(Constant.DOCUMENT_ALREADY_EXISTS);
      }

      Document savedDocument = documentRepository.save(document);

      return savedDocument.getId();
    } catch (IllegalArgumentException ex) {
      throw new ResourceNotCreatedException();
    }
  }

  @Transactional
  public Long update(Long id, DocumentUpdatePayload payload)
      throws ResourceNotFoundException, ResourceNotUpdatedException {
    Optional<Document> document = documentRepository.findById(id);

    if (!document.isPresent()) {
      throw new ResourceNotFoundException();
    }

    if (payload.getIdentifier().length() == 0) {
      throw new ResourceNotUpdatedException(Constant.EMPTY_IDENTIFIER);
    }

    document.get().setData(payload.getData());
    document.get().setIdentifier(payload.getIdentifier());

    try {
      documentRepository.save(document.get());
      return id;
    } catch (Exception ex) {
      throw new ResourceNotUpdatedException();
    }
  }

  @Transactional
  public Long delete(Long id) throws ResourceNotFoundException, ResourceNotDeletedException {
    Optional<Document> document = documentRepository.findById(id);

    if (!document.isPresent()) {
      throw new ResourceNotFoundException();
    }

    try {
      documentRepository.deleteById(id);
      return id;
    } catch (Exception ex) {
      throw new ResourceNotDeletedException();
    }
  }
}
