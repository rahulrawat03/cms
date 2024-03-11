import { LoaderVariant } from "./types";
import { _CircularLoader, _DotLoader } from "./internal";

interface LoaderProps {
  variant: LoaderVariant;
}

export function Loader({ variant }: Readonly<LoaderProps>) {
  switch (variant) {
    case LoaderVariant.CIRCLE:
      return _CircularLoader();

    case LoaderVariant.DOT:
      return _DotLoader();

    default:
      return null;
  }
}
