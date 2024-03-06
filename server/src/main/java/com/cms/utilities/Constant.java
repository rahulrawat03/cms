package com.cms.utilities;

import org.springframework.lang.NonNull;

public class Constant {
  private Constant() {
  }

  public static final @NonNull String DATA_DIRECTORY = "DATA_DIRECTORY";

  public static final @NonNull String SUCCESS = "Success";

  public static final @NonNull String RESOURCE_NOT_SAVED = "Resource could not be saved.";

  public static final @NonNull String RESOURCE_NOT_FOUND = "Resource could not be found.";

  public static final @NonNull String RESOURCE_NOT_UPDATED = "Resource could not be updated.";

  public static final @NonNull String RESOURCE_NOT_DELETED = "Resource could not be deleted.";

  public static final @NonNull String INTERNAL_SERVER_ERROR = "Internal Server Error";
}
