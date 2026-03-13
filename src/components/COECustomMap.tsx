"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import type { FeatureCollection, Feature } from "geojson";
import L from "leaflet";

type CoEFeature = Feature & {
  properties: {
    name?: string;
    description?: string;
  };
};

function extractImage(description: string | undefined) {
  if (!description) return null;

  const match = description.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

function FitBoundsToFeatures({ data }: { data: FeatureCollection | null }) {
  const map = useMap();
  useEffect(() => {
    if (!data) return;
    const coords: [number, number][] = [];
    (data.features || []).forEach((f: any) => {
      if (f.geometry && f.geometry.coordinates) {
        coords.push([f.geometry.coordinates[1], f.geometry.coordinates[0]]);
      }
    });
    if (coords.length) {
      map.fitBounds(coords as any, { padding: [60, 60], maxZoom: 7 });
    }
  }, [map, data]);
  return null;
}

export default function CoECustomMap() {
  const [geo, setGeo] = useState<FeatureCollection | null>(null);
  const [selected, setSelected] = useState<CoEFeature | null>(null);

  useEffect(() => {
    fetch("/coe.geojson")
      .then((r) => r.json())
      .then((j) => setGeo(j))
      .catch((e) => console.error("Failed to load geojson", e));
  }, []);

  const imageUrl = extractImage(selected?.properties?.description);

  return (
    <div style={{ display: "flex", gap: 12, height: "90vh", padding: 12 }}>
      {/* LEFT SIDEBAR */}
      <aside
        style={{
          width: 360,
          minWidth: 260,
          maxWidth: 420,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        {selected ? (
          <div>
            {/* Header Image */}
            {/* {imageUrl ? (
              <div
                style={{
                  height: 180,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${imageUrl})`,
                }}
              />
            ) : (
              <div style={{ height: 140, background: "#c0392b" }} />
            )} */}

            <div style={{ padding: 12 }}>
              <h3 style={{ margin: "0 0 10px 0" }}>
                {selected.properties.name}
              </h3>

              <div
                style={{ fontSize: 14, color: "#333", lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: selected.properties.description || "" }}
              />
              <div style={{ marginTop: 10 }}>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: "#e5e7eb",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <h2 style={{ marginTop: 6 }}>Centers of Excellence</h2>
            <p style={{ color: "#555", marginTop: 6 }}>
              Click any marker on the map to open the details here.
            </p>
            <hr style={{ margin: "12px 0" }} />
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {geo?.features?.map((f, i) => (
                <div
                  key={i}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    cursor: "pointer",
                    marginBottom: 6,
                    background: "#fafafa",
                  }}
                  onClick={() => setSelected(f as CoEFeature)}
                >
                  <strong style={{ fontSize: 13 }}>{f.properties?.name}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* MAP */}
      <div style={{ flex: 1, borderRadius: 8, overflow: "hidden" }}>
        <MapContainer
          center={[22.9734, 78.6569]}
          zoom={5}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Satellite Layer (Google-like) */}
        {/* Satellite Imagery */}
<TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
/>

{/* Labels on top */}
<TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
  attribution="Labels © Esri"
  pane="overlayPane"
/>

          {/* GeoJSON */}
          {geo && (
            <>
              <GeoJSON
                data={geo as any}
                pointToLayer={(feature, latlng) => {
                  return L.marker(latlng);
                }}
                onEachFeature={(feature: any, layer: any) => {
                  layer.on({
                    click: () => setSelected(feature as CoEFeature),
                  });
                }}
              />
              <FitBoundsToFeatures data={geo} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
