import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);

    const changeListener = (e) => {
      if (e.matches !== matches) {
        setMatches(e.matches);
      }
    };
    media.addEventListener("change", changeListener);
    return () => media.removeEventListener("change", changeListener);
  }, [matches, query]);

  return matches;
}
