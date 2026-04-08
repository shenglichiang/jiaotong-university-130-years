import styles from "./index.less";
import { useState } from "react";
import ClickReminder from "@/components/ClickReminder";
import Collector from "@/components/Collector";

// 导入素材
import LongImg from "@/assets/LongImgPage.jpg";
import train1 from "@/assets/车1.png";
import train2 from "@/assets/车2.png";
import trainGreen from "@/assets/车3.png";
import ship from "@/assets/船结构图.png";
import highSpeed from "@/assets/高铁.png";
import acceptanceLetter from "@/assets/录取通知书.png";

// 四个校徽素材
import beijing from "@/assets/Collector/北京大学校徽.png";
import shanghai from "@/assets/Collector/上海交通大学校徽.png";
import xinan from "@/assets/Collector/西南交通大学校徽.png";
import xian from "@/assets/Collector/西安交通大学校徽.png";

const MainTracks = () => {
  const [trainGone, setTrainGone] = useState(false);
  const [shipHidden, setShipHidden] = useState(false);
  const [acceptanceShown, setAcceptanceShown] = useState(false);

  // 点击火车
  const handleClickTrain = () => {
    setTrainGone(true);
  };

  // 点击大学校门
  const handleClickXiAn = () => {
    setAcceptanceShown(true);
  };

  // 点击船
  const handleClickShip = () => {
    setShipHidden(true);
  };

  return (
    <div className={styles.mainTracks}>
      <img src={train1} alt="火车1左边" className={styles.train1} />

      {/* 火车交互—————————— */}
      <ClickReminder
        top={90}
        left={trainGone ? 1000 : 78}
        onClick={handleClickTrain}
      />
      <img
        src={train2}
        alt="火车2右边 "
        className={`${styles.train2} ${trainGone ? styles.trainGone : ""}`}
        onClick={handleClickTrain}
      />
      <img src={beijing} alt="北京交大校徽" className={styles.beijingBadge} />

      {/* 绿色火车 */}
      <div className={styles.trainLights}>
        <div className={styles.light1}></div>
        <div className={styles.light2}></div>
        <div className={styles.light3}></div>
      </div>
      <img src={trainGreen} alt="火车绿色 " className={styles.trainGreen} />

      {/* 通知书交互—————————— */}
      <ClickReminder
        top={332}
        left={shipHidden ? 1000 : 58}
        onClick={handleClickXiAn}
      />
      <img
        src={acceptanceLetter}
        alt="通知书 "
        className={`${styles.acceptanceLetter} ${acceptanceShown ? styles.acceptanceLetterPop : ""}`}
        onClick={handleClickXiAn}
      />
      <img src={xian} alt="西安交大校徽" className={styles.xianBadge} />

      {/* 轮船交互—————————— */}
      <ClickReminder
        top={514}
        left={shipHidden ? 1000 : 78}
        onClick={handleClickShip}
      />
      <img
        src={ship}
        alt="轮船 "
        className={`${styles.ship} ${shipHidden ? styles.shipHide : ""}`}
        onClick={handleClickShip}
      />
      <img src={shanghai} alt="上海交大校徽" className={styles.shanghaiBadge} />

      {/* 高铁交互—————————— */}
      <ClickReminder
        top={662}
        left={shipHidden ? 1000 : 28}
        onClick={handleClickShip}
      />
      <img
        src={highSpeed}
        alt="高铁 "
        className={`${styles.highSpeed} ${shipHidden ? styles.shipHide : ""}`}
        onClick={handleClickShip}
      />
      <img src={xinan} alt="西南交大校徽" className={styles.xinanBadge} />

      {/* 开路先锋—————————— */}
      <ClickReminder
        top={830}
        left={shipHidden ? 1000 : 78}
        onClick={handleClickShip}
      />

      <Collector />
      <img src={LongImg} alt="背景长图" className={styles.longImg} />
    </div>
  );
};

export default MainTracks;
