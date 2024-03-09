package com.cms.utilities;

import org.springframework.lang.NonNull;

public class Util {
  private Util() {
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
