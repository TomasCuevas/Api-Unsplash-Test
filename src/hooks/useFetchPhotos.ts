import { useEffect, useState } from "react";
import useSWRInmutable from "swr/immutable";

//* interfaces *//
import { IPhoto } from "../intefaces/photo";

interface Return {
  error: boolean;
  isLoading: boolean;
  photos: IPhoto[];
  getNextPage: () => void;
}

export const useFetchPhotos = (): Return => {
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const { data, error } = useSWRInmutable(
    `${import.meta.env.VITE_BASEURL_API}/photos?client_id=${
      import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    }&page=${pageIndex}&per_page=30`,
    { refreshInterval: 0 }
  );

  const getNextPage = () => {
    if (isLoading) return;
    setPageIndex((prev) => prev + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    if (data && !error) {
      setPhotos((prev) => [...prev, ...data.flat()]);
      setIsLoading(false);
    }
  }, [data, error]);

  return {
    // properties
    error,
    isLoading,
    photos,

    // methods
    getNextPage,
  };
};
