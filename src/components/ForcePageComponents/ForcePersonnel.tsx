import { Fragment } from "react";
import { PersonnelType } from "../../data/types";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { Box, Typography } from "@mui/material";

type Props = {
  data?: PersonnelType[];
};

export function ForcePersonnel({ data }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" color="secondary">
        Force personnel
      </Typography>
      {data && Object.keys(data).length > 0 ? (
        <>
          {data.map((personnel) => (
            <Fragment key={personnel.name}>
              <Typography variant="h6">{personnel.name}</Typography>
              {personnel.bio ? (
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(personnel.bio),
                  }}
                />
              ) : null}
            </Fragment>
          ))}
        </>
      ) : (
        <Typography>No force personnel data available.</Typography>
      )}
    </Box>
  );
}
