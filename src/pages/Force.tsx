import { useQuery } from "@tanstack/react-query";
import React, { Fragment, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchForce,
  fetchNeighbourhoods,
  fetchPersonnel,
} from "../utils/networkCalls";
import { useFetchingUi } from "../hooks/useFetchingUi";
import {
  ForceDetailsType,
  NeighbourhoodType,
  PersonnelType,
} from "../data/types";
import { Typography } from "@mui/material";
import { sanitizeHtml } from "../utils/normaliseHtml";
import { Input } from "../components/Input";
import { AppContext } from "../data/AppContext";
import { useFilterData } from "../hooks/useFilterData";
import useDebounce from "../hooks/useDebounce";
import ForceDescription from "../components/ForcePageComponents/ForceDescription";
import ForcePersonnel from "../components/ForcePageComponents/ForcePersonnel";
import ForceNeighbourhoods from "../components/ForcePageComponents/ForceNeighbourhoods";

type Props = {};

export default function Force({}: Props) {
  const { forceId } = useParams();
  const { filterNeighbourhoodsValue } = useContext(AppContext);
  const debouncedSearchValue = useDebounce(filterNeighbourhoodsValue, 200);

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

  useFetchingUi({
    isLoading: forceIsLoading || personnelIsLoading || neighbourhoodsIsLoading,
    error: forceError || personnelError || neighbourhoodsError,
  });

  const filteredNeighbourhoods = useFilterData({
    data: rawNeighbourhoodsData,
    field: "name",
    value: debouncedSearchValue,
  });

  const neighbourhoodsData = filteredNeighbourhoods ?? rawNeighbourhoodsData;

  return (
    <>
      <ForceDescription data={forceData} />
      <ForcePersonnel data={personnelData} />
      <ForceNeighbourhoods data={neighbourhoodsData} />
    </>
  );
}
