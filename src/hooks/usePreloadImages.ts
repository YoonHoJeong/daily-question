import { useEffect, useState } from "react";

export const usePreloadImages = (images: string[]) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async (images: string[]) => {
      const promises = await images.map(
        (image) =>
          new Promise<void>(function (resolve, reject) {
            const imageObj = new Image();
            imageObj.src = image;
            imageObj.onload = () => resolve();
            imageObj.onerror = () => reject();
          })
      );
      await Promise.all(promises);
      setLoading(false);
    };
    preloadImages(images);
  }, [images]);

  return { loading };
};
