package com.cms.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.exceptions.ResourceNotCreatedException;
import com.cms.exceptions.ResourceNotDeletedException;
import com.cms.exceptions.ResourceNotFoundException;
import com.cms.exceptions.ResourceNotUpdatedException;
import com.cms.models.Document;
import com.cms.payloads.requests.DocumentUpdatePayload;
import com.cms.payloads.responses.Response;
import com.cms.services.DocumentService;
import com.cms.utilities.Constant;

@RestController
@RequestMapping("/document")
public class DocumentController {
  final DocumentService documentService;

  public DocumentController(DocumentService documentService) {
    this.documentService = documentService;
  }

  @GetMapping
  public ResponseEntity<Response<List<Document>>> getAll() {
    List<Document> documents = documentService.findAll();

    Response<List<Document>> response = new Response<>(
        documents,
        true,
        Constant.SUCCESS);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("{id}")
  public ResponseEntity<Response<Document>> get(@PathVariable("id") Long id) {
    try {
      Document document = documentService.find(id);

      Response<Document> response = new Response<>(
          document,
          true,
          Constant.SUCCESS);

      return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (ResourceNotFoundException ex) {
      Response<Document> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_FOUND);

      return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    } catch (Exception ex) {
      Response<Document> response = new Response<>(
          null,
          false,
          Constant.INTERNAL_SERVER_ERROR);

      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping
  public ResponseEntity<Response<Long>> post(@RequestBody Document document) {
    try {
      Long documentId = documentService.save(document);

      Response<Long> response = new Response<>(
          documentId,
          true,
          Constant.SUCCESS);

      return new ResponseEntity<>(response, HttpStatus.CREATED);
    } catch (ResourceNotCreatedException ex) {
      Response<Long> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_FOUND);

      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    } catch (Exception ex) {
      Response<Long> response = new Response<>(
          null,
          false,
          Constant.INTERNAL_SERVER_ERROR);

      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("{id}")
  public ResponseEntity<Response<Long>> put(@PathVariable("id") Long id, @RequestBody DocumentUpdatePayload payload) {
    try {
      Long documentId = documentService.update(id, payload);

      Response<Long> response = new Response<>(
          documentId,
          true,
          Constant.SUCCESS);

      return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (ResourceNotFoundException ex) {
      Response<Long> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_FOUND);

      return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    } catch (ResourceNotUpdatedException ex) {
      Response<Long> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_UPDATED);

      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    } catch (Exception ex) {
      Response<Long> response = new Response<>(
          null,
          false,
          Constant.INTERNAL_SERVER_ERROR);

      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Response<Long>> delete(@PathVariable("id") Long id) {
    try {
      Long documentId = documentService.delete(id);

      Response<Long> response = new Response<>(
          documentId,
          true,
          Constant.SUCCESS);

      return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (ResourceNotFoundException ex) {
      Response<Long> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_FOUND);

      return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    } catch (ResourceNotDeletedException ex) {
      Response<Long> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_DELETED);

      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    } catch (Exception ex) {
      Response<Long> response = new Response<>(
          null,
          false,
          Constant.INTERNAL_SERVER_ERROR);

      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
