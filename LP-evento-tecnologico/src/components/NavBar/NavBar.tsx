import { useLocation, useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";
import textosNavBar from "./NavBar.text";

const NavBar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const currentPath = location.pathname;

	const paginasPaths = [
		"/sobre",
		"/proposito",
		"/equipe",
		"/participe",
		"/contato",
	];

	const isPageActive = (path: string) => {
		if (path === "/equipe") return currentPath.startsWith("/equipe");
		return currentPath === path;
	};

	return (
		<nav className={style.navBar}>
			<ul>
				{textosNavBar.paginas.map((pagina, index) => {
					const path = paginasPaths[index];
					return (
						<li key={index} className={isPageActive(path) ? style.active : ""}>
							<button onClick={() => navigate(path)} type="button">
								{pagina.conteudo}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default NavBar;
