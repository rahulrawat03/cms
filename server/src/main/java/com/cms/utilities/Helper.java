package com.cms.utilities;

import org.springframework.lang.NonNull;

public class Helper {
  private Helper() {
  }

  @SafeVarargs
  public static final @NonNull <T> T firstNonNull(@NonNull T fallback, T... options) {
    for (T arg : options) {
      if (arg != null) {
        return arg;
      }
    }

    return fallback;
  }
}
