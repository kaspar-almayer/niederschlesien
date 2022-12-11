import { Link } from "react-router-dom";
function Header({ grave }) {
  return (
    <header className="main-header">
      <Link to="/">
        <h1 className="logo">niederschlesien</h1>
      </Link>
      <div className="main-header__nav">
        <span>kontakt</span>
        <Link to="/graveyards">cmentarze</Link>
      </div>
    </header>
  );
}

export default Header;
