import { useEffect, useState } from "react";
import { IPhotos } from "../intefaces/photos";

export const App = () => {
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [pageIndex, setPageIndex] = useState(1);

  const getPhotos = async () => {
    const data = await fetch(
      `${import.meta.env.VITE_BASEURL_API}/photos?client_id=${
        import.meta.env.VITE_UNSPLASH_ACCESS_KEY
      }&page=${pageIndex}`
    );

    const photos: IPhotos[] = await data.json();
    setPageIndex((prev) => prev + 1);
    setPhotos((prev) => [...prev, ...photos]);
  };

  useEffect(() => {
    getPhotos();
  }, []);

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
