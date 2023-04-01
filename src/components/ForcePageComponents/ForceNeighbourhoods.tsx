import { Fragment, useContext } from "react";
import { NeighbourhoodType, PersonnelType } from "../../data/types";
import { sanitizeHtml } from "../../utils/normaliseHtml";
import { Typography } from "@mui/material";
import { Input } from "../Input";
import { AppContext } from "../../data/AppContext";

type Props = {
  data?: NeighbourhoodType[];
};

export default function ForceNeighbourhoods({ data }: Props) {
  const { setFilterNeighbourhoodsValue } = useContext(AppContext);

  return (
    <>
      {data && Object.keys(data).length > 0 ? (
        <>
          <Input handleChange={setFilterNeighbourhoodsValue} />
          {data.map((neighbourhood) => (
            <Fragment key={neighbourhood.id}>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(neighbourhood.name),
                }}
              />
            </Fragment>
          ))}
        </>
      ) : null}
    </>
  );
}
