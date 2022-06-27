import {Box, Divider, Typography} from "@mui/material";
import {observer}                 from "mobx-react";
import React                      from "react";
import {useStore}                 from "../../Hooks";
import "./Styles/Home.scss";

export const Home = observer(() => {
  const authenticationStore = useStore("authenticationStore");
  const isCurrentUserAuthenticated = authenticationStore.isAuthenticated();
  const currentUser = authenticationStore.getCurrentUser();
  return (
      <Box className="home">
        {isCurrentUserAuthenticated ? (
            <Typography variant="h3" className="home-greeting">
              💵 Welcome, {currentUser.username}!
            </Typography>
        ) : (
            <Box>
              <Typography variant="h3" className="home-greeting">
                💵 Welcome!
              </Typography>
              <Divider />
              <Typography variant="h5" className="home-description">
                <i>
                  <strong>Cash Control</strong> is a simple, easy-to-use, and
                  secure
                  way to manage your money.
                </i>
              </Typography>
              <Divider />
            </Box>
        )}
      </Box>
  );
});
