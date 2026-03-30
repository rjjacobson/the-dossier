'use client';

import { useEffect, useState, useRef } from 'react';
import type { OfficialWithGrade } from '@/lib/types';

// Grade to color mapping: blue = pro-Israel, red = against, gray = unknown
function gradeToColor(grade: string | null): string {
  switch (grade) {
    case 'A': return '#1d4ed8'; // strong blue
    case 'B': return '#3b82f6'; // medium blue
    case 'C': return '#9ca3af'; // gray (mixed)
    case 'D': return '#f87171'; // light red
    case 'F': return '#dc2626'; // strong red
    default:  return '#e5e7eb'; // light gray (no data)
  }
}

function gradeToOpacity(grade: string | null): number {
  if (!grade || grade === 'N/R') return 0.3;
  return 0.6;
}

interface DistrictGrade {
  district: number;
  officialName: string;
  grade: string;
  slug: string;
}

export function NYCMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [districtGrades, setDistrictGrades] = useState<DistrictGrade[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const leafletMap = useRef<unknown>(null);

  // Fetch city council officials and their grades
  useEffect(() => {
    async function fetchGrades() {
      try {
        const res = await fetch('/api/map-data');
        if (res.ok) {
          const data = await res.json();
          setDistrictGrades(data);
        }
      } catch {
        // Silently fail
      }
    }
    fetchGrades();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapLoaded) return;

    async function initMap() {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [40.7128, -73.95],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: true,
      });

      // Minimal basemap - just water/land boundaries
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 14,
        minZoom: 10,
      }).addTo(map);

      // Load GeoJSON districts
      const res = await fetch('/nyc-districts.geojson');
      const geojson = await res.json();

      L.geoJSON(geojson, {
        style: (feature) => {
          const districtNum = feature?.properties?.d;
          const match = districtGrades.find((dg) => dg.district === districtNum);
          const grade = match?.grade || null;

          return {
            fillColor: gradeToColor(grade),
            fillOpacity: gradeToOpacity(grade),
            color: '#ffffff',
            weight: 1.5,
            opacity: 0.8,
          };
        },
        onEachFeature: (feature, layer) => {
          const districtNum = feature?.properties?.d;
          const match = districtGrades.find((dg) => dg.district === districtNum);

          if (match) {
            layer.bindTooltip(
              `<strong>District ${districtNum}</strong><br/>${match.officialName}<br/>Grade: ${match.grade}`,
              { sticky: true, className: 'district-tooltip' }
            );

            layer.on('click', () => {
              window.location.href = `/officials/${match.slug}`;
            });

            layer.on('mouseover', () => {
              (layer as L.Path).setStyle({ fillOpacity: 0.8, weight: 2.5 });
            });

            layer.on('mouseout', () => {
              (layer as L.Path).setStyle({
                fillOpacity: gradeToOpacity(match.grade),
                weight: 1.5,
              });
            });
          } else {
            layer.bindTooltip(
              `<strong>District ${districtNum}</strong><br/>No data yet`,
              { sticky: true, className: 'district-tooltip' }
            );
          }
        },
      }).addTo(map);

      leafletMap.current = map;
      setMapLoaded(true);
    }

    initMap();
  }, [districtGrades, mapLoaded]);

  return (
    <div className="my-8">
      <div
        ref={mapRef}
        className="w-full h-[350px] sm:h-[400px] rounded-lg border border-gray-200 overflow-hidden"
        style={{ background: '#f0f0f0' }}
      />
      <div className="flex items-center justify-center gap-6 mt-3 text-[11px] text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#1d4ed8' }} />
          Pro-Israel (A-B)
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#9ca3af' }} />
          Mixed (C)
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#dc2626' }} />
          Against (D-F)
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm border border-gray-300" style={{ background: '#e5e7eb' }} />
          No data
        </div>
      </div>
      <style jsx global>{`
        .district-tooltip {
          font-family: inherit;
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
