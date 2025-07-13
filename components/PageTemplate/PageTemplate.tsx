import React from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Krona_One } from "next/font/google";

type PageTemplateProps = {
  children: React.ReactNode;
};

const kronaOne = Krona_One({
  subsets: ["latin"],
  weight: ["400"],
});

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className={`${styles.container} ${kronaOne.className}`}>
      <Header />
      <div className={styles.contentWrapper}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
