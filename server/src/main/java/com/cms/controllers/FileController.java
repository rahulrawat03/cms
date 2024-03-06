package com.cms.controllers;

import java.io.IOException;
import java.net.MalformedURLException;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cms.exceptions.ResourceNotFoundException;
import com.cms.payloads.responses.FileResponse;
import com.cms.payloads.responses.Response;
import com.cms.services.FileService;
import com.cms.utilities.Constant;

@RestController
@RequestMapping("/file")
public class FileController {
  final FileService fileService;

  public FileController(FileService fileService) {
    this.fileService = fileService;
  }

  @GetMapping("{id}")
  public ResponseEntity<Object> get(@PathVariable("id") String fileName) {
    try {
      FileResponse fileData = fileService.find(fileName);

      MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
      headers.add(HttpHeaders.CONTENT_TYPE, fileData.getMimeType());

      return new ResponseEntity<>(fileData.getResource(), headers, HttpStatus.OK);
    } catch (MalformedURLException | ResourceNotFoundException ex) {
      Response<Resource> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_FOUND);

      return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    } catch (Exception ex) {
      Response<Resource> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_FOUND);

      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping
  public ResponseEntity<Response<String>> post(@RequestParam("file") MultipartFile file) {
    try {
      String fileId = fileService.save(file);

      Response<String> response = new Response<>(
          fileId,
          true,
          Constant.SUCCESS);

      return new ResponseEntity<>(response, HttpStatus.CREATED);
    } catch (IOException | ResourceNotFoundException ex) {
      Response<String> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_SAVED);

      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    } catch (Exception ex) {
      Response<String> response = new Response<>(
          null,
          false,
          Constant.INTERNAL_SERVER_ERROR);

      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Response<String>> delete(@PathVariable("id") String fileId) {
    try {
      fileService.delete(fileId);

      Response<String> response = new Response<>(
          fileId,
          true,
          Constant.SUCCESS);

      return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (IOException | ResourceNotFoundException ex) {
      Response<String> response = new Response<>(
          null,
          false,
          Constant.RESOURCE_NOT_DELETED);

      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    } catch (Exception ex) {
      Response<String> response = new Response<>(
          null,
          false,
          Constant.INTERNAL_SERVER_ERROR);

      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
