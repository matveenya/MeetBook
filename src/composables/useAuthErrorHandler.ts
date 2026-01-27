import { ref } from 'vue';

interface AuthError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export function useAuthErrorHandler() {
  const errorMessage = ref<string | null>(null);

  const handleAuthError = (err: unknown) => {
    const error = err as AuthError;
    errorMessage.value =
      error.response?.data?.error || 'An unexpected error occurred. Please try again.';

    console.error('[Auth Error]:', errorMessage.value);

    return errorMessage.value;
  };

  const clearError = () => {
    errorMessage.value = null;
  };

  return {
    errorMessage,
    handleAuthError,
    clearError,
  };
}
