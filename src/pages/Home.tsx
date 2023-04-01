import { useQuery } from "@tanstack/react-query";
import { fetchForces } from "../utils/networkCalls";
import { ForceType } from "../data/types";
import { ForceCard } from "../components/ForceCard";
import { Input } from "../components/Input";
import { useContext } from "react";
import { AppContext } from "../data/AppContext";
import { useDebounce } from "../hooks/useDebounce";
import { useFilterData } from "../hooks/useFilterData";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Container, Grid } from "@mui/material";

export function Home() {
  const { searchValue, setSearchValue } = useContext(AppContext);
  const debouncedSearchValue = useDebounce(searchValue, 200);

  const { data, error, isLoading } = useQuery<ForceType[]>({
    queryKey: ["forces"],
    queryFn: fetchForces,
  });

  const filteredForces = useFilterData({
    data,
    field: "name",
    value: debouncedSearchValue,
  });

  const forcesData = filteredForces ?? data;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Input handleChange={setSearchValue} />
      <Grid container spacing={2}>
        {!!forcesData && forcesData.length > 0
          ? forcesData.map((force: ForceType) => (
              <Grid item xs={6} sm={4} key={force.id}>
                <ForceCard force={force} key={force.id} />
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  );
}
