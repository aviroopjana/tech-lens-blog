class CustomError extends Error {
    statusCode: number;
}

export const ErrorHandler = (statusCode: number, message: string) => {
    const error = new CustomError();
    error.statusCode = statusCode;
    error.message = message;
    
    return error;
}