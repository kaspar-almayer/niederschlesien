import React from "react";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();
  return (
    <div className="hero">
      <h2>{t("mainHeading")}</h2>
      {/* <div className="hero__img-container">
        <img src={hero_img1} alt="" className="hero__img" />
        <img src={hero_img2} alt="" className="hero__img" />
      </div> */}
    </div>
  );
}

export default Hero;
