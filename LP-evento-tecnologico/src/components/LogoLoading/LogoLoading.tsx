import style from "./LogoLoading.module.css";
import Logo from "../../assets/LogoEmpresa.webp";

interface LogoLoadingProps {
  content: string
}

const LogoLoading: React.FC<LogoLoadingProps> = ({ content }) => {
	return (
		<section className={style.logo}>
			<h1>{content}</h1>
			<div className={style.linha} />
			<img src={Logo} alt="Logo da empresa" />
		</section>
	);
};

export default LogoLoading;
