import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { baseURL, getBooks } from "../services/books";
import { BookPost } from "../components/BookPost";
import { useSearchParams } from "react-router-dom";
import { CircularProgress, Grid, InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";
import SearchIcon from '@mui/icons-material/FindInPage';
import classes from "../styles/mainpage.module.css";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import { fetchAndParse } from "../services/utils";
import { useFetchData } from "../hooks/useFetchData";

function useQueryParams({ key, initialValue, transformer, resetOn }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentElement = transformer(searchParams.get(key) ?? initialValue);

  const [state, setState] = useState(currentElement);

  useEffect(() => {
    setState(currentElement);
  }, [currentElement]);
  function handleStateChange(newValue) {
    // console.log("New value in query", newValue);
    setState(newValue);
    // si la fiecare schimbare state, schimbam si URL-ul
    setSearchParams((query) => {
      if (query.has(key)) {
        query.set(key, newValue);
      } else {
        query.append(key, newValue);
      }
      if (resetOn === transformer(newValue)) {
        query.delete(key);
      }
      return query;
    });
  }
  return [state, handleStateChange];
}

export function MainPage() {
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useQueryParams({
    key: "search",
    initialValue: "",
    transformer: String,
    resetOn: "",
  });
  const [pageNumber, setPageNumber] = useQueryParams({
    initialValue: 1,
    key: "page",
    transformer: Number,
    resetOn: 1,
  });
  
  

  const [apiPostBooks, setApiPostBooks] = useState({
    results: [],
    totalCount: 0,
  });

  useEffect(() => {
    const limit = 8;
    const offset = (pageNumber - 1) * limit;

    let url = `${baseURL}/book/search?limit=${limit}&offset=${offset}`;

  
    if (searchQuery) {
      setPageNumber(1);
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }

    fetchAndParse(url)
      .then((response) => {
        setApiPostBooks(response);
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [pageNumber, searchQuery]);

  const totalPages = Math.ceil(apiPostBooks.totalCount / 8);

  const handleChange = (event, value) => {
    setPageNumber(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { loading } = useFetchData({
    fetcher: () => getBooks(),
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <AppLayout>
      <Box className={classes.containerColor}>
        <Grid className={classes.searchBar} container>
          <Grid sx={{ my: 1, alignItems: "center", display: "flex" }} item md={6}>
            <Typography className={classes.welcomeTitle} variant="h3">
              Welcome to your page {user.firstName} {user.lastName}
            </Typography>
          </Grid>
          <Grid sx={{ my: 3, display: "flex", justifyContent: "end" }} item md={6}>
            <TextField
              label="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flex: "1 1 0%",
          flexDirection: "column",
        }}
      >
        {apiPostBooks.results.length > 0 ? (
          <BookPost booksDisplay={apiPostBooks.results} />
        ) : (
          <Box className="bookNotFoundCenter">
            <Typography variant="h3">Books not found</Typography>
          </Box>
        )}
        <Pagination
          color="primary"
          sx={{ ml: 8, my: 1 }}
          count={totalPages}
          page={pageNumber}
          onChange={handleChange}
        ></Pagination>
      </Box>
    </AppLayout>
  );
}
