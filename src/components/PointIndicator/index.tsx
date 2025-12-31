import styles from "./index.less";

import pointIndicator from "@/assets/pointIndicator.png";

const PointIndicator = ({ top, left }: ICoordinates) => {
  return (
    <img
      src={pointIndicator}
      alt="pointIndicator"
      className={styles.pointIndicator}
      style={{
        top: `${top}%`,
        left: `${left}%`,
      }}
      loading="lazy"
    />
  );
};

export default PointIndicator;
