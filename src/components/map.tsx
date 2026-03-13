"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { useEffect, useState } from "react";

// FREE FULL INDIA STATE BOUNDARIES
const INDIA_GEOJSON =
  "https://raw.githubusercontent.com/geohacker/india/master/state/india_states.geojson";

// --- ALL CENTERS OF EXCELLENCE MARKERS (with lat/lng + popup HTML) ---
const markers = [
  {
    title: "Centre of Excellence for Climate Change and vector borne diseases",
    desc: `
      👤 <strong>Name:</strong> Dr. RC Dhiman, Scientist ‘G’<br/>
      🏢 <strong>Organization:</strong> ICMR-NIMR, New Delhi<br/>
      ✉️ <strong>Email:</strong> r.c.dhiman@gmail.com<br/>
      📞 <strong>Contact:</strong> 9871535858
    `,
    lat: 28.6139,
    lng: 77.209,
  },
  {
    title: "DST-Centre of Excellence in Climate Studies",
    desc: `
      👤 <strong>Name:</strong> Dr. Subhankar Karmakar<br/>
      🏢 <strong>Organization:</strong> IIT Bombay<br/>
      ✉️ <strong>Email:</strong> skarmakar@iitb.ac.in<br/>
      📞 <strong>Contact:</strong> 9930035878
    `,
    lat: 19.1334,
    lng: 72.9133,
  },
  {
    title: "DST-ICRISAT CoE on Climate Change Research for Plant Protection",
    desc: `
      👤 <strong>Name:</strong> Dr. Mamta Sharma<br/>
      🏢 <strong>Organization:</strong> ICRISAT, Telangana<br/>
      ✉️ <strong>Email:</strong> mamta.sharma@cgiar.org<br/>
      📞 <strong>Contact:</strong> 9849925225
    `,
    lat: 17.4910,
    lng: 78.2728,
  },
  {
    title: "Centre for Excellence in Climate Change",
    desc: `
      👤 <strong>Name:</strong> Prof. Shakil Ahmad Romshoo<br/>
      🏢 <strong>Organization:</strong> University of Kashmir<br/>
      ✉️ <strong>Email:</strong> shakilrom@kashmiruniversity.ac.in<br/>
      📞 <strong>Contact:</strong> 9419010924
    `,
    lat: 34.0837,
    lng: 74.7973,
  },
  {
    title:
      "Centre of excellence on Water resources, Cryosphere and Climate Change",
    desc: `
      👤 <strong>Name:</strong> Dr. Anil Kumar Misra<br/>
      🏢 <strong>Organization:</strong> Sikkim University<br/>
      ✉️ <strong>Email:</strong> akmisra@cus.ac.in<br/>
      📞 <strong>Contact:</strong> 9873122054
    `,
    lat: 27.3333,
    lng: 88.6167,
  },
  {
    title:
      "CoE on Impact Assessment of Thermal Power Plants on Microclimate",
    desc: `
      👤 <strong>Name:</strong> Dr. RJ Krupadam<br/>
      🏢 <strong>Organization:</strong> NEERI, Nagpur<br/>
      ✉️ <strong>Email:</strong> rj_krupadam@neeri.res.in<br/>
      📞 <strong>Contact:</strong> 7972397063
    `,
    lat: 21.1458,
    lng: 79.0882,
  },
  {
    title: "Mahamana CoE in Climate Change Research",
    desc: `
      👤 <strong>Name:</strong> Prof R K. Mall<br/>
      🏢 <strong>Organization:</strong> BHU, Varanasi<br/>
      ✉️ <strong>Email:</strong> rkmall@bhu.ac<br/>
      📞 <strong>Contact:</strong> 8765447799
    `,
    lat: 25.3176,
    lng: 82.9739,
  },
  {
    title: "CoE in Climate Modeling",
    desc: `
      👤 <strong>Name:</strong> Prof Saroj Kanta Mishra<br/>
      🏢 <strong>Organization:</strong> IIT Delhi<br/>
      ✉️ <strong>Email:</strong> skm@iitd.ac.in<br/>
      📞 <strong>Contact:</strong> 9599669334
    `,
    lat: 28.5450,
    lng: 77.1929,
  },
  {
    title:
      "Centre of Excellence on Climate & Disaster Resilient Agriculture",
    desc: `
      👤 <strong>Name:</strong> Dr. P. Balasubramanian<br/>
      🏢 <strong>Organization:</strong> TNAU, Tamil Nadu<br/>
      ✉️ <strong>Email:</strong> balasubramaniamp@tnau.ac.in<br/>
      📞 <strong>Contact:</strong> 9442154848
    `,
    lat: 11.0220,
    lng: 76.9679,
  },
  {
    title: "Centre of Excellence in Disaster Management",
    desc: `
      👤 <strong>Name:</strong> Prof Amarjeet Kaur<br/>
      🏢 <strong>Organization:</strong> GGSIPU<br/>
      ✉️ <strong>Email:</strong> director.cdms@ipu.ac.in
    `,
    lat: 28.6329,
    lng: 77.2177,
  },
  {
    title: "Civil Engineering Department, DTU",
    desc: `
      👤 <strong>Name:</strong> Dr. K. C. Tiwari<br/>
      🏢 <strong>Organization:</strong> DTU<br/>
      ✉️ <strong>Email:</strong> hod.ce@dtu.ac.in
    `,
    lat: 28.7280,
    lng: 77.1114,
  },
  {
    title: "School of Env Engineering, IIT Mandi (SCENE)",
    desc: `
      👤 <strong>Name:</strong> Dr. Rajneesh Sharma<br/>
      🏢 <strong>Organization:</strong> IIT Mandi<br/>
      ✉️ <strong>Email:</strong> office_scene@iitmandi.ac.in
    `,
    lat: 31.7050,
    lng: 76.8500,
  },
  {
    title: "Dept. of Civil Engineering, NIT Calicut",
    desc: `
      👤 <strong>Name:</strong> Dr. T. M. Madhavan Pillai<br/>
      🏢 <strong>Organization:</strong> NIT Calicut<br/>
      ✉️ <strong>Email:</strong> mpillai@nitc.ac.in
    `,
    lat: 11.2590,
    lng: 75.7804,
  },
  {
    title: "School of Earth Sciences, Central University of South Bihar",
    desc: `
      👤 <strong>Name:</strong> Prof Pradhan Parth Sarthi<br/>
      🏢 <strong>Organization:</strong> CUSB<br/>
      ✉️ <strong>Email:</strong> dean.sebes@cusb.ac.in
    `,
    lat: 24.7954,
    lng: 85.0055,
  },
  {
    title:
      "Centre for Natural Resource Mgmt, NIRDPR, Hyderabad",
    desc: `
      👤 <strong>Name:</strong> Dr. Ravindra S. Gavali<br/>
      🏢 <strong>Organization:</strong> NIRDPR<br/>
      ✉️ <strong>Email:</strong> ravindrasg.nird@gov.in
    `,
    lat: 17.3871,
    lng: 78.4917,
  },
  {
    title: "Centre for Regional Development, JNU",
    desc: `
      👤 <strong>Name:</strong> Prof Kaushal Kumar Sharma<br/>
      🏢 <strong>Organization:</strong> JNU<br/>
      ✉️ <strong>Email:</strong> kaushalkumar@mail.jnu.ac.in
    `,
    lat: 28.5494,
    lng: 77.1627,
  },
  {
    title: "IIT Guwahati",
    desc: `
      👤 <strong>Name:</strong> IIT Guwahati Faculty<br/>
      🏢 <strong>Organization:</strong> IIT Guwahati
    `,
    lat: 26.1803,
    lng: 91.6956,
  },
  {
    title:
      "CoE on Climate Change and Disaster Resilience (CoE-CCDR), Berhampur University",
    desc: `
      👤 <strong>Name:</strong> Prof Anjan Kumar Prusty<br/>
      🏢 <strong>Organization:</strong> Berhampur University<br/>
      ✉️ <strong>Email:</strong> anjaneia@gmail.com
    `,
    lat: 19.3146,
    lng: 84.7941,
  },
  {
    title: "TISS Mumbai",
    desc: `
      👤 <strong>Name:</strong> TISS Representative<br/>
      🏢 <strong>Organization:</strong> Tata Institute of Social Sciences
    `,
    lat: 19.0176,
    lng: 72.8562,
  },
  {
    title: "Disaster Management, Rashtriya Raksha University (Lucknow)",
    desc: `
      👤 <strong>Name:</strong> Akanksha Pandey<br/>
      🏢 <strong>Organization:</strong> RRU / Lucknow Campus<br/>
      ✉️ <strong>Email:</strong> akanksha.pandey@rru.ac.in
    `,
    lat: 26.8467,
    lng: 80.9462,
  },
];

export default function CoEIndiaMap() {
  const [indiaGeo, setIndiaGeo] = useState<GeoJsonObject | null>(null);

  useEffect(() => {
    fetch(INDIA_GEOJSON)
      .then((res) => res.json())
      .then((data) => setIndiaGeo(data));
  }, []);

  return (
    <div style={{ width: "100%", height: "720px" }}>
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ width: "100%", height: "100%", borderRadius: "12px" }}
      >
        {/* INDIA BOUNDARIES */}
        {indiaGeo && (
          <GeoJSON
            data={indiaGeo}
            pathOptions={{
              color: "#444",
              weight: 1,
              fillColor: "#e9e7df",
              fillOpacity: 0.4,
            }}
          />
        )}

        {/* TILE LAYER */}
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* MARKERS */}
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>
              <strong>{m.title}</strong>
              <br />
              <span dangerouslySetInnerHTML={{ __html: m.desc }} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
