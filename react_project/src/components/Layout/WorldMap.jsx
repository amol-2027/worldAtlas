import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix default marker icon issue in leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const WorldMap = ({ countries, onCountrySelect }) => {
  // Get lat/lng for each country (use latlng if available, else skip)
  const countryMarkers = countries
    .filter((c) => c.latlng && c.latlng.length === 2)
    .map((c) => ({
      name: c.name.common,
      lat: c.latlng[0],
      lng: c.latlng[1],
      flag: c.flags && c.flags.svg,
    }));

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        margin: "2rem 0",
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
      }}
    >
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countryMarkers.map((c) => (
          <Marker
            key={c.name}
            position={[c.lat, c.lng]}
            eventHandlers={{
              click: () => onCountrySelect && onCountrySelect(c.name),
            }}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                {c.flag && (
                  <img
                    src={c.flag}
                    alt={c.name}
                    style={{
                      width: "32px",
                      height: "20px",
                      marginBottom: "0.5rem",
                    }}
                  />
                )}
                <div>{c.name}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
