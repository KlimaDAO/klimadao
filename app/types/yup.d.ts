import * as yup from "yup";
import { AnyObject, Maybe } from "yup/lib/types";

// https://github.com/jquense/yup/issues/312#issuecomment-1104404924
// Extend ts declarations to support custom form validaton methods

declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    isAddress(errorMessage: string): StringSchema<TType, TContext>;
    isOwner(errorMessage: string): StringSchema<TType, TContext>;
  }
}

export default yup;
