import { Fragment, useContext, useMemo } from "react";
import { NeighbourhoodType } from "../../data/types";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { Box, Link, List, ListItem, Typography } from "@mui/material";
import { Input } from "../Input";
import { AppContext } from "../../data/AppContext";
import { Link as RouterLink } from "react-router-dom";
import { Paths } from "../../data/enum";
import { generatePath } from "react-router-dom";

type Props = {
  data?: NeighbourhoodType[];
  forceId?: string;
};

type NeighbourhoodLinkProps = {
  data?: NeighbourhoodType;
  forceId?: string;
};

const NeighbourhoodLink = ({ data, forceId }: NeighbourhoodLinkProps) => {
  if (!forceId || !data) return null;

  const path = useMemo(() => {
    return generatePath(Paths.NEIGHBOURHOOD_DYNAMIC, {
      forceId: forceId,
      neighbourhoodId: data.id,
    });
  }, [forceId, data.id]);

  return (
    <>
      <Link
        variant="button"
        component={RouterLink}
        to={path}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(data.name),
        }}
      />
    </>
  );
};

export function ForceNeighbourhoods({ data, forceId }: Props) {
  const { setFilterNeighbourhoodsValue } = useContext(AppContext);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" color="secondary">
        Force neighbourhoods
      </Typography>
      {data && Object.keys(data).length > 0 ? (
        <>
          <Input handleChange={setFilterNeighbourhoodsValue} />
          <List>
            {data.map((neighbourhood) => (
              <ListItem key={neighbourhood.id}>
                <NeighbourhoodLink data={neighbourhood} forceId={forceId} />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography>No force neighbourhood data available.</Typography>
      )}
    </Box>
  );
}
