import styles from "./styles.module.css";
import Link from "next/link";
import Logout from "../../assets/images/logout.svg";

type NavBarProps = {
  jwtToken: string;
  onClick: () => void;
};

const NavBar = ({ jwtToken, onClick }: NavBarProps) => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <Link href="/">All questions</Link>
        </li>
        <li>
          <Link href={"/insert"}>Ask question</Link>
        </li>
        {jwtToken ? (
          <button onClick={onClick} className={styles.logoutBtn}>
            <img src={Logout.src} alt="" />
          </button>
        ) : (
          <li className={styles.loginBtn}>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
