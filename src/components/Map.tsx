import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import {GraveyardType} from '../types'

// marker hack
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [13, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
// end marker hack

function Map({ graveyards, showPopup }: {graveyards: GraveyardType[] | null, showPopup: boolean}) {
  return (
    <MapContainer
      center={[50.864, 17.061]}
      zoom={11}
      scrollWheelZoom={true}
      className="graveyards-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {graveyards?.map((graveyard, index) => (
        <Marker key={index} position={[graveyard.lat, graveyard.lng]}>
          {showPopup ? (
            <Popup>
              <Link to={`/graveyard/${graveyard.id}`}>
                {graveyard.name} &#x2192;
              </Link>
            </Popup>
          ) : null}
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
