import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchForce,
  fetchNeighbourhoods,
  fetchPersonnel,
} from "../utils/networkCalls";
import {
  ForceDetailsType,
  NeighbourhoodType,
  PersonnelType,
} from "../data/types";
import { AppContext } from "../data/AppContext";
import { useFilterData } from "../hooks/useFilterData";
import { useDebounce } from "../hooks/useDebounce";
import { ForceDescription } from "../components/ForcePageComponents/ForceDescription";
import { ForcePersonnel } from "../components/ForcePageComponents/ForcePersonnel";
import { ForceNeighbourhoods } from "../components/ForcePageComponents/ForceNeighbourhoods";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Container, Typography } from "@mui/material";

export function Force() {
  const { forceId } = useParams();
  const { filterNeighbourhoodsValue, setFilterNeighbourhoodsValue } =
    useContext(AppContext);
  const debouncedSearchValue = useDebounce(filterNeighbourhoodsValue, 200);

  // remove search value on nav away/unmount
  useEffect(() => {
    return () => {
      setFilterNeighbourhoodsValue("");
    };
  }, []);

  const {
    data: forceData,
    isLoading: forceIsLoading,
    error: forceError,
  } = useQuery<ForceDetailsType>({
    queryKey: ["force", forceId],
    queryFn: () => fetchForce(forceId),
  });

  const {
    data: personnelData,
    isLoading: personnelIsLoading,
    error: personnelError,
  } = useQuery<PersonnelType[]>({
    queryKey: ["personnel", forceId],
    queryFn: () => fetchPersonnel(forceId),
  });

  const {
    data: rawNeighbourhoodsData,
    isLoading: neighbourhoodsIsLoading,
    error: neighbourhoodsError,
  } = useQuery<NeighbourhoodType[]>({
    queryKey: ["neighbourhoods", forceId],
    queryFn: () => fetchNeighbourhoods(forceId),
  });

  const filteredNeighbourhoods = useFilterData({
    data: rawNeighbourhoodsData,
    field: "name",
    value: debouncedSearchValue,
  });

  const neighbourhoodsData = filteredNeighbourhoods ?? rawNeighbourhoodsData;

  if (forceIsLoading || personnelIsLoading || neighbourhoodsIsLoading) {
    return <Loading />;
  }

  if (forceError || personnelError || neighbourhoodsError) {
    return <Error />;
  }

  return (
    <Container>
      {forceData ? (
        <Typography variant="h2" color="secondary">
          {forceData.name}
        </Typography>
      ) : null}
      <ForceDescription data={forceData} />
      <ForcePersonnel data={personnelData} />
      <ForceNeighbourhoods data={neighbourhoodsData} forceId={forceId} />
    </Container>
  );
}
