import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function useUrlPaths() {
  const router = useRouter();

  const [urlPath, setUrlPath] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (router.isReady) {
        setUrlPath(router.asPath.split("/")[1]);
      }
    }
  }, [router.asPath]);

  return urlPath;
}
