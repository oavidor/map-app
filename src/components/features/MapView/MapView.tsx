import { FC, useReducer, useCallback } from "react";
import { GridLayout, RoutesList, Map } from "@app/components";
import { LatLngTuple } from "leaflet";
import { Line } from "@app/models";
import { mapReducer, initialState, MapActionTypes } from "./mapReducer";

/**
 * MapView - A component for displaying a map with a side menu, manages the map and its related functionalities.
 *
 * This component uses a reducer to manage the state of the map, including the lines,
 * points, and whether the user is in drawing mode. It renders the map and the list of
 * routes (lines) and provides functionality for adding, selecting, and deleting lines.
 *
 * @example
 *   <MapView />
 */

const MapView: FC = () => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  const toggleDrawingMode = () => {
    dispatch({ type: MapActionTypes.TOGGLE_DRAWING_MODE });
  };

  const handleUpdatePoints = useCallback((newPoint: LatLngTuple) => {
    dispatch({ type: MapActionTypes.UPDATE_POINTS, payload: newPoint });
  }, []);

  const handleAddLine = useCallback((newLine: Line) => {
    dispatch({ type: MapActionTypes.ADD_LINE, payload: newLine });
  }, []);

  const handleSelectLine = useCallback((selected: Line) => {
    dispatch({ type: MapActionTypes.SELECT_LINE, payload: selected.id });
  }, []);

  const handleDeleteLine = useCallback((deleted: Line) => {
    dispatch({ type: MapActionTypes.DELETE_LINE, payload: deleted.id });
  }, []);

  return (
    <GridLayout mainViewColumns={4}>
      <RoutesList
        items={state.lines}
        selectedRoute={state.selectedLineId}
        onSelectRoute={handleSelectLine}
        onDeleteRoute={handleDeleteLine}
        onStartDrawing={toggleDrawingMode}
        isDrawing={state.isDrawing}
      />
      <Map
        lines={state.lines}
        selectedLine={state.selectedLineId}
        onSelectLine={handleSelectLine}
        onAddLine={handleAddLine}
        points={state.points}
        updatePoints={handleUpdatePoints}
        isDrawing={state.isDrawing}
      />
    </GridLayout>
  );
};

export default MapView;
