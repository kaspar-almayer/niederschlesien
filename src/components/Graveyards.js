import React, { useState, useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";

import { supabase } from "../supabaseClient";

import Header from "./Header";
const Map = React.lazy(() => import('./Map'));

function Graveyards() {
  const { t } = useTranslation();
  const [graveyards, setGraveyards] = useState(null);
  useEffect(() => {
    const getProfile = async () => {
      try {
        let { data, error, status } = await supabase
          .from("graveyards")
          .select("*");
        if (error && status !== 406) {
          throw error;
        }
        if (data) {
          //console.log(data);
          setGraveyards(data);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    getProfile();
  }, []);
  return (
    <div className="container">
      <Header />
      <h1>{t("graveyardsMap")}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Map graveyards={graveyards} showPopup></Map>
      </Suspense>
    </div>
  );
}

export default Graveyards;
