import Link from "next/link";
import styles from "./AuthForm.module.scss";
import Image from "next/image";
import type AuthInputT from "../../types/AuthInput";
import AuthInput from "../AuthInput/AuthInput";

interface AuthFormProps {
  title: string;
  inputs: AuthInputT[];
  submitText: string;
  isLoading: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  subText: {
    message: string;
    linkText: string;
    link: string;
  };
  errorMessage: string;
}

function AuthForm({ title, inputs, submitText, isLoading, onSubmit, subText, errorMessage }: AuthFormProps) {
  const loadingClass = `${styles.form} ${isLoading ? styles["form--loading"] : ""}`;

  return (
    <main className={styles.container}>
      <Image className={styles.logo} src="/images/logo.svg" alt="Entertainment Logo" width={0} height={0} />
      {errorMessage && (
        <div className={styles.error}>
          <h2>Error</h2>
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={onSubmit} className={loadingClass}>
        <h1 className={styles.form__heading}>{title}</h1>
        {inputs.map((input) => (
          <AuthInput key={input.attributes.name} {...input} />
        ))}
        <button type="submit" className={styles.form__submit} disabled={isLoading}>
          {isLoading ? "Loading...." : submitText}
        </button>
        <p className={styles.cta}>
          {subText.message}
          <Link className={styles.cta__link} href={subText.link}>
            {subText.linkText}
          </Link>
        </p>
      </form>
    </main>
  );
}

export default AuthForm;
