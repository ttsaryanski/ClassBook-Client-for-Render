import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function Map() {
    const position = [42.869703, 25.317];
    const marker = [42.870665, 25.3167];

    return (
        <MapContainer
            center={position}
            zoom={17}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={marker}>
                <Popup>
                    НАГ Васил Априлов
                    <br /> Габрово, България
                </Popup>
            </Marker>
        </MapContainer>
    );
}
