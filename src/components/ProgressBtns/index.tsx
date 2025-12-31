// 和进程有关的按钮都在这里，包括开始、继续等

import styles from "./index.less";

import startBtn from "../../assets/progressBtns/startBtn.png";
import continueBtn from "../../assets/progressBtns/continueBtn.png";
import progressBtnBG from "../../assets/progressBtns/progressBtnGB.png";

export const StartBtn = ({ top, left }: ICoordinates) => {
  return (
    <div
      className={styles.progressBtnWrapper}
      style={{ top: `${top}`, left: `${left}` }}
    >
      <img
        src={startBtn}
        alt="startBtn"
        className={styles.progressBtn}
        loading="lazy"
      />
      <img
        src={progressBtnBG}
        alt="按钮背景"
        className={styles.progressBtnBG}
      />
    </div>
  );
};

export const ContinueBtn = ({ top, left }: ICoordinates) => {
  return (
    <div style={{ top: `${top}`, left: `${left}` }}>
      <img
        src={continueBtn}
        alt="countinueBtn"
        className={styles.progressBtn}
        loading="lazy"
      />
      <img
        src={progressBtnBG}
        alt="按钮背景"
        className={styles.progressBtnBG}
      />
    </div>
  );
};
