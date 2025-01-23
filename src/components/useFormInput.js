// useFormInput.js
import { useState } from "react";

const useFormInput = () => {
  const [formInput, setFormInput] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    avatar: "",
    password: "",
  });

  const [productFormInput, setProductFormInput] = useState({
    id: "",
    title: "",
    price: "",
    categoryId: "",
    description: "",
    images: [],
  });

  return {
    formInput,
    setFormInput,
    productFormInput,
    setProductFormInput,
  };
};

export default useFormInput;
