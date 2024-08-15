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
import { Line } from "@app/models";
import styles from "./RoutesList.module.css";

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
    <List className={styles.list} >
      <ListItem>
        <Typography
          variant="h6"
          component="div"
          className={styles.title}
          sx={{fontWeight: 'bold'}}
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
        <Box className={styles.listHeight} >
          {items.map((item) => (
            <Box key={item.id}  className={styles.listItem}>
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
