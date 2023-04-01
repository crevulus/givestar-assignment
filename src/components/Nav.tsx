import { Toolbar, AppBar, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Paths } from "../data/enum";

type Props = {};

export default function Nav({}: Props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          variant="h6"
          component={RouterLink}
          to={Paths.HOME}
          sx={{ flexGrow: 1 }}
          color="secondary"
        >
          PoliceStar
        </Link>
        <Button color="inherit">Learn More</Button>
      </Toolbar>
    </AppBar>
  );
}
