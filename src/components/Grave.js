import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Zoom from "react-medium-image-zoom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper";


const imgBaseUrl =
  "https://res.cloudinary.com/dqbunghp7/image/upload/";


  function Person({ person }) {
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

function renderPersons(persons) {
  if (persons.lenght === 1) {
    return <Person person={persons[0]}/>
  } else {
    return (
      <>
      <Swiper pagination={true} navigation={true} modules={[Navigation, Pagination]} className="mySwiper">
        {persons.map(person => <SwiperSlide key={person.id}><Person person={person}/></SwiperSlide>)}
      </Swiper>
    </>
    )
  }
}


function Grave({ grave, showGrveyardLink = true }) {
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
