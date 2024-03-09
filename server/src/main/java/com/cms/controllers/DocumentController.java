package com.cms.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.exceptions.DocumentAlreadyExistsException;
import com.cms.exceptions.ResourceNotCreatedException;
import com.cms.exceptions.ResourceNotDeletedException;
import com.cms.exceptions.ResourceNotFoundException;
import com.cms.exceptions.ResourceNotUpdatedException;
import com.cms.models.Document;
import com.cms.payloads.requests.DocumentUpdatePayload;
import com.cms.payloads.responses.DocumentPreview;
import com.cms.payloads.responses.IdResponse;
import com.cms.services.DocumentService;

@RestController
@RequestMapping("/api/document")
public class DocumentController {
  final DocumentService documentService;

  public DocumentController(DocumentService documentService) {
    this.documentService = documentService;
  }

  @GetMapping
  public List<DocumentPreview> getAll() {
    return documentService.findAll();
  }

  @GetMapping("{id}")
  public Document get(@PathVariable("id") Long id) throws ResourceNotFoundException {
    return documentService.find(id);
  }

  @GetMapping("identifier/{id}")
  public Document getByIdentifier(@PathVariable("id") String identifier)
      throws ResourceNotFoundException {
    return documentService.findByIdentifier(identifier);
  }

  @PostMapping
  public IdResponse<Long> post(@RequestBody Document document)
      throws DocumentAlreadyExistsException, ResourceNotCreatedException {
    return new IdResponse<>(documentService.save(document));
  }

  @PutMapping("{id}")
  public IdResponse<Long> put(@PathVariable("id") Long id, @RequestBody DocumentUpdatePayload payload)
      throws ResourceNotFoundException, ResourceNotUpdatedException {
    return new IdResponse<>(documentService.update(id, payload));

  }

  @DeleteMapping("{id}")
  public IdResponse<Long> delete(@PathVariable("id") Long id)
      throws ResourceNotFoundException, ResourceNotDeletedException {
    return new IdResponse<>(documentService.delete(id));

  }
}
