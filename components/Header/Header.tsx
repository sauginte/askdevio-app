import Link from "next/link";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import burgerBtn from "../../assets/images/burger-menu.svg";

const Header = () => {
  const router = useRouter();
  const jwt = Cookies.get("user-token");
  const [isShowMobileMenu, setShowMobileMenu] = useState(false);

  const onLogout = () => {
    Cookies.remove("user-token");
    router.push("/");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <img src={logo.src} alt="" />
          </Link>
        </div>
        <NavBar jwtToken={jwt!} onClick={onLogout} />
        <button
          className={styles.burgerBtn}
          onClick={() => setShowMobileMenu((prevState) => !prevState)}
        >
          <img src={burgerBtn.src} alt="" />
        </button>
      </div>
      {isShowMobileMenu && (
        <div className={styles.overlay}>
          <NavBar jwtToken={jwt!} onClick={onLogout} />
        </div>
      )}
    </>
  );
};

export default Header;
