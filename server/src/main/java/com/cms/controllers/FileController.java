package com.cms.controllers;

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

import com.cms.exceptions.ResourceNotCreatedException;
import com.cms.exceptions.ResourceNotDeletedException;
import com.cms.exceptions.ResourceNotFoundException;
import com.cms.exceptions.UnknownFileException;
import com.cms.payloads.responses.FileResponse;
import com.cms.payloads.responses.IdResponse;
import com.cms.services.FileService;

@RestController
@RequestMapping("/api/file")
public class FileController {
  final FileService fileService;

  public FileController(FileService fileService) {
    this.fileService = fileService;
  }

  @GetMapping("{id}")
  public ResponseEntity<Resource> get(@PathVariable("id") String fileName) throws ResourceNotFoundException {
    FileResponse fileData = fileService.find(fileName);

    MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
    headers.add(HttpHeaders.CONTENT_TYPE, fileData.getMimeType());

    return new ResponseEntity<>(fileData.getResource(), headers, HttpStatus.OK);
  }

  @PostMapping
  public IdResponse<String> post(@RequestParam("file") MultipartFile file)
      throws ResourceNotCreatedException, UnknownFileException {
    return new IdResponse<>(fileService.save(file));
  }

  @DeleteMapping("{id}")
  public IdResponse<String> delete(@PathVariable("id") String fileId) throws ResourceNotDeletedException {
    fileService.delete(fileId);
    return new IdResponse<>(fileId);
  }
}
