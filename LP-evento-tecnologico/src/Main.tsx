import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Rotas from "./Rotas.tsx";
import "./styles/GlobalStyle.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Rotas />
	</StrictMode>
);
