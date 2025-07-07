import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo.src} alt="" />
      </div>
    </div>
  );
};

export default Header;
