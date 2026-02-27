import { ref } from 'vue';
import { getAuthErrorMessage } from '../utils/authError';

export function useAuthErrorHandler() {
  const errorMessage = ref<string | null>(null);

  const handleAuthError = (err: unknown) => {
    errorMessage.value = getAuthErrorMessage(err);

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
