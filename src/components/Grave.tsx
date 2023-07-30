import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Zoom from "react-medium-image-zoom";

import { register } from 'swiper/element/bundle';

register();

import { GraveType, PeopleType} from "../types.ts";

const imgBaseUrl =
  "https://res.cloudinary.com/dqbunghp7/image/upload/";


function Person({ person }: {person: PeopleType}) {
  const { t } = useTranslation();
  return (
    <div className="person">
      <p>
          {t("grave.name")}: {person.name}
        </p>
        <p>
          {t("grave.surname")}: {person.surname}
        </p>
        <p>
          {t("grave.birthDate")}: {person.birth_date}
        </p>
        <p>
          {t("grave.deathDate")}: {person.death_date}
        </p>
    </div>
  );
}

function renderPersons(persons: PeopleType[]) {
  if (persons.length === 1) {
    return <Person person={persons[0]}/>
  } else {
    return (
      <>
      <swiper-container navigation={true} pagination={true} className="mySwiper">
        {persons.map(person => <swiper-slide key={person.id}><Person person={person}/></swiper-slide>)}
      </swiper-container>
    </>
    )
  }
}


function Grave({ grave, showGrveyardLink = true }: {grave: GraveType, showGrveyardLink?: boolean}) {
  const { t } = useTranslation();
  return (
    <div className="card">
      <Zoom zoomImg={ {src: `${imgBaseUrl}w_1000/${grave.img}.webp`}}>
        
        <img src={`${imgBaseUrl}w_300/${grave.img}.webp`} alt="" className="card__img" />
      </Zoom>
      
      <div className="card__content">
        {renderPersons(grave.people)}
        {showGrveyardLink && (
          <Link to={`/graveyard/${grave.graveyard}`} className="card__link">
            {" "}
            {t("graveyard")} &#x2192;
          </Link>
        )}
      </div>
    </div>
  );
}

export default Grave;
