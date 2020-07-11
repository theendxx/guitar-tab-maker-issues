import { useToasts } from 'react-toast-notifications';

type Response = {
  displayWarning: (message: string) => void;
  displayError: (message: string) => void;
};

export const useToast = (): Response => {
  const { addToast } = useToasts();

  const displayWarning = (message: string): void => {
    addToast(message, {
      appearance: 'warning',
      autoDismiss: true,
    });
  };

  const displayError = (message: string): void => {
    addToast(message, {
      appearance: 'error',
      autoDismiss: true,
    });
  };
  return {
    displayWarning,
    displayError,
  };
};