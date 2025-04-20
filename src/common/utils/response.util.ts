import {
  ResponseWithError,
  ResponseWithData,
} from '../interface/response.interface';

export const responseWithError = (
  params: ResponseWithError,
): ResponseWithError => {
  const { message, errors } = params;
  return {
    message,
    errors,
  };
};

export const responseWithData = (
  params: ResponseWithData,
): ResponseWithData => {
  const { message, data } = params;
  return {
    message,
    data,
  };
};
