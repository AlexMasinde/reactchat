import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
  const media = window.matchMedia(query);
  const [matches, setMatches] = useState(media.matches);

  useEffect(() => {
    const changeListener = (e) => {
      if (e.matches !== matches) {
        setMatches(e.matches);
      }
    };

    media.addEventListener("change", changeListener);
    return () => media.removeEventListener("change", changeListener);
  }, [media, matches, query]);

  return matches;
}
