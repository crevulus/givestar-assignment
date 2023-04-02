import { ChangeEvent } from "react";
import { TextField } from "@mui/material";

type Props = {
  handleChange: (value: string) => void;
};

export function Input({ handleChange }: Props) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return (
    <TextField
      sx={{ mt: 2, mb: 2 }}
      fullWidth
      id="force-input"
      label="Search"
      variant="outlined"
      onChange={handleInput}
    />
  );
}
