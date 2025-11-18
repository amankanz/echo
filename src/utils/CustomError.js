//src/utils/CustomError.js

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class constructor with the error message
    this.statusCode = statusCode;
  }
}

export default CustomError;
