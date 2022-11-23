import messages from './messages';

export class HttpError extends Error {
  public status: number;
  public message: string;

  constructor(message: string, status: number) {
    super(message);

    this.status = status;
  }
}

export class BadRequest extends HttpError {
  constructor(message = 'BadRequest') {
    super(message, 400);
  }
}

export class Unauthorized extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class Forbidden extends HttpError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFound extends HttpError {
  constructor(message = 'NotFound') {
    super(message, 404);
  }
}

export class ResourceConflict extends HttpError {
  constructor(message = 'ResourceConflict') {
    super(message, 409);
  }
}

export const Message = messages;
