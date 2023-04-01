import { useQuery } from "@tanstack/react-query";
import React from "react";
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

type Props = {};

export default function Force({}: Props) {
  const { forceId } = useParams();

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
    data: neighbourhoodsData,
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

  return (
    <>
      {forceData && Object.keys(forceData).length > 0 ? (
        <>
          <Typography variant="h1">{forceData.name}</Typography>
          {forceData.description ? (
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(forceData.description),
              }}
            />
          ) : null}
        </>
      ) : null}
      {personnelData && Object.keys(personnelData).length > 0 ? (
        <>
          {personnelData.map((personnel) => (
            <>
              <Typography>{personnel.name}</Typography>
              {personnel.bio ? (
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(personnel.bio),
                  }}
                />
              ) : null}
            </>
          ))}
        </>
      ) : null}
      {neighbourhoodsData && Object.keys(neighbourhoodsData).length > 0 ? (
        <>
          {neighbourhoodsData.map((neighbourhood) => (
            <>
              <Typography>{neighbourhood.name}</Typography>
            </>
          ))}
        </>
      ) : null}
    </>
  );
}
