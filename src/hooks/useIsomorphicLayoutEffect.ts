import { useEffect, useLayoutEffect } from "react";

/* useLayoutEffect on client, useEffect on server (avoids SSR warning) */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
