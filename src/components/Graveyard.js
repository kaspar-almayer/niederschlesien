import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { supabase } from "../supabaseClient";

import Header from "./Header";
import Grave from "./Grave";
const Map = React.lazy(() => import('./Map'));

function Graveyard() {
  const [graves, setGraves] = useState(null);
  const [graveyard, setGraveyard] = useState(null);
  let { graveyardId } = useParams();
  const { t } = useTranslation();
  
  useEffect(() => {
  const getGravese = async () => {
    try {
      let { data, error, status } = await supabase.from("graves").select('*, people (*)').eq("graveyard", graveyardId);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        //console.log(data);
        setGraves(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const getGraveyard = async () => {
    try {
      let { data, error, status } = await supabase
        .from("graveyards")
        .select("*")
        .eq("id", graveyardId);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        //console.log(data);
        setGraveyard(data[0]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

    getGravese();
    getGraveyard();
  }, [graveyardId]);
  return (
    <div className="container">
      <Header />
      <h1>
        {t("graveyard")}: {graveyard?.name}
      </h1>
      <div className="row">
        <div className="col">
          {graves?.map((grave, index) => (
            <Grave key={index} grave={grave} showGrveyardLink={false} />
          ))}
        </div>
        <div className="col">
          <Suspense fallback={<div>Loading...</div>}> 
            {graveyard ? (
              <Map graveyards={[graveyard]} showPopup={false}></Map>
            ) : null}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Graveyard;
