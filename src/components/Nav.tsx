import { Toolbar, AppBar, Typography, Button } from "@mui/material";
import React from "react";

type Props = {};

export default function Nav({}: Props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PoliceStar
        </Typography>
        <Button color="inherit">Learn More</Button>
      </Toolbar>
    </AppBar>
  );
}
