import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Zoom from "react-medium-image-zoom";

const imgBaseUrl =
  "https://exwqjdjcxzewandmmsei.supabase.co/storage/v1/object/public/graves/";

function Grave({ grave, showGrveyardLink = true }) {
  const { t } = useTranslation();
  return (
    <div className="card">
      <Zoom>
        <img src={imgBaseUrl + grave.img} alt="" className="card__img" />
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
