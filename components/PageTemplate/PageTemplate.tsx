import React from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type PageTemplateProps = {
  children: React.ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
