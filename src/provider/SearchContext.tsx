import React, { createContext, useState, useCallback, useEffect } from "react";
import { Place, SearchContextType } from "../types";
import axios from "axios";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [query, setQuery] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const getPlaces = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${String(import.meta.env.VITE_API_URL)}/geo/cities`,
        {
          headers: {
            "x-rapidapi-key": String(import.meta.env.VITE_API_KEY),
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
          },
          params: {
            namePrefix: query,
            limit,
            offset: (page - 1) * limit // Assuming pagination
          }
        }
      );
      setPlaces(response.data.data);
      setTotalItems(response.data.metadata.totalCount);
    } catch (err: unknown) {
      console.error(err);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [query, limit, page]);

  useEffect(() => {
    getPlaces();
  }, [query, limit, page, getPlaces]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        places,
        setPlaces,
        loading,
        setLoading,
        limit,
        setLimit,
        page,
        setPage,
        error,
        setError,
        getPlaces,
        totalItems
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
