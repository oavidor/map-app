import { FC, memo, useCallback } from "react";
import {
  Divider,
  List,
  ListItemText,
  IconButton,
  Box,
  ListItem,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";
import { Line } from "@app/models";
import styles from "./RoutesList.module.css";

/**
 * RoutesList - Displays a list of the objects that are drawn on the map and provides controls to manage them.
 *
 * @param {Line[]} items - An array of line objects to display in the list.
 * @param {string} [selectedRoute] - The ID of the currently selected line.
 * @param {function} onSelectRoute - Callback function that gets called when a line is selected.
 * @param {function} onDeleteRoute - Callback function that gets called when a line is deleted.
 * @param {function} onStartDrawing - Callback function that toggles drawing mode.
 * @param {boolean} isDrawing - A flag indicating whether the drawing mode is active.
 *
 * @example
 *   <RoutesList
 *     items={lines}
 *     selectedRoute="1"
 *     onSelectRoute={handleSelectRoute}
 *     onDeleteRoute={handleDeleteRoute}
 *     onStartDrawing={handleStartDrawing}
 *     isDrawing={false}
 *   />
 */

interface RoutesListProps {
  readonly items: Line[];
  readonly selectedRoute?: string;
  readonly onSelectRoute: (selected: Line) => void;
  readonly onDeleteRoute: (selected: Line) => void;
  readonly onStartDrawing: () => void;
  isDrawing: boolean;
}

let RoutesList: FC<RoutesListProps> = ({
  items,
  selectedRoute,
  onSelectRoute,
  onDeleteRoute,
  onStartDrawing,
  isDrawing,
}) => {
  const handleClick = useCallback(
    (item: Line) => {
      onSelectRoute(item);
    },
    [onSelectRoute],
  );

  const handleOnDelete = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: Line) => {
      event.stopPropagation();
      onDeleteRoute(item);
    },
    [onDeleteRoute],
  );

  return (
    <List className={styles.list}>
      <ListItem
        secondaryAction={
          <Button
            color="primary"
            onClick={onStartDrawing}
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            {isDrawing ? "Cancel Drawing" : "Add Drawing"}
          </Button>
        }
      >
        <Typography
          variant="h6"
          component="div"
          className={styles.title}
          sx={{ fontWeight: "bold" }}
        >
          Routes
        </Typography>
      </ListItem>
      <Divider />
      {items.length === 0 ? (
        <ListItem>
          <p>No items to display</p>
        </ListItem>
      ) : (
        <Box className={styles.listHeight}>
          {items.map((item) => (
            <Box key={item.id} className={styles.listItem}>
              <ListItemButton
                sx={{ flex: 1 }}
                selected={selectedRoute === item.id}
                onClick={() => handleClick(item)}
              >
                <ListItemText primary={item.name} secondary={item.type} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(event) => handleOnDelete(event, item)}
                  disabled={isDrawing}
                >
                  <DeleteIcon color={isDrawing ? "disabled" : "error"} />
                </IconButton>
              </ListItemButton>
            </Box>
          ))}
        </Box>
      )}
    </List>
  );
};

RoutesList = memo(RoutesList);

export default RoutesList;
