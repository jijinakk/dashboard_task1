
// useFormInput.js
import { useState } from 'react';

const useFormInput = () => {
  const [formInput, setFormInput] = useState({
    id: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthdate: "",
    role: "",
    avatar: "",
    state: "",
    postalCode: "",
    username: "",
    password: "",
  });

  

  return {
    formInput,
    setFormInput,
  };
};

export default useFormInput;
