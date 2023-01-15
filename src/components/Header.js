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
          <img src={logo} alt="logo"></img>
        </Link>
      </div>
      <div className="main-header__nav">
        <Link to="/contact">{t("header.contact")}</Link>
        <Link to="/graveyards">{t("header.graveyards")}</Link>
        <Link to="/search">{t("header.search")}</Link>
      </div>
      <div className="main-header__lang">
          <label htmlFor="lang">{t("header.setLang")}:</label>
          <select
            name="lang"
            id="lang"
            onChange={changeLang}
            value={i18n.language}
          >
            <option value="pl">PL</option>
            <option value="de">DE</option>
          </select>
        </div>
    </header>
  );
}

export default Header;
