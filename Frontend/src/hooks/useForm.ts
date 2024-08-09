import React, { useEffect, useState } from "react";

export interface User {
  name?: string;
  email: string;
  password: any
  confirm_password?: any
}

interface FormErrors {
  [key: string]: string;
}

interface UseFormProps {
  initialValues: User;
  validate?: (values: User,tab?:string) => FormErrors;
  onSubmit: (values: User) => void;
  tab?:string
}

const useForm = ({ initialValues, validate, onSubmit,tab }: UseFormProps) => {
  const [formData, setFormData] = useState<User>(initialValues);

  let [errors, setErrors] = useState<FormErrors>({});
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmited) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        onSubmit(formData);
        setIsSubmited(false);
      } else {
        setIsSubmited(true);
      }
    }
  }, [errors]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate) {
      setErrors(validate(formData,tab));
    }
    setIsSubmited(true);
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleSubmit
  }
};

export default useForm;
