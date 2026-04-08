import styles from "./index.less";

interface IClickReminder {
  top: number;
  left: number;
  onClick?: () => void;
  zindex?: number;
  className?: string;
}

const ClickReminder = ({
  top,
  left,
  onClick,
  zindex,
  className = "",
}: IClickReminder) => {
  return (
    <div
      className={`${styles.clickTipRing} ${className}`}
      style={{
        top: `${top}vw`,
        left: `${left}vw`,
        zIndex: zindex,
        cursor: "pointer",
      }}
      onClick={onClick}
    ></div>
  );
};

export default ClickReminder;
