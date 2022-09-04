import React from "react";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const Breadcrumb = () => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          DashboardPage
        </Link>
        <Typography color="textPrimary">Summary</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
