import { useState } from "react";
import styles from "./index.less";

//导入物料
import upRinght from "@/assets/editor/editorUpRight.png";
import upLeft from "@/assets/editor/editorUpLeft.png";
import downRinght from "@/assets/editor/editorDownRight.png";
import downLeft from "@/assets/editor/editorDownLeft.png";

const Editor = () => {
  const [direction, setDirection] = useState<IDirection>("downLeft");

  return <img src={downLeft} alt="" className={styles.editor} />;
};

export default Editor;
