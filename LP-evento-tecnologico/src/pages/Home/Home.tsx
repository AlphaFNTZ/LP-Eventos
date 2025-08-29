import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import textosHome from "./Home.text";
import Container from "../../components/Container/Container";
import TerminalLine from "../../components/TerminalLine/TerminalLine";
import LogoLoading from "../../components/LogoLoading/LogoLoading";
import LogoWelcome from "../../components/LogoWelcome/LogoWelcome";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

export default function Home() {
	const [linhasVisiveis, setLinhasVisiveis] = useState(0);
	const [step, setStep] = useState(1);
	const navigate = useNavigate();

	const redirecionamento = () => {
		navigate("/sobre");
	};

	const getTipoLinha = (index: number) => {
		if (index === 0) {
			return "cursor";
		}
		if (index === 4) {
			return "label";
		}
		return "normal";
	};

	const getCursorText = (index: number) => {
		if (index === 0) {
			return "> ";
		}
		if (index === 4) {
			return "";
		}
		return "[x] ";
	};

	useEffect(() => {
		if (step === 1) {
			const interval = setInterval(() => {
				setLinhasVisiveis((prev) => {
					if (prev < textosHome.linhas.length) {
						return prev + 1;
					} else {
						clearInterval(interval);
						setTimeout(() => setStep(2), 3000);
						return prev;
					}
				});
			}, 700);
			return () => clearInterval(interval);
		}
		if (step === 2) {
			const timeout = setTimeout(() => setStep(3), 1000);
			return () => clearTimeout(timeout);
		}
		if (step === 3) {
			const timeout = setTimeout(() => redirecionamento(), 3000);
			return () => clearTimeout(timeout);
		}
	}, [step]);

	return (
		<section className={style.home}>
			{step === 1 && (
				<Container>
					<div className={style.loading}>
						<section>
							{textosHome.linhas.slice(0, linhasVisiveis).map((linha, i) => (
								<TerminalLine
									key={i}
									type={getTipoLinha(i)}
									cursorText={getCursorText(i)}
									content={linha.conteudo}
								/>
							))}
						</section>
						{linhasVisiveis === textosHome.linhas.length && (
							<>
								<LogoLoading content={textosHome.titulo} />
								<LoadingBar />
							</>
						)}
					</div>
				</Container>
			)}
			{step === 2 && <Container />}
			{step === 3 && (
				<Container>
					<div className={style.logoWelcome}>
						<LogoWelcome content={textosHome.bemVindo} />
						{/* <Button onClick={redirecionamento} content={textosHome.buttonWelcome} /> */}
					</div>
				</Container>
			)}
		</section>
	);
}
