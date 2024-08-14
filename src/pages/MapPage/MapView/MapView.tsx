import { FC, useCallback, useState } from "react";
import { GridLayout, RoutesList, Map } from "../../../components";
import { Line } from "../../../models";

const MapView: FC = () => {
  const [selectedLineId, setSelectedLineId] = useState<string | undefined>(
    undefined,
  );
  const [lines, setLines] = useState<Line[]>([]);

  const handleAddLine = useCallback((newLine: Line) => {
    setLines((prevLines) => [...prevLines, newLine]);
  }, []);

  const handleSelectLine = useCallback((selected: Line) => {
    setSelectedLineId(selected.id);
  }, []);

  const handleDeleteLine = useCallback((deleted: Line) => {
    setLines((prevLines) => prevLines.filter((line) => line.id !== deleted.id));
    setSelectedLineId(undefined);
  }, []);

  return (
    <GridLayout mainViewColumns={4}>
      <RoutesList
        items={lines}
        selectedRoute={selectedLineId}
        onSelectRoute={handleSelectLine}
        onDeleteRoute={handleDeleteLine}
      />
      <Map
        lines={lines}
        selectedLine={selectedLineId}
        onSelectLine={handleSelectLine}
        onAddLine={handleAddLine}
        onDeleteLine={handleDeleteLine}
      />
    </GridLayout>
  );
};

export default MapView;
