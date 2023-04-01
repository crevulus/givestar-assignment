import { useQuery } from "@tanstack/react-query";
import { fetchForces } from "../utils/networkCalls";
import { ForceType } from "../data/types";
import { Link } from "react-router-dom";
import { ForceCard } from "../components/ForceCard";
import { useFetchingUi } from "../hooks/useFetchingUi";
import { Input } from "../components/Input";
import { useContext, useMemo } from "react";
import { AppContext } from "../data/AppContext";
import useDebounce from "../hooks/useDebounce";
import { useFilterData } from "../hooks/useFilterData";

type Props = {};

export default function Home({}: Props) {
  const { searchValue, setSearchValue } = useContext(AppContext);
  const debouncedSearchValue = useDebounce(searchValue, 200);

  const { data, error, isLoading } = useQuery<ForceType[]>({
    queryKey: ["forces"],
    queryFn: fetchForces,
  });

  useFetchingUi({ isLoading, error });

  const filteredForces = useFilterData({
    data,
    field: "name",
    value: debouncedSearchValue,
  });

  const forcesData = filteredForces ?? data;

  return (
    <>
      <Input handleChange={setSearchValue} />
      {!!forcesData && forcesData.length > 0
        ? forcesData.map((force: ForceType) => (
            <ForceCard force={force} key={force.id} />
          ))
        : null}
    </>
  );
}
