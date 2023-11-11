import styles from "./SliderGrid.module.scss";
import TrendingCard from "../TrendingCard/TrendingCard";
import MediaResponse from "../../types/MediaResponse";

interface SliderGridProps {
  title: string;
  mediaData: MediaResponse[];
}

export default function SliderGrid({ title, mediaData }: SliderGridProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>{title}</h1>
      <div className={styles.container__grid}>
        {mediaData.map((media) => {
          return <TrendingCard key={media.id} media={media} />;
        })}
      </div>
    </div>
  );
}
