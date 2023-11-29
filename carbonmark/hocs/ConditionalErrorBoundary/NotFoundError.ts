/** An error returned by carbonmark-api with a 404 status */
export type NotFoundError = Error & {
  data: { statusCode: 404 };
};

export const isNotFoundError = (e: any): e is NotFoundError =>
  Object.hasOwn(e, "status") && (e as NotFoundError).data.statusCode === 404;
