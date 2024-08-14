import { LatLngExpression } from "leaflet";

export interface Line {
  id: string;
  name: string;
  points: LatLngExpression[];
  type: string;
}
