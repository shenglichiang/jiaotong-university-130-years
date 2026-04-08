import styles from "./index.less";
import { useEffect, useRef, useState } from "react";
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

// 四个学校的弹窗
import beijingPop from "@/assets/FourPopouts/北京交通大学.png";
import shanghaiPop from "@/assets/FourPopouts/上海交通大学.png";
import xianPop from "@/assets/FourPopouts/西安交通大学.png";
import xinanPop from "@/assets/FourPopouts/西南交通大学.png";

// ending 页面素材
import letter from "@/assets/EndingPage/信.png";
import container from "@/assets/Collector/校徽底板.png";

const MainTracks = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 四个主交互
  const [trainGone, setTrainGone] = useState(false);
  const [shipHidden, setShipHidden] = useState(false);
  const [acceptanceShown, setAcceptanceShown] = useState(false);
  const [highspeedClicked, setHighspeedClicked] = useState(false);

  // 进程交互
  const [letterShowBtn, setLetterShowBtn] = useState(false);
  const [letterShown, setLetterShown] = useState(false);
  const [firstReminderShown, setFirstReminderShown] = useState(false);
  // const [canScroll, setCanScroll] = useState(true);
  const [canScroll, setCanScroll] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);

  // 第一个 reminder 出现时机
  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstReminderShown(true);
    }, 3000);
    // 清理定时器
    return () => clearTimeout(timer);
  }, []);

  // 监听 MainTracks 组件的滚动高度
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      // 当前滚动距离
      const scrollTop = el.scrollTop;

      console.log(scrollTop);

      if (!trainGone && scrollTop > 0) {
        setCanScroll(false); // 滑过火车区域 → 禁止
      }
      if (!acceptanceShown && scrollTop > 850) {
        setCanScroll(false); // 滑过通知书区域 → 禁止
      }
      if (!shipHidden && scrollTop > 1414) {
        setCanScroll(false); // 滑过轮船区域 → 禁止
      }
      if (!highspeedClicked && scrollTop > 1852) {
        setCanScroll(false); // 滑过高铁区域 → 禁止
      }

      // 到达位置 → 触发
      if (scrollTop >= 2020) {
        setLetterShowBtn(true);
      } else {
        setLetterShowBtn(false);
      }

      // 到底部后禁止滚动屏幕
      // if (scrollTop > 2105) {
      //   setCanScroll(false);
      // }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // 监听 canScroll 状态
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (canScroll) {
      el.style.overflowY = "scroll"; // 允许滑动
    } else {
      el.style.overflowY = "hidden"; // 禁止滑动
    }
  }, [canScroll]);

  // 点击火车
  const handleClickTrain = () => {
    setTrainGone(true);
    setCanScroll(true);
  };

  // 点击大学校门
  const handleClickXiAn = () => {
    setCanScroll(true);
    setAcceptanceShown(true);
  };

  // 点击船
  const handleClickShip = () => {
    setShipHidden(true);
    setCanScroll(true);
  };

  // 点击高铁
  const handleClickHihgSpeed = () => {
    setHighspeedClicked(true);
    setCanScroll(true);
  };

  // 展示信件
  const handleLetterShow = () => {
    setLetterShown(true);
    setLetterShowBtn(false);
  };

  return (
    <div className={styles.mainTracks} ref={scrollRef}>
      <img src={LongImg} alt="背景长图" className={styles.longImg} />
      <img src={train1} alt="火车1左边" className={styles.train1} />

      {/* 火车交互—————————— */}
      {!trainGone && firstReminderShown && (
        <ClickReminder
          top={90}
          left={trainGone ? 1000 : 78}
          onClick={handleClickTrain}
        />
      )}
      <img
        src={train2}
        alt="火车2右边 "
        className={`${styles.train2} ${trainGone ? styles.trainGone : ""}`}
        onClick={handleClickTrain}
      />
      <img
        src={beijing}
        alt="北京交大校徽"
        className={`${styles.beijingBadge} ${trainGone ? styles.beijingPopOut : ""}`}
      />

      {trainGone && (
        <img
          src={beijingPop}
          alt="北京交通大学弹窗"
          className={`${styles.beijingPop}  `}
        />
      )}

      {/* 绿色火车 */}
      <div className={styles.trainLights}>
        <div className={styles.light1}></div>
        <div className={styles.light2}></div>
        <div className={styles.light3}></div>
      </div>
      <img src={trainGreen} alt="火车绿色 " className={styles.trainGreen} />

      {/* 通知书交互—————————— */}
      {!acceptanceShown && (
        <ClickReminder
          top={332}
          left={acceptanceShown ? 1000 : 57}
          onClick={handleClickXiAn}
          zindex={9999}
        />
      )}
      <img
        src={acceptanceLetter}
        alt="通知书 "
        className={`${styles.acceptanceLetter} 
        ${acceptanceShown ? styles.acceptanceLetterPop : ""}
        `}
        onClick={handleClickXiAn}
      />
      <img
        src={xian}
        alt="西安交大校徽"
        className={`${styles.xianBadge} ${acceptanceShown ? styles.xianPopOut : ""}`}
      />

      {acceptanceShown && (
        <img src={xianPop} alt="西安交大弹窗" className={styles.xianPop} />
      )}

      {/* 轮船交互—————————— */}

      {!shipHidden && (
        <ClickReminder
          top={514}
          left={shipHidden ? 1000 : 78}
          onClick={handleClickShip}
        />
      )}

      <img
        src={ship}
        alt="轮船 "
        className={`${styles.ship} ${shipHidden ? styles.shipHide : ""}`}
        onClick={handleClickShip}
      />
      <img
        src={shanghai}
        alt="上海交大校徽"
        className={`${styles.shanghaiBadge} ${shipHidden ? styles.shanghaiPopOut : ""}`}
      />
      {shipHidden && (
        <img
          src={shanghaiPop}
          alt="上海交大弹窗"
          className={styles.shanghaiPop}
        />
      )}

      {/* 高铁交互—————————— */}
      {!highspeedClicked && (
        <ClickReminder
          top={662}
          left={highspeedClicked ? 1000 : 28}
          onClick={handleClickHihgSpeed}
        />
      )}
      <img
        src={highSpeed}
        alt="高铁 "
        className={`${styles.highSpeed}
        //  ${highspeedClicked ? styles.shipHide : ""}
         `}
        onClick={handleClickHihgSpeed}
      />
      <img
        src={xinan}
        alt="西南交大校徽"
        className={`${styles.xinanBadge} ${highspeedClicked ? styles.xinanPopOut : ""}`}
      />

      {highspeedClicked && (
        <img src={xinanPop} alt="西南交大弹窗" className={styles.xinanPop} />
      )}

      {/* 结束页—————————— */}

      {letterShowBtn && (
        <div className={styles.seeLetter} onClick={handleLetterShow}>
          <div className={styles.btnText}>看总书记回信</div>
          <img src={container} alt="校徽底板" className={styles.seemoreBtn} />
        </div>
      )}

      {letterShown && (
        <img
          src={letter}
          alt="信件"
          className={`${styles.letter} ${letterShown ? styles.acceptanceLetterPop : ""}`}
        />
      )}

      <Collector />
    </div>
  );
};

export default MainTracks;
