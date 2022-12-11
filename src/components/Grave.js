//import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const imgBaseUrl =
  "https://exwqjdjcxzewandmmsei.supabase.co/storage/v1/object/public/graves/";

function Grave({ grave }) {
  return (
    <div className="card">
      <img src={imgBaseUrl + grave.img} alt="" className="card__img" />
      <div className="card__content">
        <p>Imię: {grave.name}</p>
        <p>Nazwisko: {grave.surname}</p>
        <p>Data urodzenia: {grave.birth_date}</p>
        <p>Data śmierci: {grave.death_date}</p>
        <Link to={`/graveyard/${grave.graveyard}`}> Cmentarz &#x2192;</Link>
      </div>
    </div>
  );
}

export default Grave;
