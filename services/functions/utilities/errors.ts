export const customError = (errorName: string, errorMessage: string) => {
  return new CustomError(errorName, errorMessage);
};

class CustomError extends Error {
  constructor(name: string, message: string) {
    super(message);

    this.name = name;
  }
}
