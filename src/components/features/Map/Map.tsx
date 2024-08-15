import { FC, useState, useCallback, memo } from "react";
import { MapContainer, TileLayer, Polyline, useMapEvents } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Line } from "@app/models";
import _ from "lodash";
import { Box } from "@mui/material";

const SELECTED_COLOR = { color: "Fuchsia" };
const LINE_COLOR = { color: "purple" };
const DRAW_LINE_COLOR = { color: "blue" };

interface MapProps {
  lines: Line[];
  selectedLine?: string;
  onSelectLine: (selected: Line) => void;
  onAddLine: (newLine: Line) => void;
  onDeleteLine: (deleted: Line) => void;
}

let Map: FC<MapProps> = ({ lines, selectedLine, onSelectLine, onAddLine }) => {
  const [points, setPoints] = useState<LatLngExpression[]>([]);

  const MapEventHandler = () => {
    useMapEvents({
      click(e) {
        const newPoint: LatLngTuple = [e.latlng.lat, e.latlng.lng];

        // Check if the point already exists
        const pointExists = _.some(points, (point) =>
          _.isEqual(point, newPoint),
        );

        if (!pointExists) {
          setPoints(
            (prevPoints) => [...prevPoints, newPoint] as LatLngExpression[],
          );
        } else {
          console.log("Point already exists:", newPoint);
        }
      },
      dblclick() {
        if (points.length >= 2) {
          const newLine: Line = {
            id: `${lines.length + 1}`,
            name: `Line ${lines.length + 1}`,
            type: "LineString",
            points: points,
          };
          onAddLine(newLine);
          setPoints([]); // Clear points after drawing is finished
        }
      },
    });
    return null;
  };

  const handleLineClick = useCallback(
    (line: Line) => {
      onSelectLine(line);
    },
    [onSelectLine],
  );

  return (
    <Box sx={{ height: "calc(100vh - 64px)" }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        doubleClickZoom={false}
        zoomControl={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.length > 1 && (
          <Polyline positions={points} pathOptions={DRAW_LINE_COLOR} />
        )}{" "}
        {/* Drawing line */}
        {lines.map((line) => {
          const pathOption =
            line.id === selectedLine ? SELECTED_COLOR : LINE_COLOR;
          return (
            <Polyline
              key={line.id}
              positions={line.points}
              pathOptions={pathOption}
              eventHandlers={{
                click: () => handleLineClick(line),
              }}
            />
          );
        })}
        <MapEventHandler />
      </MapContainer>
    </Box>
  );
};

Map = memo(Map);

export default Map;
