import styles from "./AuthInput.module.scss";
import type AuthInputT from "../../types/AuthInput";

function AuthInput({ isValid, value, attributes }: AuthInputT) {
  let fieldClass = `${styles.field} ${!isValid ? styles["field--invalid"] : ""}`;

  return (
    <div className={fieldClass}>
      <input className={styles.field__input} value={value} {...attributes} />
      <p className={styles.field__error}>Can&apos;t be empty</p>
    </div>
  );
}

export default AuthInput;
