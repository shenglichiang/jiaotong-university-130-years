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
import acceptanceLetter from "@/assets/录取通知书2.png"; // 改为了汽轮机
import machine from "@/assets/汽轮机.png";
import seeVideo from "@/assets/130秒看交大.png";
import littleBtn from "@/assets/littleBtn.png";

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
  const [canScroll, setCanScroll] = useState(false);

  // 定义每个关卡的最大滚动位置（vw）
  const lockPoints = {
    train: 1.2,
    letter: 214.5,
    ship: 389,
    highspeed: 519,
    end: 665,
  };
  const [maxScroll, setMaxScroll] = useState(lockPoints.train); // 当前允许滚到的最大位置

  // 第一个 reminder 出现时机
  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstReminderShown(true);
    }, 2000);
    // 清理定时器
    return () => clearTimeout(timer);
  }, []);

  // 监听 MainTracks 组件的滚动高度
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.style.overflowY = "auto";

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = el.scrollTop;
        const screenWidth = window.innerWidth;
        const scrollVw = (scrollTop / screenWidth) * 100;

        // 限制逻辑（只在 raf 里执行一次）
        if (scrollVw > maxScroll) {
          el.scrollTop = ((maxScroll + 0.1) * screenWidth) / 100;
        }

        // 显示信件按钮
        if (scrollVw >= 655) {
          setLetterShowBtn(true);
        }

        // 底部锁滚动
        if (scrollVw >= 662) {
          el.style.overflowY = "hidden";
        } else {
          el.style.overflowY = "auto";
        }

        ticking = false;
      });
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [maxScroll]);
  // useEffect(() => {
  //   const el = scrollRef.current;
  //   if (!el) return;

  //   el.style.overflowY = "auto";
  //   const handleScroll = () => {
  //     // 当前滚动距离
  //     const scrollTop = el.scrollTop;
  //     const screenWidth = window.innerWidth;
  //     const scrollVw = (scrollTop / screenWidth) * 100;

  //     // console.log(scrollVw);

  //     // 限制位置（用 vw）
  //     if (scrollVw > maxScroll + 0.5) {
  //       el.scrollTop = ((maxScroll + 0.3) * screenWidth) / 100;
  //     }
  //     // 到达位置 → 触发
  //     if (scrollVw >= 655) {
  //       setLetterShowBtn(true);
  //     }

  //     // 到底部后禁止滚动屏幕;
  //     if (scrollVw >= 662) {
  //       el.style.overflowY = "hidden";
  //     }
  //   };

  //   el.addEventListener("scroll", handleScroll);
  //   return () => el.removeEventListener("scroll", handleScroll);
  // }, [maxScroll]);

  // 点击火车
  const handleClickTrain = () => {
    setTrainGone(true);
    setMaxScroll(lockPoints.letter);
  };

  // 点击大学校门
  const handleClickXiAn = () => {
    setMaxScroll(lockPoints.ship);
    setAcceptanceShown(true);
  };

  // 点击船
  const handleClickShip = () => {
    setShipHidden(true);
    setMaxScroll(lockPoints.highspeed);
  };

  // 点击高铁
  const handleClickHihgSpeed = () => {
    setHighspeedClicked(true);
    setMaxScroll(lockPoints.end);
  };

  // 展示信件
  const handleLetterShow = () => {
    setLetterShown(true);
    setLetterShowBtn(false);
  };

  return (
    <div className={styles.mainTracks} ref={scrollRef}>
      <img src={LongImg} alt="背景长图" className={styles.longImg} />
      {!letterShown && (
        <>
          <ClickReminder
            top={14}
            left={trainGone ? 1000 : 32}
            // onClick={handleClickTrain}
          />
          <img src={seeVideo} alt="130秒看交大" className={styles.seeVideo} />

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
              className={`${styles.beijingPop}`}
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
          <img
            src={acceptanceLetter}
            alt="通知书 "
            className={`${styles.acceptanceLetter} 
        // ${acceptanceShown ? styles.acceptanceLetterPop : ""}
        `}
            onClick={handleClickXiAn}
          />
          {!acceptanceShown && (
            <ClickReminder
              top={346}
              left={acceptanceShown ? 1000 : 73}
              zindex={999}
              onClick={handleClickXiAn}
            />
          )}

          <img
            src={xian}
            alt="西安交大校徽"
            className={`${styles.xianBadge} ${acceptanceShown ? styles.xianPopOut : ""}`}
          />

          {acceptanceShown && (
            <img src={xianPop} alt="西安交大弹窗" className={styles.xianPop} />
          )}
          <img src={machine} alt="汽轮机" className={styles.machine} />

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
            <img
              src={xinanPop}
              alt="西南交大弹窗"
              className={styles.xinanPop}
            />
          )}
        </>
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
      {!letterShown && <Collector />}

      {letterShown && (
        <div className={styles.btnsWrapper}>
          {/* 左按钮 */}
          <div className={styles.btnItem}>
            <img src={littleBtn} className={styles.btnBg} />
            <span className={styles.btnText}>分享回信</span>
          </div>

          {/* 右按钮 */}
          <div className={styles.btnItem}>
            <img src={littleBtn} className={styles.btnBg} />
            <span
              className={styles.btnText}
              onClick={() => {
                window.open(
                  "https://kscgc.sctv.com/sctv/h5/v7/specShare.html?id=2041447963618258945",
                  "_blank",
                );
              }}
            >
              查看更多
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainTracks;
