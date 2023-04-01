import React from "react";
import { ForceDetailsType } from "../../data/types";
import { sanitizeHtml } from "../../utils/normaliseHtml";
import { Typography } from "@mui/material";

type Props = {
  data?: ForceDetailsType;
};

export default function ForceDescription({ data }: Props) {
  return (
    <>
      {data && Object.keys(data).length > 0 ? (
        <>
          <Typography variant="h1">{data.name}</Typography>
          {data.description ? (
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(data.description),
              }}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
}
