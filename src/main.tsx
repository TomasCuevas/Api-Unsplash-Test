import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";

import { App } from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SWRConfig
    value={{
      refreshInterval: 3000,
      fetcher: (resource, init) =>
        fetch(resource, init).then((res) => res.json()),
    }}
  >
    <App />
  </SWRConfig>
);
