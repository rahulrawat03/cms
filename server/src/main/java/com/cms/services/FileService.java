package com.cms.services;

import java.io.IOException;
import java.net.MalformedURLException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cms.exceptions.ResourceNotFoundException;
import com.cms.payloads.responses.FileResponse;
import com.cms.repositories.FileRepository;

@Service
public class FileService {
  private FileRepository fileRepository;

  public FileService(FileRepository fileRepository) {
    this.fileRepository = fileRepository;
  }

  public FileResponse find(String fileName) throws MalformedURLException, ResourceNotFoundException {
    return fileRepository.find(fileName);
  }

  public String save(MultipartFile file)
      throws IOException, ResourceNotFoundException {
    return fileRepository.save(file);
  }

  public void delete(String fileName) throws IOException, ResourceNotFoundException {
    fileRepository.delete(fileName);
  }
}
