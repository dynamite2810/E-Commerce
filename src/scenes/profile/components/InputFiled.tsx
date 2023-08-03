import React from 'react';

interface InputFieldProps {
  id: string;
  text: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | any | undefined;
}
const InputField: React.FC<InputFieldProps> = ({
  id,
  text,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const errorMessage =
    typeof error === 'object' && 'message' in error ? (error.message as string) : error;
  return (
    <>
      <input
        className="bg-gray-300 border-none outline-none p-1 w-52"
        id={id}
        type={text}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </>
  );
};

export default InputField;
