import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchForce } from "../utils/networkCalls";
import { useFetchingUi } from "../hooks/useFetchingUi";

type Props = {};

export default function Force({}: Props) {
  const { forceId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["force", forceId],
    queryFn: () => fetchForce(forceId),
  });

  useFetchingUi({ isLoading, error });

  return <>{Object.keys(data).length > 0 ? <p>{data.name}</p> : null}</>;
}
