import { useEffect, useState } from "react";
import { initWebAssembly } from "p2panda-js";

type Props = {
  children: JSX.Element;
};

export function InitWasm({ children }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initWebAssembly();
      setReady(true);
    };

    init();
  }, []);

  return ready ? children : null;
}
