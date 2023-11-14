import styles from "./Loader.module.scss";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  size?: string;
  absoluteCenter?: boolean;
}

export default function Loader({ size, absoluteCenter }: LoaderProps) {
  return (
    <div className={absoluteCenter ? styles.loader : ""}>
      <ClipLoader color="white" size={size || "5rem"} />
    </div>
  );
}
