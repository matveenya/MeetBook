interface AuthErrorLike {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export const getAuthErrorMessage = (
  err: unknown,
  fallbackMessage = 'An unexpected error occurred. Please try again.'
): string => {
  const error = err as AuthErrorLike;
  return error.response?.data?.error ?? fallbackMessage;
};
