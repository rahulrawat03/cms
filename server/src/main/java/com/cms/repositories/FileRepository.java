package com.cms.repositories;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.cms.exceptions.ResourceNotCreatedException;
import com.cms.exceptions.ResourceNotDeletedException;
import com.cms.exceptions.ResourceNotFoundException;
import com.cms.exceptions.UnknownFileException;
import com.cms.payloads.responses.FileResponse;
import com.cms.utilities.Util;

@Repository
public class FileRepository {
  private final String dataDirectory;

  public FileRepository(@Value("#{environment.DATA_DIRECTORY}") String dataDirectory) {
    this.dataDirectory = dataDirectory;
  }

  public FileResponse find(String fileName) throws ResourceNotFoundException {
    try {
      Path filePath = filePath(fileName);
      URI uri = filePath.toUri();

      if (uri == null) {
        throw new ResourceNotFoundException();
      }
      Resource resource = new UrlResource(uri);

      if (!resource.exists()) {
        throw new ResourceNotFoundException();
      }

      return new FileResponse(resource);
    } catch (Exception ex) {
      throw new ResourceNotFoundException();
    }
  }

  public String save(MultipartFile file)
      throws ResourceNotCreatedException, UnknownFileException {
    String fileName = fileName(file);
    Path filePath = filePath(fileName);

    try {
      Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

      return fileName;
    } catch (Exception ex) {
      throw new ResourceNotCreatedException();
    }
  }

  public void delete(String fileName) throws ResourceNotDeletedException {
    try {
      Path filePath = filePath(fileName);

      Files.delete(filePath);
    } catch (Exception ex) {
      throw new ResourceNotDeletedException();
    }
  }

  private String fileName(MultipartFile file) throws UnknownFileException {
    String originalFileName = Util.firstNonNull("", file.getOriginalFilename());
    String[] parts = originalFileName.split("\\.");
    if (parts.length < 2) {
      throw new UnknownFileException();
    }

    String mimeType = parts[parts.length - 1];
    String fileName = String.format("%s%s.%s",
        LocalDateTime.now().format(DateTimeFormatter.ofPattern("ddMMuuuuHHmmss")),
        Util.firstNonNull("", file.getOriginalFilename()).hashCode(), mimeType);

    return fileName != null ? fileName : "";
  }

  private Path filePath(String fileName) {
    return Path.of(dataDirectory).resolve(fileName);
  }
}
