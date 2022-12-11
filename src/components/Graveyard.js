import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import { supabase } from "../supabaseClient";

import Header from "./Header";
import Grave from "./Grave";
import Map from "./Map";

function Graveyard() {
  const [graves, setGraves] = useState(null);
  const [graveyard, setGraveyard] = useState(null);
  let { graveyardId } = useParams();

  const getGravese = async () => {
    try {
      let { data, error, status } = await supabase
        .from("graves")
        .select("*")
        .eq("graveyard", graveyardId);
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
        console.log(data);
        setGraveyard(data[0]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getGravese();
    getGraveyard();
  }, []);
  return (
    <div className="container">
      <Header />
      <h1>cmentarz: {graveyard?.name}</h1>
      {graveyard ? (
        <Map graveyards={[graveyard]} showPopup={false}></Map>
      ) : null}
      <h3>groby:</h3>
      {graves?.map((grave, index) => (
        <Grave key={index} grave={grave} />
      ))}
    </div>
  );
}

export default Graveyard;
