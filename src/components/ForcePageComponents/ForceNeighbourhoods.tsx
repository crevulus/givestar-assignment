import { Fragment, useContext, useMemo } from "react";
import { NeighbourhoodType } from "../../data/types";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { Link } from "@mui/material";
import { Input } from "../Input";
import { AppContext } from "../../data/AppContext";
import { Link as RouterLink } from "react-router-dom";
import { Paths } from "../../data/enum";
import { generatePath } from "react-router-dom";

type Props = {
  data?: NeighbourhoodType[];
};

export function ForceNeighbourhoods({ data }: Props) {
  const { setFilterNeighbourhoodsValue } = useContext(AppContext);

  const path = useMemo(() => {
    return generatePath(Paths.NEIGHBOURHOOD_DYNAMIC, {
      forceId: force.id,
      neighbourhoodId,
    });
  }, [force.id]);

  return (
    <>
      {data && Object.keys(data).length > 0 ? (
        <>
          <Input handleChange={setFilterNeighbourhoodsValue} />
          {data.map((neighbourhood) => (
            <Fragment key={neighbourhood.id}>
              <Link
                variant="h6"
                component={RouterLink}
                to={Paths.HOME}
                sx={{ flexGrow: 1 }}
                color="secondary"
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
