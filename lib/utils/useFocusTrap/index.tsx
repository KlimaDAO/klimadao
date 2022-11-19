import { useRef } from "react";

const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type EventHandler = (evt: FocusEvent) => void;
type RefCallback = (el: HTMLElement | null) => void;

/**
 * Pass the ref into a container element, and it will trap tab focus within that container until it is unmounted.
 *
 * Note: this returns a new instance on every rerender, but this doesn't seem to cause problems as callback refs are only invoked on mount/unmount
 * We don't need to cleanup listeners because we assume the element is removed from the DOM
 */
export const useFocusTrap = (): RefCallback => {
  const ref = useRef<RefCallback>();
  if (ref.current) {
    return ref.current;
  }
  ref.current = (el: HTMLElement | null) => {
    if (el) {
      const focusableChildren = el.querySelectorAll(focusableElements);
      const first = focusableChildren[0] as HTMLElement; // always going to be an HTMLElement because we don't have XML elements
      const last = focusableChildren[focusableChildren.length - 1];

      if (first) {
        // auto-focus the first element in the container
        first.focus();
      }

      const handleFocusout: EventHandler = (evt) => {
        // if the element that lost focus was the last item, go back to top
        if (last && evt.target === last) {
          first.focus();
        }
      };

      el.addEventListener("focusout", handleFocusout);
    }
  };

  return ref.current;
};
