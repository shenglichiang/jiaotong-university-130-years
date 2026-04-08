import styles from "./index.less";

// 导入素材
import container from "@/assets/Collector/校徽底板.png";
import containerGrey from "@/assets/Collector/没点亮前校徽.png";

const Collector = () => {
  return (
    <div className={styles.collectorContainer}>
      {/* <div className={styles.badges}>
        <img src={beijing} alt="北京大学校徽" className={styles.badge} />
        <img src={shanghai} alt="上海交通大学校徽" className={styles.badge} />
        <img src={xinan} alt="西南交通大学校徽" className={styles.badgeXinan} />
        <img src={xian} alt="西安交通大学校徽" className={styles.badge} />
      </div> */}

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
