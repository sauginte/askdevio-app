import Link from "next/link";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <img src={logo.src} alt="" />
        </Link>
      </div>
      <nav className={styles.menu}>
        <ul>
          <li>
            <Link href="/">All topics</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
