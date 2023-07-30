import { useTranslation } from "react-i18next";
import Header from "./Header";

function Contact() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <Header />
      <h1>{t("header.contact")}</h1>
      <div>
        <p>facebook: <a href="https://www.facebook.com/ostgebieteonline">https://www.facebook.com/ostgebieteonline</a></p>
        <p>email: <a href="mailto:ostgebiete@protonmail.com">ostgebiete@protonmail.com</a></p>
      </div>
    </div>

  );
}

export default Contact;
