package com.cms.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  private String allowedOrigins;
  private static final int MAX_AGE = 60 * 60;

  public WebConfig(@Value("${cors.allowed-origins}") String allowedOrigins) {
    this.allowedOrigins = allowedOrigins;
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping("/**")
        .allowedOrigins(allowedOrigins)
        .allowedHeaders("*")
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .maxAge(MAX_AGE);
  }
}
