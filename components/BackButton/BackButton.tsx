import styles from "./BackButton.module.scss";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className={styles.button}
      onClick={() => {
        router.back();
      }}
    >
      &#8592; Back
    </button>
  );
}
