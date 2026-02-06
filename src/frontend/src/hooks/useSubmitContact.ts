import { useState } from 'react';
import { submitContactForm } from '@/lib/backendClient';

export function useSubmitContact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (name: string, email: string, message: string) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError(null);

    try {
      await submitContactForm(name, email, message);
      setIsSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setIsError(true);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setIsError(false);
        setError(null);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitContact,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
