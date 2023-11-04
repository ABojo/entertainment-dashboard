import styles from "./Loader.module.scss";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  size?: string;
}

export default function Loader({ size }: LoaderProps) {
  return (
    <div className={styles.loader}>
      <ClipLoader color="white" size={size || "5rem"} />
    </div>
  );
}
