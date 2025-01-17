
// useFormInput.js
import { useState } from 'react';

const useFormInput = () => {
  const [formInput, setFormInput] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    avatar: "",
    password: "",
  });

  

  return {
    formInput,
    setFormInput,
  };
};

export default useFormInput;
