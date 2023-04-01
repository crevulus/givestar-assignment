import { ChangeEvent, useContext, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import { ForceType } from "../data/types";
import { AppContext } from "../data/AppContext";

type Props = {};

export function Input({}: Props) {
  const { setSearchValue } = useContext(AppContext);
  // const debouncedValue = useDebounce<string>(value, 100);

  // const data = queryClient.getQueryData<ForceType[]>(["forces"]);

  // const filteredForces = useMemo(() => {
  //   if (!data) return;

  //   return data.filter((force) => force.name.includes(debouncedValue));
  // }, [debouncedValue]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <TextField
      id="force-input"
      label="Serch for a police force"
      variant="outlined"
      onChange={handleInput}
    />
  );
}
