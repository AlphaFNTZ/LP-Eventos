import style from "./LogoWelcome.module.css";
import Logo from "../../assets/LogoEvento.webp";

interface LogoWelcomeProps {
	content: string;
}

const LogoWelcome: React.FC<LogoWelcomeProps> = ({ content }) => {
	return (
		<section className={style.logo}>
			<h1>{content}</h1>
			<img src={Logo} alt="Logo do evento" />
		</section>
	);
};

export default LogoWelcome;
