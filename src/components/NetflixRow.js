/* ============================================================
   FILE 6: FETCHING MOVIES FROM TMDB API (src/components/NetflixRow.js)
   
   Each row on the Netflix home screen fetches a list of movies
   or TV shows from The Movie Database (TMDB) REST API.
   
   We will first fetch the data using native browser fetch(), and
   then see how axios.get() simplifies the request.
   
   Follow the steps below in order from top to bottom.
   ============================================================ */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { NetflixRowView } from "./NetflixRowView";
import { API_URL, apiKey, lang, TYPE_MOVIE } from "../config";
import { getEndpoint } from "../utils/helper";
import { RowSkeleton } from "./skeletons/RowSkeleton";

const NetflixRow = ({
  title = "",
  wideImage = false,
  type = TYPE_MOVIE,
  param,
  filter = "populaire",
  watermark = false,
}) => {
  /* ------------------------------------------------------------
     STEP 1: MOVIES STATE (useState)
     Replace the placeholder below with a real useState hook:
       const [movies, setMovies] = useState(null)
     While movies is null, the row displays a loading skeleton.
     Once TMDB responds, movies will hold the array of movie objects.
     ------------------------------------------------------------ */

  // TODO: Replace with const [movies, setMovies] = useState(null)
  const movies = null;

  /* ------------------------------------------------------------
     STEP 2: BUILD THE TMDB URL & FETCH MOVIES (useEffect)
     Inside useEffect(..., [type, filter, param]):
       1. Get the endpoint:
          const endpoint = getEndpoint(type, filter, param)
       2. Build the full request URL:
          const url = `${API_URL}/${endpoint}api_key=${apiKey}&language=${lang}&page=1`
       3. STEP 2A (Browser fetch):
          Use fetch(url), parse JSON with .then(res => res.json()),
          and save the array with .then(data => setMovies(data.results)).
       4. STEP 2B (Refactor to Axios):
          Replace fetch(url) with axios.get(url) and save
          response.data.results to setMovies.
     ------------------------------------------------------------ */

  // TODO: Write useEffect to fetch the movies from TMDB (first with fetch, then with axios.get)

  /* ------------------------------------------------------------
     STEP 3: LOADING SKELETON CHECK
     While movies has not loaded yet (!movies), return <RowSkeleton />.
     ------------------------------------------------------------ */

  if (!movies) {
    return <RowSkeleton title={title} wideImage={wideImage} />;
  }

  return (
    <NetflixRowView
      data={movies}
      title={title}
      type={type}
      wideImage={wideImage}
      watermark={watermark}
    />
  );
};

export { NetflixRow };
