package com.cms.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cms.exceptions.ResourceNotCreatedException;
import com.cms.exceptions.ResourceNotDeletedException;
import com.cms.exceptions.ResourceNotFoundException;
import com.cms.exceptions.UnknownFileException;
import com.cms.payloads.responses.FileResponse;
import com.cms.repositories.FileRepository;

@Service
public class FileService {
  private FileRepository fileRepository;

  public FileService(FileRepository fileRepository) {
    this.fileRepository = fileRepository;
  }

  public FileResponse find(String fileName) throws ResourceNotFoundException {
    return fileRepository.find(fileName);
  }

  public String save(MultipartFile file)
      throws ResourceNotCreatedException, UnknownFileException {
    return fileRepository.save(file);
  }

  public void delete(String fileName) throws ResourceNotDeletedException {
    fileRepository.delete(fileName);
  }
}
