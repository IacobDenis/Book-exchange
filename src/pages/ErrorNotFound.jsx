import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ErrorNotFound() {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/mainpage");
  };
  return (
    <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", my: 2 }}>
      <Typography variant="h2">Page not found /existing</Typography>
      <Typography mt={2} variant="body1">
        The page requested not exist
      </Typography>
      <img
        className="errorPage"
        src="https://talk.tiddlywiki.org/uploads/default/original/2X/c/c7a30ca007405c38cd689d93513c109dc42b793e.jpeg"
      />
      <Button onClick={goToMainPage} variant="contained">
        Go to Mainpage
      </Button>
    </Container>
  );
}
