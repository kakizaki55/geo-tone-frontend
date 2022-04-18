import { useState } from 'react';

export function useForm(inputs = {}) {
  const [formState, setFormState] = useState(inputs);
  const [formMessage, setFormMessage] = useState('');

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return { formState, formMessage, handleFormChange, setFormMessage };
}
