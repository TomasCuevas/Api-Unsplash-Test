import { useEffect, useState } from "react";
import useSWRInmutable from "swr/immutable";

//* interface *//
import { IPhotos } from "./intefaces/photos";
import { useCalcColumns } from "./hooks/useCalcColumns";
import { FeedColumn } from "./components/FeedColumns";

export const App = () => {
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { columns } = useCalcColumns({
    columnsProps: [
      { columnsNumber: 1, min_width: 0 },
      { columnsNumber: 2, min_width: 640 },
      { columnsNumber: 3, min_width: 1024 },
    ],
    elements: photos,
  });

  const { data, error } = useSWRInmutable(
    `${import.meta.env.VITE_BASEURL_API}/photos?client_id=${
      import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    }&page=${pageIndex}&per_page=30`
  );

  const getPhotos = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setPageIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (data && !error) {
      setPhotos((prev) => [...prev, ...data]);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <section className="mx-auto mb-10 grid w-full max-w-[900px] grid-cols-1 gap-3 px-[5%] py-6 sm:grid-cols-2 lg:max-w-[1500px] lg:grid-cols-3">
      {columns.map((column, index) => (
        <FeedColumn photos={column} key={index} getNextPage={getPhotos} />
      ))}
    </section>
  );
};
