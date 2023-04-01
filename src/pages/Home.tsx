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

type Props = {};

export default function Home({}: Props) {
  const { searchValue } = useContext(AppContext);
  const debouncedSearchValue = useDebounce(searchValue, 200);

  const { data, error, isLoading } = useQuery<ForceType[]>({
    queryKey: ["forces"],
    queryFn: fetchForces,
  });

  useFetchingUi({ isLoading, error });

  const filteredForces = useMemo(() => {
    if (!data) return;

    if (!searchValue) return data;

    return data.filter((force) =>
      force.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
  }, [debouncedSearchValue]);

  if (!filteredForces) {
    return null;
  }

  return (
    <>
      <Input />
      {filteredForces.length > 0
        ? filteredForces.map((force: ForceType) => (
            <ForceCard force={force} key={force.id} />
          ))
        : null}
    </>
  );
}
