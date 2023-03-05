import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Zoom from "react-medium-image-zoom";

const imgBaseUrl =
  "https://res.cloudinary.com/dqbunghp7/image/upload/";

function Grave({ grave, showGrveyardLink = true }) {
  const { t } = useTranslation();
  return (
    <div className="card">
      <Zoom zoomImg={ {src: `${imgBaseUrl}w_1000/${grave.img}.webp`}}>
        <img src={`${imgBaseUrl}w_300/${grave.img}.webp`} alt="" className="card__img" />
      </Zoom>
      <div className="card__content">
        <p>
          {t("grave.name")}: {grave.name}
        </p>
        <p>
          {t("grave.surname")}: {grave.surname}
        </p>
        <p>
          {t("grave.birthDate")}: {grave.birth_date}
        </p>
        <p>
          {t("grave.deathDate")}: {grave.death_date}
        </p>
        {showGrveyardLink && (
          <Link to={`/graveyard/${grave.graveyard}`}>
            {" "}
            {t("graveyard")} &#x2192;
          </Link>
        )}
      </div>
    </div>
  );
}

export default Grave;
