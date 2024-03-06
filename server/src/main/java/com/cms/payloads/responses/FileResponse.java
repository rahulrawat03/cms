package com.cms.payloads.responses;

import java.io.IOException;
import java.nio.file.Files;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

public class FileResponse {
  private Resource resource;
  private String mimeType;

  public FileResponse(Resource resource) {
    this.resource = resource;

    try {
      mimeType = Files.probeContentType(resource.getFile().toPath());
    } catch (IOException ex) {
      mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
    }
  }

  public Resource getResource() {
    return resource;
  }

  public String getMimeType() {
    return mimeType;
  }
}
