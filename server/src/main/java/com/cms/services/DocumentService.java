package com.cms.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cms.exceptions.ResourceNotCreatedException;
import com.cms.exceptions.ResourceNotDeletedException;
import com.cms.exceptions.ResourceNotFoundException;
import com.cms.exceptions.ResourceNotUpdatedException;
import com.cms.models.Document;
import com.cms.payloads.requests.DocumentUpdatePayload;
import com.cms.repositories.DocumentRepository;
import com.cms.utilities.Constant;

@Service
public class DocumentService {
  private final DocumentRepository documentRepository;

  public DocumentService(DocumentRepository documentRepository) {
    this.documentRepository = documentRepository;
  }

  public List<Document> findAll() {
    return documentRepository.findAll();
  }

  public @Nullable Document find(Long id) throws ResourceNotFoundException {
    Optional<Document> document = documentRepository.findById(id);

    if (!document.isPresent()) {
      throw new ResourceNotFoundException(Constant.RESOURCE_NOT_FOUND);
    }

    return document.get();
  }

  @Transactional
  public @Nullable Long save(Document document) throws ResourceNotCreatedException {
    try {
      Document savedDocument = documentRepository.save(document);

      return savedDocument.getId();
    } catch (IllegalArgumentException ex) {
      throw new ResourceNotCreatedException(Constant.RESOURCE_NOT_SAVED);
    }
  }

  @Transactional
  public @Nullable Long update(Long id, DocumentUpdatePayload payload)
      throws ResourceNotFoundException, ResourceNotUpdatedException {
    Optional<Document> existingDocument = documentRepository.findById(id);

    if (!existingDocument.isPresent()) {
      throw new ResourceNotFoundException(Constant.RESOURCE_NOT_FOUND);
    }

    existingDocument.get().setData(payload.getData());
    existingDocument.get().setIdentifier(payload.getIdentifier());

    try {
      documentRepository.save(existingDocument.get());
      return id;
    } catch (Exception ex) {
      throw new ResourceNotUpdatedException(Constant.RESOURCE_NOT_UPDATED);
    }
  }

  @Transactional
  public @Nullable Long delete(Long id) throws ResourceNotFoundException, ResourceNotDeletedException {
    Optional<Document> document = documentRepository.findById(id);

    if (!document.isPresent()) {
      throw new ResourceNotFoundException(Constant.RESOURCE_NOT_FOUND);
    }

    try {
      documentRepository.deleteById(id);
      return id;
    } catch (Exception ex) {
      throw new ResourceNotDeletedException(Constant.RESOURCE_NOT_DELETED);
    }
  }
}
