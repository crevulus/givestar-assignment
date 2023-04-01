import { useQuery } from "@tanstack/react-query";
import { fetchForces } from "../utils/networkCalls";
import Loading from "../components/Loading";
import { ForceType } from "../data/types";
import { Link } from "react-router-dom";
import ForceCard from "../components/ForceCard";
import Error from "../components/Error";
import { useFetchingUi } from "../hooks/useFetchingUi";

type Props = {};

export default function Home({}: Props) {
  const { data, error, isLoading } = useQuery<ForceType[]>({
    queryKey: ["forces"],
    queryFn: fetchForces,
  });

  useFetchingUi({ isLoading, error });

  if (!data) {
    return null;
  }

  return (
    <>
      {data.length > 0
        ? data.map((force: ForceType) => (
            <ForceCard force={force} key={force.id} />
          ))
        : null}
    </>
  );
}
