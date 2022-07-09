type Error = {
  message: string;
  code?: string;
  statusCode?: number;
};

class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly code: string;

  constructor({
    message,
    code = "demolay.not-specified",
    statusCode = 400,
  }: Error) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export { AppError };
