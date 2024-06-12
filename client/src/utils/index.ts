/* middleware for custom errors */
// CustomError.ts

class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;

export const errorhandler = (statusCode: any, message: string) => {
  const error = new CustomError(statusCode, message);
  return error;
};
