import styles from "./index.less";
import { useStartStore } from "./StartPage/index";
import MainTracks from "@/pages/MainTracks";
import StartPage from "@/pages/StartPage";
import { useEffect, useRef, useState } from "react";

import bgmOn from "@/assets/bgmSwitch/开.png";
import bgmOff from "@/assets/bgmSwitch/关.png";
import bgm from "@/assets/audios/h5bgm.mp3";

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const { isTicketClicked } = useStartStore();

  // 同步音频播放状态
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncState = () => setBgmPlaying(!audio.paused);
    audio.addEventListener("play", syncState);
    audio.addEventListener("pause", syncState);
    audio.addEventListener("ended", syncState);

    return () => {
      audio.removeEventListener("play", syncState);
      audio.removeEventListener("pause", syncState);
      audio.removeEventListener("ended", syncState);
    };
  }, []);

  // 手动切换播放状态
  const toggleBgm = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((err) => console.log("用户未交互，暂时不能播放", err));
    } else {
      audio.pause();
    }
  };

  return (
    <div className={styles.mainContainer}>
      <img
        src={bgmPlaying ? bgmOff : bgmOn}
        className={`${styles.bgmSwitch} ${bgmPlaying ? styles.spin : ""}`}
        alt="bgm"
        onClick={toggleBgm}
      />

      <audio ref={audioRef} src={bgm} loop style={{ display: "none" }} />

      {isTicketClicked ? <MainTracks /> : <StartPage />}
    </div>
  );
}
