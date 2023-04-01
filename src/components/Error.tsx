import { Box, Typography } from "@mui/material";

export function Error() {
  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Typography>Uh oh! Something went wrong.</Typography>
    </Box>
  );
}
