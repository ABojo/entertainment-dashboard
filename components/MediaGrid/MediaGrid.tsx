import styles from "./MediaGrid.module.scss";
import MediaCard from "../MediaCard/MediaCard";
import MediaResponse from "../../types/MediaResponse";

interface MediaGridProps {
  title: string;
  mediaData: MediaResponse[];
}

export default function MediaGrid({ mediaData, title }: MediaGridProps) {
  return (
    <section className={styles.container}>
      <h1 className={styles.container__title}>{title}</h1>
      <div className={styles.container__grid}>
        {mediaData.map((data) => {
          return <MediaCard key={data.id} media={data} />;
        })}
      </div>
    </section>
  );
}
