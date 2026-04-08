import styles from "./index.less";
import ClickReminder from "@/components/ClickReminder";
import { create } from "zustand";
import maintitle from "@/assets/StartPage/maintitle.png";
import ticket from "@/assets/StartPage/ticket.png";
import startbgimg from "@/assets/StartPage/startbgimg.png";
import { useCallback, useEffect, useRef, useState } from "react";
import newsVoice from "@/assets/audios/newsvoice.mp3";

interface StartStore {
  isTicketClicked: boolean;
  setIsTicketClicked: (value: boolean) => void;
}

export const useStartStore = create<StartStore>()((set) => ({
  isTicketClicked: false,
  setIsTicketClicked: (value: boolean) => set({ isTicketClicked: value }),
}));

const StartPage = () => {
  const text = `\u00A0\u00A0\u00A0\u00A0\u00A0近日，中共中央总书记、国家主席、中央军委主席习近平给上海交通大学、西安交通大学、西南交通大学、北京交通大学全体师生回信，对学校发展寄予殷切期望……`;

  const newsAudioRef = useRef<HTMLAudioElement>(null);
  const [displayText, setDisplayText] = useState("");
  const { isTicketClicked, setIsTicketClicked } = useStartStore();
  const [ticketGone, setTicketGone] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewsPlaying, setIsNewsPlaying] = useState(false);
  const [isReminderShow, setIsReminderShow] = useState(true);
  const [isnewsEnd, setIsnewsEnd] = useState(false);

  // 加载动画
  useEffect(() => {
    const totalTime = 3500;
    const interval = 30;
    const totalSteps = totalTime / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const p = Math.round((step / totalSteps) * 100);
      setPercent(Math.min(p, 100));

      if (step >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // 音频播放（稳定、防抖、重置状态）
  const handleNewsplay = useCallback(async () => {
    const audio = newsAudioRef.current;
    if (!audio || isNewsPlaying) return;

    // 重播：重置所有状态
    setIsReminderShow(false);
    setIsnewsEnd(false);

    try {
      setIsNewsPlaying(true);
      audio.currentTime = 0; // 从头播放
      await audio.play();
    } catch (err) {
      console.error("播放失败：", err);
      setIsNewsPlaying(false);
      setIsReminderShow(true);
    }
  }, [isNewsPlaying]);

  // 音频结束监听（正确时机绑定+延迟1.5s）
  useEffect(() => {
    // 等加载完成、audio 存在再绑监听
    if (isLoading) return;
    const audio = newsAudioRef.current;
    if (!audio) return;

    const handleAudioEnded = () => {
      setTimeout(() => {
        setIsnewsEnd(true);
        setIsNewsPlaying(false);
        setIsReminderShow(true);
      }, 1500);
    };

    audio.addEventListener("ended", handleAudioEnded);
    return () => {
      audio.removeEventListener("ended", handleAudioEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isLoading]); // 依赖 isLoading：确保 audio 已渲染

  // 打字机效果
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 170);
    return () => clearInterval(timer);
  }, []);

  // 5. 点击车票进入
  const startJurney = () => {
    setTicketGone(true);
    // 播放中则停止音频
    const audio = newsAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setTimeout(() => setIsTicketClicked(true), 500);
  };

  return (
    <div className={styles.startContainer}>
      {isLoading ? (
        // 加载中
        <div className={styles.loadingWrap}>
          <div className={styles.loadingProgress} />
          <div className={styles.loadingText}>{`${percent}%`}</div>
        </div>
      ) : (
        // 加载完成
        <>
          <audio
            ref={newsAudioRef}
            src={newsVoice}
            loop={false}
            preload="auto"
            style={{ display: "none" }}
          />

          {/* 点击提示 */}
          {isReminderShow && (
            <ClickReminder
              top={116}
              left={74}
              zindex={9999}
              onClick={handleNewsplay}
            />
          )}

          <div
            className={`${styles.textWrapper} ${isnewsEnd ? styles.fadeAway : ""}`}
            onClick={handleNewsplay}
          >
            <div className={styles.newsTxt}>{displayText}</div>
          </div>

          {/* 车票 */}
          <img
            src={ticket}
            alt="车票"
            className={`
              ${styles.ticket} 
              ${ticketGone ? styles.scanDisappear : ""} 
              ${isnewsEnd ? styles.ticketPopup : ""}
            `}
            onClick={startJurney}
          />
        </>
      )}

      {/* 标题与背景 */}
      <img src={maintitle} alt="主标题" className={styles.maintitle} />
      <img src={startbgimg} alt="背景" className={styles.startbgimg} />
    </div>
  );
};

export default StartPage;

// import styles from "./index.less";
// import ClickReminder from "@/components/ClickReminder";
// import { create } from "zustand";
// // 导入素材
// import maintitle from "@/assets/StartPage/maintitle.png";
// import ticket from "@/assets/StartPage/ticket.png";
// import startbgimg from "@/assets/StartPage/startbgimg.png";
// import { useCallback, useEffect, useRef, useState } from "react";
// import newsVoice from "@/assets/audios/newsvoice.mp3";

// interface StartStore {
//   isTicketClicked: boolean;
//   setIsTicketClicked: (value: boolean) => void;
// }

// export const useStartStore = create<StartStore>()((set) => ({
//   isTicketClicked: false,
//   setIsTicketClicked: (value: boolean) => set({ isTicketClicked: true }),
// }));
// const StartPage = () => {
//   const text = `\u00A0\u00A0\u00A0\u00A0\u00A0近日，中共中央总书记、国家主席、中央军委主席习近平给上海交通大学、西安交通大学、西南交通大学、北京交通大学全体师生回信，对学校发展提出殷切期望……`;
//   const newsAudioRef = useRef<HTMLAudioElement>(null);
//   // 当前显示的文字
//   const [displayText, setDisplayText] = useState("");
//   const { isTicketClicked, setIsTicketClicked } = useStartStore();
//   const [ticketGone, setTicketGone] = useState<boolean>();
//   const [percent, setPercent] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isNewsPlaying, setIsNewsPlaying] = useState(false);
//   const [isReminderShow, setIsReminderShow] = useState(true);
//   const [isnewsEnd, setIsnewsEnd] = useState(false);

//   // 加载动画
//   useEffect(() => {
//     const totalTime = 3500;
//     const interval = 30; // 每30ms刷新一次
//     const totalSteps = totalTime / interval;
//     let step = 0;

//     const timer = setInterval(() => {
//       step++;
//       const p = Math.round((step / totalSteps) * 100);
//       setPercent(p > 100 ? 100 : p);

//       if (step >= totalSteps) {
//         clearInterval(timer);
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 500);
//       }
//     }, interval);
//   }, []);

//   //   音频播放
//   const handleNewsplay = useCallback(async () => {
//     const audio = newsAudioRef.current;
//     if (!audio || isNewsPlaying) return;

//     setIsReminderShow(false);
//     setIsnewsEnd(false); // 重播时重置淡出状态

//     try {
//       setIsNewsPlaying(true);
//       audio.currentTime = 0; // 从头播放
//       await audio.play();
//     } catch (err) {
//       console.error("音频播放失败：", err);
//       setIsNewsPlaying(false);
//       setIsReminderShow(true);
//     }
//   }, [isNewsPlaying]);

//   // news 音频结束监听
//   useEffect(() => {
//     const audio = newsAudioRef.current;
//     if (!audio) return;

//     const handleAudioEnded = () => {
//       // 音频结束 → 延迟1.5秒执行淡出
//       setTimeout(() => {
//         setIsnewsEnd(true);
//         setIsNewsPlaying(false);
//         setIsReminderShow(true);
//       }, 1500);
//     };

//     audio.addEventListener("ended", handleAudioEnded);
//     return () => {
//       audio.removeEventListener("ended", handleAudioEnded);
//       audio.pause();
//       audio.currentTime = 0;
//     };
//   }, []);

//   // 打字机效果
//   useEffect(() => {
//     let index = 0;
//     const timer = setInterval(() => {
//       if (index < text.length) {
//         setDisplayText(text.slice(0, index + 1));
//         index++;
//       } else {
//         clearInterval(timer);
//       }
//     }, 170); // 打字速度（越小越快）

//     return () => clearInterval(timer);
//   }, []);

//   // 开始探索
//   const startJurney = () => {
//     setTicketGone(true);
//     setTimeout(() => {
//       setIsTicketClicked(true);
//     }, 500);
//   };
//   return (
//     <div className={styles.startContainer}>
//       {/* 加载进度条 */}
//       {isLoading ? (
//         <>
//           <div className={styles.loadingWrap}>
//             <div className={styles.loadingProgress}></div>
//             <div className={styles.loadingText}>{`${percent}%`}</div>
//           </div>
//         </>
//       ) : (
//         <>
//           <audio
//             ref={newsAudioRef}
//             src={newsVoice}
//             loop={false} // 是否循环
//             style={{ display: "none" }}
//           />
//           {isReminderShow && (
//             <ClickReminder
//               top={116}
//               left={74}
//               zindex={99}
//               onClick={handleNewsplay}
//             />
//           )}
//           {/* 新闻文字 */}
//           <div
//             className={`${styles.textWrapper} ${isnewsEnd ? styles.fadeAway : ""}`}
//             onClick={handleNewsplay}
//           >
//             <div className={styles.newsTxt} onClick={handleNewsplay}>
//               {displayText}
//             </div>
//           </div>
//           <img
//             src={ticket}
//             alt="车票"
//             className={`${styles.ticket} ${ticketGone ? styles.scanDisappear : ""}`}
//             onClick={startJurney}
//           />
//         </>
//       )}
//       <img src={maintitle} alt="主视觉标" className={styles.maintitle} />
//       <img src={startbgimg} alt="开始页背景图" className={styles.startbgimg} />
//     </div>
//   );
// };

// export default StartPage;
