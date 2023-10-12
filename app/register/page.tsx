"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import validators from "../../utils/validators";
import type AuthInput from "../../types/AuthInput";
import AuthForm from "../../components/AuthForm/AuthForm";
import apiClient from "../../utils/apiClient";

function Register() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [usernameField, setUsernameField] = useState<AuthInput>({
    isValid: true,
    value: "",
    attributes: {
      type: "text",
      name: "username",
      id: "username",
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
      id: "passowrd",
      name: "password",
      placeholder: "Password",
      onChange: (e) => {
        setPasswordField({
          ...passwordField,
          value: e.target.value,
        });
      },
    },
  });

  const [repeatField, setRepeatField] = useState<AuthInput>({
    isValid: true,
    value: "",
    attributes: {
      type: "password",
      name: "repeat",
      id: "repeat",
      placeholder: "Repeat password",
      onChange: (e) => {
        setRepeatField({
          ...repeatField,
          value: e.target.value,
        });
      },
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const usernameIsValid = validators.username(usernameField.value);
    const passwordIsValid = validators.password(passwordField.value);
    const passwordsMatch = passwordField.value === repeatField.value;

    if (!usernameIsValid) {
      setUsernameField({ ...usernameField, isValid: false });
    }

    if (!passwordIsValid) {
      setPasswordField({ ...passwordField, isValid: false });
    }

    if (!passwordsMatch) {
      setRepeatField({ ...repeatField, isValid: false });
    }

    if (usernameIsValid && passwordIsValid && passwordsMatch) {
      if (errorMessage) setErrorMessage("");

      setIsLoading(true);
      const json = await apiClient.register(usernameField.value, passwordField.value);
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
      title="Sign Up"
      isLoading={isLoading}
      onSubmit={onSubmit}
      inputs={[usernameField, passwordField, repeatField]}
      submitText="Create an account"
      subText={{ message: "Already have an account?", linkText: "Login", link: "/login" }}
      errorMessage={errorMessage}
    />
  );
}

export default Register;
