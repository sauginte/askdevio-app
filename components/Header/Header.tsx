import Link from "next/link";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import NavBar from "../NavBar/NavBar";

const Header = () => {
  const router = useRouter();
  const jwt = Cookies.get("user-token");

  const onLogout = () => {
    Cookies.remove("user-token");
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <img src={logo.src} alt="" />
        </Link>
      </div>
      <NavBar jwtToken={jwt!} onClick={onLogout} />
    </div>
  );
};

export default Header;
