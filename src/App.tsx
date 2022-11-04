import { useEffect, useState } from "react";
import useSWRInmutable from "swr/immutable";

//* interface *//
import { IPhotos } from "../intefaces/photos";

export const App = () => {
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const { data, error } = useSWRInmutable(
    `${import.meta.env.VITE_BASEURL_API}/photos?client_id=${
      import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    }&page=${pageIndex}`
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
    <>
      <section className="mx-auto mt-2 flex w-11/12 flex-wrap justify-center gap-2">
        {photos.map(({ urls: { regular }, id }) => (
          <img
            src={regular}
            alt="image"
            key={id}
            className="h-[300px] w-[300px] object-cover"
          />
        ))}
      </section>
      <div
        onClick={getPhotos}
        className="my-4 flex cursor-pointer items-center justify-center"
      >
        <span className="rounded-lg bg-amber-400 px-5 py-2 text-3xl font-bold text-white">
          Cargar mas
        </span>
      </div>
    </>
  );
};
