import { useState } from 'react';

export function useForm(inputs = {}) {
  const [formState, setFormState] = useState(inputs);
  const [formError, setFormError] = useState('');

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return { formState, formError, handleFormChange, setFormError };
}
