import { useEffect, useState } from "react";
import useSWRInmutable from "swr/immutable";

//* interface *//
import { IPhotos } from "./intefaces/photos";
import { useCalcColumns } from "./hooks/useCalcColumns";
import { FeedColumn } from "./components/FeedColumns";
import { useFetchPhotos } from "./hooks/useFetchPhotos";

export const App = () => {
  const { photos, getNextPage } = useFetchPhotos();
  const { columns } = useCalcColumns({
    columnsProps: [
      { columnsNumber: 1, min_width: 0 },
      { columnsNumber: 2, min_width: 640 },
      { columnsNumber: 3, min_width: 1024 },
    ],
    elements: photos,
  });

  return (
    <section className="mx-auto mb-10 grid w-full max-w-[900px] grid-cols-1 gap-3 px-[5%] py-6 sm:grid-cols-2 lg:max-w-[1500px] lg:grid-cols-3">
      {columns.map((column, index) => (
        <FeedColumn photos={column} key={index} getNextPage={getNextPage} />
      ))}
    </section>
  );
};
