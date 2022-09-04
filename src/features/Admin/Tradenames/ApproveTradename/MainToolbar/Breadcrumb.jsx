import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Breadcrumb = (props) => {
  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link color='inherit' href='#' onClick={() => props.history.push("/")}>
          Dashboard
        </Link>
        <Typography color='textPrimary'>Pending Tradenames</Typography>
      </Breadcrumbs>
      <Typography variant='h5'>
        <Box fontWeight='fontWeightMedium'>Pending Tradenames</Box>
      </Typography>
    </div>
  );
};

export default withRouter(Breadcrumb);
