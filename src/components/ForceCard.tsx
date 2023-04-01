import React, { useMemo } from "react";
import { ForceType } from "../data/types";
import { Paths } from "../data/enum";
import { generatePath } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  force: ForceType;
};

export function ForceCard({ force }: Props) {
  const path = useMemo(() => {
    return generatePath(Paths.FORCE_DYNAMIC, { forceId: force.id });
  }, [force.id]);

  return (
    <Card sx={{ maxWidth: "300px" }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {force.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" color="primary" component={RouterLink} to={path}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
