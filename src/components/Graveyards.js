import { useState, useEffect } from "react";

import { supabase } from "../supabaseClient";

import Header from "./Header";
import Map from "./Map";

function Graveyards() {
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
          console.log(data);
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
      <h1>gravesyards map:</h1>
      <Map graveyards={graveyards} showPopup></Map>
    </div>
  );
}

export default Graveyards;
