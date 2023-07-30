import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { supabase } from "../supabaseClient";

import Header from "./Header.tsx";
import Grave from "./Grave";
import { GraveType, GraveyardType} from "../types.ts";
import {typedErrorLog} from '../helpers.ts'

const Map = React.lazy(() => import('./Map'));

function Graveyard() {
  const [graves, setGraves] = useState<GraveType[] | null >(null);
  const [graveyard, setGraveyard] = useState<GraveyardType | null>(null);
  const { graveyardId } = useParams();
  const { t } = useTranslation();
  
  useEffect(() => {
  const getGravese = async () => {
    try {
      const { data, error, status } = await supabase.from("graves").select('*, people (*)').eq("graveyard", graveyardId);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setGraves(data);
      }
    } catch (error) {
      typedErrorLog(error);
    }
  };
  const getGraveyard = async () => {
    try {
      const { data, error, status } = await supabase
        .from("graveyards")
        .select("*")
        .eq("id", graveyardId);
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setGraveyard(data[0]);
      }
    } catch (error) {
      typedErrorLog(error);
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
