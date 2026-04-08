import styles from "./index.less";

interface IClickReminder {
  top: number;
  left: number;
  onClick?: () => void;
  zindex?: number;
  className?: string;
}

const ClickReminder = ({ top, left, onClick, zindex }: IClickReminder) => {
  return (
    <div
      className={styles.clickTipRing}
      style={{
        top: `${top}vw`,
        left: `${left}vw`,
        zIndex: zindex,
      }}
    ></div>
  );
};
export default ClickReminder;
