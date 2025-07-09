import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Headers = () => {
  const [show, setShow] = useState(false);
  const { i18n, t } = useTranslation();

  const handleButtonToggle = () => {
    setShow(!show);
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header>
      <div className="container">
        <div className="grid navbar-grid">
          <div className="Logo">
            <NavLink to="/">
              <h1> World Atlas</h1>
            </NavLink>
          </div>

          <nav className={show ? "menu-mobile" : "menu-web"}>
            <ul>
              <li>
                {" "}
                <NavLink to="/">{t("Home")}</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/about">{t("About")}</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/country">{t("Country")}</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/contact">{t("Contact")}</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/favorites">{t("Favorites")}</NavLink>
              </li>
              <li>
                <select
                  onChange={handleLanguageChange}
                  value={i18n.language}
                  style={{
                    borderRadius: "1rem",
                    padding: "0.2rem 0.7rem",
                    marginLeft: "1rem",
                  }}
                >
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                  <option value="fr">FR</option>
                </select>
              </li>
            </ul>
          </nav>

          <div className="ham-menu">
            <button onClick={handleButtonToggle}>
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
