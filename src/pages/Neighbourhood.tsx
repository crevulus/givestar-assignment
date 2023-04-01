import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchNeighbourhood } from "../utils/networkCalls";
import { NeighbourhoodDetailsType } from "../data/types";
import { Container, Link, Typography } from "@mui/material";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import { Link as RouterLink } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

export function Neighbourhood() {
  const { forceId, neighbourhoodId } = useParams();

  const { data, isLoading, error } = useQuery<NeighbourhoodDetailsType>({
    queryKey: ["neighbourhood", forceId, neighbourhoodId],
    queryFn: () => fetchNeighbourhood(forceId, neighbourhoodId),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!data) return null;

  return (
    <Container>
      <Typography variant="h2" color="secondary">
        {data.name}
      </Typography>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(data.description),
        }}
      />
      {data.url_force ? (
        <Link variant="button" component={RouterLink} to={data.url_force}>
          Visit our webpage
        </Link>
      ) : null}
    </Container>
  );
}
