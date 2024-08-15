import { FC, useCallback, memo } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Line } from "@app/models";
import { Box } from "@mui/material";
import MapEventHandler from "./MapEventHandler";

/**
 * Map - A component that renders a map with lines (using react-leaflet lib) and allows users to draw and select lines.
 *
 * @param {Line[]} lines - An array of line objects to be displayed on the map.
 * @param {string} [selectedLine] - The ID of the currently selected line.
 * @param {function} onSelectLine - Callback function that gets called when a line is selected.
 * @param {function} onAddLine - Callback function that gets called when a new line is drawn and added.
 * @param {LatLngExpression[]} points - Array of points that form the current line being drawn.
 * @param {function} updatePoints - Function to add a new point to the current line.
 * @param {boolean} isDrawing - Flag to indicate if the drawing mode is active.
 *
 * @example
 *   <Map
 *     lines={lines}
 *     selectedLine="1"
 *     onSelectLine={handleSelectLine}
 *     onAddLine={handleAddLine}
 *     points={points}
 *     updatePoints={handleUpdatePoints}
 *     isDrawing={true}
 *   />
 */
const SELECTED_COLOR = { color: "Fuchsia" };
const LINE_COLOR = { color: "purple" };
const DRAW_LINE_COLOR = { color: "blue" };

interface MapProps {
  lines: Line[];
  selectedLine?: string;
  onSelectLine: (selected: Line) => void;
  onAddLine: (newLine: Line) => void;
  points: LatLngExpression[];
  updatePoints: (newPoint: LatLngTuple) => void;
  isDrawing: boolean;
}

let Map: FC<MapProps> = ({
  lines,
  selectedLine,
  onSelectLine,
  onAddLine,
  points,
  updatePoints,
  isDrawing,
}) => {
  const handleLineSelect = useCallback(
    (line: Line) => {
      if (!isDrawing) {
        onSelectLine(line);
      }
    },
    [onSelectLine, isDrawing],
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
                click: () => handleLineSelect(line),
              }}
            />
          );
        })}
        {isDrawing && (
          <MapEventHandler
            points={points}
            updatePoints={updatePoints}
            lines={lines}
            onAddLine={onAddLine}
          />
        )}
      </MapContainer>
    </Box>
  );
};

Map = memo(Map);

export default Map;
