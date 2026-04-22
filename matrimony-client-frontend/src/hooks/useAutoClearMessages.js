import { useEffect } from 'react';

export const useAutoClearMessages = (error, success, clearMessages) => {
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        clearMessages();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, error, clearMessages]);
};