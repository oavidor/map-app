import { Line } from "@app/models";
import { LatLngExpression, LatLngTuple } from "leaflet";

export enum MapActionTypes {
    TOGGLE_DRAWING_MODE = 'TOGGLE_DRAWING_MODE',
    UPDATE_POINTS = 'UPDATE_POINTS',
    ADD_LINE = 'ADD_LINE',
    SELECT_LINE = 'SELECT_LINE',
    DELETE_LINE = 'DELETE_LINE',
  }

type Action =
  | { type: MapActionTypes.TOGGLE_DRAWING_MODE }
  | { type: MapActionTypes.UPDATE_POINTS; payload: LatLngTuple }
  | { type: MapActionTypes.ADD_LINE; payload: Line }
  | { type: MapActionTypes.SELECT_LINE; payload: string }
  | { type: MapActionTypes.DELETE_LINE; payload: string };


interface State {
  selectedLineId?: string;
  lines: Line[];
  points: LatLngExpression[];
  isDrawing: boolean;
}

export const initialState: State = {
  selectedLineId: undefined,
  lines: [],
  points: [],
  isDrawing: false,
};

export const mapReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case MapActionTypes.TOGGLE_DRAWING_MODE:
        return {
          ...state,
          isDrawing: !state.isDrawing,
          points: [], // Clear points when toggling drawing mode
        };
      case MapActionTypes.UPDATE_POINTS:
        return {
          ...state,
          points: [...state.points, action.payload] as LatLngExpression[],
        };
      case MapActionTypes.ADD_LINE:
        return {
          ...state,
          lines: [...state.lines, action.payload],
          points: [], // Clear points after drawing is finished
          isDrawing: false, // Exit drawing mode
          selectedLineId: undefined,
        };
      case MapActionTypes.SELECT_LINE:
        return state.isDrawing
          ? state
          : {
              ...state,
              selectedLineId: action.payload,
            };
      case MapActionTypes.DELETE_LINE:
        return {
          ...state,
          lines: state.lines.filter((line) => line.id !== action.payload),
          selectedLineId: undefined, // Clear selected after deleting
          points: [], // Clear points after deleting
        };
      default:
        return state;
    }
  };