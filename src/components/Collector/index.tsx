import styles from "./index.less";

// 导入素材
import container from "@/assets/Collector/校徽底板.png";
import containerGrey from "@/assets/Collector/没点亮前校徽.png";

const Collector = () => {
  return (
    <div className={styles.collectorContainer}>
      <img
        src={containerGrey}
        alt="没点亮前校徽"
        className={styles.greyBadge}
      />
      <img src={container} alt="校徽底板" className={styles.container} />
    </div>
  );
};

export default Collector;
