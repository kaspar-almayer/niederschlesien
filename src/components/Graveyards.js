import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";

import { supabase } from "../supabaseClient";

import Header from "./Header";
import Map from "./Map";

// marker hack
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [13, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
// end marker hack

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
