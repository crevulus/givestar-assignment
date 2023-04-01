import { Box, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CircularProgress />
    </Box>
  );
}
