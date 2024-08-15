import { FC, memo } from "react";
import { useMapEvents } from "react-leaflet";
import { LatLngTuple, LatLngExpression } from "leaflet";
import _ from "lodash";
import { Line } from "@app/models";
import { v4 as uuidv4 } from 'uuid';

/**
 * MapEventHandler - A component that handles map events for drawing lines.
 *
 * @param {LatLngExpression[]} points - Array of points that form the current line being drawn.
 * @param {function} updatePoints - Function to add a new point to the current line.
 * @param {Line[]} lines - Array of existing lines on the map.
 * @param {function} onAddLine - Function to add a new line to the map.
 *
 * @example
 *   <MapEventHandler
 *     points={points}
 *     updatePoints={handleUpdatePoints}
 *     lines={lines}
 *     onAddLine={handleAddLine}
 *   />
 */

interface MapEventHandlerProps {
  points: LatLngExpression[];
  updatePoints: (newPoint: LatLngTuple) => void;
  lines: Line[];
  onAddLine: (newLine: Line) => void;
}

let MapEventHandler: FC<MapEventHandlerProps> = ({
  points,
  updatePoints,
  lines,
  onAddLine,
}) => {
  useMapEvents({
    // click events, draw points on the map, each point is connected by a line
    click(e) {
      const newPoint: LatLngTuple = [e.latlng.lat, e.latlng.lng];
      const pointExists = _.some(points, (point) => _.isEqual(point, newPoint));

      if (!pointExists) {
        updatePoints(newPoint);
      } else {
        console.log("Point already exists:", newPoint);
      }
    },
    // double click event concludes all the points and lines to one route and updates the parent with the new drawing
    dblclick() {
      if (points.length >= 2) {
        const newLine: Line = {
          id: uuidv4(),
          name: `Route ${lines.length + 1}`,
          type: "LineString",
          points: points,
        };
        onAddLine(newLine);
      }
    },
  });

  return null;
};

MapEventHandler  = memo(MapEventHandler)

export default MapEventHandler;
