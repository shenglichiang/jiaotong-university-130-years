import styles from "./index.less";
import { useState } from "react";

import Editor from "@/components/Editor";
import { RouteArrowDL, RouteArrowDR } from "@/components/RouteGuidence";
import PointIndicator from "@/components/PointIndicator";
import { StartBtn, ContinueBtn } from "@/components/ProgressBtns";
//导入物料
import mainBGImg from "@/assets/mainBGImg.jpg";
import theFirstRestaurant from "@/assets/theFirstRestaurant.png";
import businessmenLeft from "@/assets/businessmenLeft.png";
import twoWillows from "@/assets/twoWillows.png";

const LongImgPage = () => {
  return (
    <div className={styles.longImgPage}>
      <Editor />
      <StartBtn top={15} left={11} />
      {/* 线路指示： */}
      <RouteArrowDL top={16.3} left={17} /> {/* 第一个路线指示*/}
      <RouteArrowDR top={32.7} left={28} /> {/* 第二个路线指示*/}
      <RouteArrowDR top={39} left={69} /> {/* 第三个路线指示*/}
      <RouteArrowDL top={50} left={72.6} /> {/* 第四个路线指示*/}
      {/* 点位指示： */}
      <PointIndicator top={31} left={55.5} /> {/* 画本铺指示 */}
      <PointIndicator top={62} left={56.5} /> {/* 悦来茶园指示 */}
      <img
        src={theFirstRestaurant}
        alt="theFirstRestaurant"
        className={styles.theFirstRestaurant}
      />
      <img
        src={businessmenLeft}
        alt="businessmenLeft"
        className={styles.businessmenLeft}
        loading="lazy"
      />
      <img src={twoWillows} alt="twoWillows" className={styles.twoWillows} />
      <img src={mainBGImg} alt="背景长图" className={styles.longImg} />
    </div>
  );
};

export default LongImgPage;
