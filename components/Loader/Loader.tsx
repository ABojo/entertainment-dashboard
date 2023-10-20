import styles from "./Loader.module.scss";
import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <ClipLoader color="white" size={"5rem"} />
    </div>
  );
}
