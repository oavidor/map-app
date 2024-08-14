import { FC, memo, useCallback } from "react";
import {
  Divider,
  List,
  ListItemText,
  IconButton,
  Box,
  ListItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";
import { Line } from "../../../models";

interface RoutesListProps {
  readonly items: Line[];
  readonly selectedRoute?: string;
  readonly onSelectRoute: (selected: Line) => void;
  readonly onDeleteRoute: (selected: Line) => void;
}

let RoutesList: FC<RoutesListProps> = ({
  items,
  selectedRoute,
  onSelectRoute,
  onDeleteRoute,
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
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", textAlign: "left", width: "100%" }}
        >
          Items List
        </Typography>
      </ListItem>
      <Divider />
      {items.length === 0 ? (
        <ListItem>
          <p>No items to display</p>
        </ListItem>
      ) : (
        <Box sx={{ height: "60vh" }}>
          {items.map((item) => (
            <Box key={item.id} sx={{ display: "flex", alignItems: "center" }}>
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
                >
                  <DeleteIcon color="error" />
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
