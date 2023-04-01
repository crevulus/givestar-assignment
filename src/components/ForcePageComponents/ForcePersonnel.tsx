import { PersonnelType } from "../../data/types";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { Typography } from "@mui/material";

type Props = {
  data?: PersonnelType[];
};

export function ForcePersonnel({ data }: Props) {
  return (
    <>
      {data && Object.keys(data).length > 0 ? (
        <>
          {data.map((personnel) => (
            <>
              <Typography>{personnel.name}</Typography>
              {personnel.bio ? (
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(personnel.bio),
                  }}
                />
              ) : null}
            </>
          ))}
        </>
      ) : null}
    </>
  );
}
