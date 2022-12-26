//import hero_img1 from "../assets/hero-img1.jpg";
//import hero_img2 from "../assets/hero-img2.jpg";

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
