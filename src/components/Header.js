import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <header className="main-header">
      <Link to="/">
        <h1 className="logo">niederschlesien</h1>
      </Link>
      <div className="main-header__nav">
        <span>{t("header.contact")}</span>
        <Link to="/graveyards">{t("header.graveyards")}</Link>
        <Link to="/search">{t("header.search")}</Link>
        <span>
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
        </span>
      </div>
    </header>
  );
}

export default Header;
