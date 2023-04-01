import { useMemo } from "react";

type Props = {
  data: any[] | undefined;
  field: string;
  value: string;
};

export const useFilterData = ({ data, field, value }: Props) => {
  const filteredData = useMemo(() => {
    if (!data || !field) return;
    if (!value) return data;

    return data.filter((item) =>
      item[field].toLowerCase().includes(value.toLowerCase())
    );
  }, [value]);

  return filteredData;
};
