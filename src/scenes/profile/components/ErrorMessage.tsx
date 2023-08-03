import React from 'react';

interface ErrorMessageProps {
  errors: Record<string, any>;
  name: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, name }) => {
  const errorMessages: React.ReactElement[] | null = errors[name]?.message;

  if (!errorMessages) {
    return null;
  }

  return (
    <>
      {Object.entries(errorMessages).map(([type, message]) => (
        <p className="text-red-600 mb-2" key={type}>
          {message as React.ReactElement}
        </p>
      ))}
    </>
  );
};

export default ErrorMessage;
