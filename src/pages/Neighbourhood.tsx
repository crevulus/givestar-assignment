import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchNeighbourhood } from "../utils/networkCalls";
import { NeighbourhoodDetailsType } from "../data/types";
import { Link, List, ListItem, Typography } from "@mui/material";
import { sanitizeHtml } from "../utils/sanitizeHtml";

type Props = {};

export function Neighbourhood({}: Props) {
  const { forceId, neighbourhoodId } = useParams();

  const { data, isLoading, error } = useQuery<NeighbourhoodDetailsType>({
    queryKey: ["neighbourhood", forceId, neighbourhoodId],
    queryFn: () => fetchNeighbourhood(forceId, neighbourhoodId),
  });

  if (!data) return null;

  return (
    <>
      <Typography variant="h1">{data.name}</Typography>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(data.description),
        }}
      />
      {!!data.url_force ? (
        <Link component="button" variant="body2" href={data.url_force}>
          Visit our webpage
        </Link>
      ) : null}
      <Typography>
        Put a map here!
        <List>
          <ListItem>1. Hook up to google maps API</ListItem>
          <ListItem>2. Use data.centre for lat/long values </ListItem>
        </List>
      </Typography>
    </>
  );
}
