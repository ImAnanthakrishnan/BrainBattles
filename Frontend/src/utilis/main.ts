import { User } from "../hooks/useForm";
import { Quiz } from "../slices/quizSlice";

export const pagination = (
  quizes: Quiz[],
  currentPage: number
): { currentQuiz: Quiz[]; totalPages: number } => {
  const itemsPerPage: number = 1;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentQuiz = quizes.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(quizes.length / itemsPerPage);

  return {
    currentQuiz,
    totalPages,
  };
};

export const validate = (values: User, tab = ''): { [key: string]: string } => {
    let errors: { [key: string]: string } = {};
  
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    // Name validation only for Register tab

    if(tab === "Register"){
        if(values.name?.trim() === ""){
            errors.name = "Username is required";
        }
    }
  
    // Email validation for both Register and Login tabs
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(values.email)) {
      errors.email = "Email is not valid";
    }
  
    // Password validation for both Register and Login tabs
    if (!values.password) {
      errors.password = "Password is required";
    } else if (typeof values.password === 'string' && values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (typeof values.password === 'number' && values.password.toString().length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  
    // Confirm password validation only for Register tab
    if (tab === "Register") {
      if (!values.confirm_password) {
        errors.confirm_password = "Confirm Password is required";
      } else if (values.confirm_password !== values.password) {
        errors.confirm_password = "Passwords do not match";
      }
    }
  
    return errors;
};
  
