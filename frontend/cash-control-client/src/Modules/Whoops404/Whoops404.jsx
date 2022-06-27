import {Alert, AlertTitle, Button} from "@mui/material";
import React                       from "react";
import {useNavigate}               from "react-router-dom";
import {ROUTE_URL}                 from "../../Constants";
import "./Styles/Whoops404.scss";

export const Whoops404 = () => {
  const navigate = useNavigate();
  const handleHome = () => navigate(ROUTE_URL.HOME);
  return (
      <Alert
          severity="info"
          action={
            <Button color="inherit" variant="outlined" onClick={handleHome}>
              GO HOME
            </Button>
          }
          className="not-found-alert"
      >
        <AlertTitle>
          <strong>We are sorry,</strong>
        </AlertTitle>
        the page you were looking for can&apos;t be found
      </Alert>
  );
};
