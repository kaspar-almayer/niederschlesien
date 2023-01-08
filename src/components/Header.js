import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.svg"

function Header() {
  const { t, i18n } = useTranslation();
  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <header className="main-header">
      <div className="main-header__logo">
        <Link to="/">
          <img src={logo}></img>
        </Link>
        <div className="main-header__lang   main-header__lang--mobile">
          <label for="lang">{t("header.setLang")}:</label>
          <select
            name="lang"
            id="lang"
            onChange={changeLang}
            value={i18n.language}
          >
            <option value="pl">Polski</option>
            <option value="de">Deutsche</option>
          </select>
        </div>
      </div>
      <div className="main-header__nav">
        <span>{t("header.contact")}</span>
        <Link to="/graveyards">{t("header.graveyards")}</Link>
        <Link to="/search">{t("header.search")}</Link>
        <div className="main-header__lang">
          <label for="lang">{t("header.setLang")}:</label>
          <select
            name="lang"
            id="lang"
            onChange={changeLang}
            value={i18n.language}
          >
            <option value="pl">Polski</option>
            <option value="de">Deutsche</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
