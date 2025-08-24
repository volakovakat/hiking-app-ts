import React from "react";
import { Chip, Stack } from "@mui/material";
import type { Location } from "../../functions/getLocations";

interface NavigationProps {
  locations: Location[];
  onChange?: (selectedIds: string[]) => void;
}

const Navigation: React.FC<NavigationProps> = ({ locations, onChange }) => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const emitChange = (ids: string[]) => {
    setSelectedIds(ids);
    onChange?.(ids);
  };

  const toggle = (id: string) => {
    emitChange(
      selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id]
    );
  };

  const clearAll = () => emitChange([]);

  const isActive = (id: string) => selectedIds.includes(id);
  const hasFilter = selectedIds.length > 0;

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
      sx={{ flexWrap: "wrap", gap: 1, p: 2 }}
      role="navigation"
      aria-label="Filtr podle lokace"
    >
      <Chip
        label="Vše"
        clickable
        color={hasFilter ? "default" : "primary"}
        variant={hasFilter ? "outlined" : "filled"}
        onClick={clearAll}
        sx={{ mb: 1 }}
      />
      {locations.map((loc) => (
        <Chip
          key={loc.id}
          label={loc.name}
          clickable
          onClick={() => toggle(loc.id)}
          color={isActive(loc.id) ? "primary" : "default"}
          variant={isActive(loc.id) ? "filled" : "outlined"}
          sx={{ mb: 1 }}
        />
      ))}
    </Stack>
  );
};

export default Navigation;
