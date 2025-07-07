import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo.src} alt="" />
      </div>
      <nav className={styles.menu}>
        <ul>
          <li>
            <a href="#">All topics</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
