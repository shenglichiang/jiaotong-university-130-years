import styles from "./index.less";

import routeArrowDL from "@/assets/routeArrow/arrowDownLeft.png";
import routeArrowDR from "@/assets/routeArrow/arrowDownRight.png";

export const RouteArrowDL = ({ top, left }: ICoordinates) => {
  return (
    <>
      <img
        src={routeArrowDL}
        alt="arrowDownLeft"
        className={styles.lineArrow}
        style={{
          top: `${top}%`,
          left: `${left}%`,
        }}
        loading="lazy"
      />
    </>
  );
};

export const RouteArrowDR = ({ top, left }: ICoordinates) => {
  return (
    <>
      <img
        src={routeArrowDR}
        alt="arrowDownRight"
        className={styles.lineArrow}
        style={{
          top: `${top}%`,
          left: `${left}%`,
        }}
        loading="lazy"
      />
    </>
  );
};
