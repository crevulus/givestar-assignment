import { ChangeEvent, useContext } from "react";
import { TextField } from "@mui/material";
import { AppContext } from "../data/AppContext";

type Props = {
  handleChange: (value: string) => void;
};

export function Input({ handleChange }: Props) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return (
    <TextField
      id="force-input"
      label="Search for a police force"
      variant="outlined"
      onChange={handleInput}
    />
  );
}
