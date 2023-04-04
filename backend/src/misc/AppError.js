class AppError extends Error {
  constructor(name, httpCode, description) {
    super(description);
    console.log(name, httpCode, description);
    this.name = name;
    this.httpCode = httpCode;
    Error.captureStackTrace(this);
  }
}

module.exports = AppError;
