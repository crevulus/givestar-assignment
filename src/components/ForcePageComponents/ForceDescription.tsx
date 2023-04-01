import { ForceDetailsType } from "../../data/types";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { Box, Typography } from "@mui/material";

type Props = {
  data?: ForceDetailsType;
};

export function ForceDescription({ data }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      {data && Object.keys(data).length > 0 ? (
        <>
          <Typography variant="h4" color="secondary">
            Force details
          </Typography>
          {data.description ? (
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(data.description),
              }}
            />
          ) : (
            <Typography>No force description available.</Typography>
          )}
        </>
      ) : null}
    </Box>
  );
}
