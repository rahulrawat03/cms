package com.cms.repositories;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.cms.exceptions.ResourceNotFoundException;
import com.cms.payloads.responses.FileResponse;
import com.cms.utilities.Constant;

@Repository
public class FileRepository {
  private final String dataDirectory;

  public FileRepository(@Value("#{environment.DATA_DIRECTORY}") String dataDirectory) {
    this.dataDirectory = dataDirectory;
  }

  public FileResponse find(String fileName) throws MalformedURLException, ResourceNotFoundException {
    Path filePath = filePath(fileName);
    URI uri = filePath.toUri();

    if (uri == null) {
      throw new ResourceNotFoundException(Constant.RESOURCE_NOT_FOUND);
    }
    Resource resource = new UrlResource(uri);

    if (!resource.exists()) {
      throw new ResourceNotFoundException(Constant.RESOURCE_NOT_FOUND);
    }

    return new FileResponse(resource);
  }

  public String save(MultipartFile file) throws IOException, ResourceNotFoundException {
    String fileName = fileName(file);
    Path filePath = filePath(fileName);

    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

    return fileName;
  }

  public void delete(String fileName) throws IOException, ResourceNotFoundException {
    Path filePath = filePath(fileName);

    Files.delete(filePath);
  }

  private String fileName(MultipartFile file) {
    String fileName = String.format("%s-%s", LocalDateTime.now().toLocalDate().hashCode(), file.getOriginalFilename());

    return fileName != null ? fileName : "";
  }

  private Path filePath(String fileName) throws ResourceNotFoundException {
    try {
      Path path = Path.of(dataDirectory).resolve(fileName);
      if (path == null) {
        throw new ResourceNotFoundException();
      }

      return path;
    } catch (Exception ex) {
      ResourceNotFoundException checkedException = new ResourceNotFoundException(Constant.RESOURCE_NOT_FOUND);
      ex.setStackTrace(ex.getStackTrace());
      throw checkedException;
    }
  }
}
