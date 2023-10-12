"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../utils/apiClient";
import validators from "../../utils/validators";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthInput from "../../types/AuthInput";

function Login() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [usernameField, setUsernameField] = useState<AuthInput>({
    isValid: true,
    value: "",
    attributes: {
      type: "text",
      id: "username",
      name: "username",
      placeholder: "Username",
      onChange: (e) => {
        setUsernameField({
          ...usernameField,
          value: e.target.value,
        });
      },
    },
  });

  const [passwordField, setPasswordField] = useState<AuthInput>({
    isValid: true,
    value: "",
    attributes: {
      type: "password",
      name: "password",
      id: "password",
      placeholder: "Password",
      onChange: (e) => {
        setPasswordField({
          ...passwordField,
          value: e.target.value,
        });
      },
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const usernameIsValid = validators.username(usernameField.value);
    const passwordIsValid = validators.password(passwordField.value);

    if (!usernameIsValid) {
      setUsernameField({ ...usernameField, isValid: false });
    }

    if (!passwordIsValid) {
      setPasswordField({ ...passwordField, isValid: false });
    }

    if (usernameIsValid && passwordIsValid) {
      setErrorMessage("");
      setIsLoading(true);
      const json = await apiClient.login(usernameField.value, passwordField.value);
      console.log(json);
      setIsLoading(false);

      if (json.status === "success") {
        push("/");
      } else {
        setErrorMessage(json.message);
      }
    }
  };

  return (
    <AuthForm
      title="Login"
      isLoading={isLoading}
      onSubmit={onSubmit}
      inputs={[usernameField, passwordField]}
      submitText="Login to your account"
      subText={{ message: "Don't have an account?", linkText: "Sign Up", link: "/register" }}
      errorMessage={errorMessage}
    />
  );
}

export default Login;
