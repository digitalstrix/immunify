import React from "react";
import PropTypes from "prop-types";
import { Box, Breadcrumbs, Grid, Typography, Link } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Index = (props) => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="flex-start">
          <Breadcrumbs>
            <Link
              color="inherit"
              href="#"
              onClick={() => props.history.push("/")}
            >
              DashboardPage
            </Link>
            <Link
              color="inherit"
              href="#"
              onClick={() => props.history.push("/doctor-list")}
            >
              Doctor List
            </Link>
            <Typography color="textPrimary">Add New User</Typography>
          </Breadcrumbs>
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default withRouter(Index);
