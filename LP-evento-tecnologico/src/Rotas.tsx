import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScanLines from "./components/ScanLine/ScanLine";
import AnimatedBackground from "./components/AnimateBackground/AnimateBackground";
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Proposito from "./pages/Proposito/Proposito";
import Equipe from "./pages/Equipe/Equipe";
import Participe from "./pages/Participe/Participe";
import Contato from "./pages/Contato/Contato";

function Rotas() {
	return (
		<>
			<ScanLines />
			<AnimatedBackground />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sobre" element={<Sobre />} />
					<Route path="/proposito" element={<Proposito />} />
					<Route path="/equipe/:memberId" element={<Equipe />} />
					<Route path="/participe" element={<Participe />} />
					<Route path="/contato" element={<Contato />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default Rotas;
