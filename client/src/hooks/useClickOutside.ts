import { RefObject, useCallback, useEffect } from "react";
import { Callback } from "@cms/types";

export function useClickOutside<
  T,
  U extends HTMLElement = HTMLElement,
  V extends HTMLElement = HTMLElement
>(cb: Callback<T>, contentRef: RefObject<V>, wrapperRef?: RefObject<U>) {
  const handleClick = useCallback(
    (event: Event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        cb();
      }
    },
    [cb, contentRef]
  );

  useEffect(() => {
    const node = wrapperRef ? wrapperRef.current : document;

    if (node) {
      node.addEventListener("click", handleClick);

      return () => {
        node.removeEventListener("click", handleClick);
      };
    }
  }, [handleClick, wrapperRef]);
}
