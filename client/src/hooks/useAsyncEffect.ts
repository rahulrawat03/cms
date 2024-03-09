import { useEffect, useState } from "react";
import { AsyncCallback, Callback } from "@cms/types";

export function useAsyncEffect<T>(
  cb: AsyncCallback<T>,
  deps: (object | string | number | undefined)[],
  cleanup?: Callback<void>
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    cb().then((value) => {
      setData(value);
      setLoading(false);
    });

    return cleanup;
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { loading, data };
}
