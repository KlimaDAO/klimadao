import { OptionChangeHandler } from "lib/charts/options";
import { useEffect, useState } from "react";

interface Props<T> {
  /** The key used to identify that value in the URL */
  key: string;
  /** The default Value */
  defaultValue: T;
  /** Callback when the value is read from the URL or changed by the component */
  onValueChange?: OptionChangeHandler<T>;
  /** Can this value be changed */
  readonly: boolean;
}
export function useQueryParam<T>(props: Props<T>): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(props.defaultValue);

  // When the component is loaded the value is read from the URL
  let initialValue = props.defaultValue;
  useEffect(() => {
    const url = new URL(window.location.href);
    initialValue = (url.searchParams.get(props.key) as T) || initialValue;
    setValue(initialValue);
    if (!props.readonly && props.onValueChange) {
      props.onValueChange(initialValue);
    }
  }, []);

  // When the value is set, the parameter is reflected in the URL
  function setValueWrapper(newValue: T) {
    if (props.readonly) return;
    setValue(newValue);
    if ("undefined" !== typeof history.pushState) {
      const url = new URL(window.location.href);
      url.searchParams.set(props.key, String(newValue));
      history.pushState({}, document.title, url.href);
    }
    props.onValueChange && props.onValueChange(newValue);
  }
  return [value, setValueWrapper];
}
