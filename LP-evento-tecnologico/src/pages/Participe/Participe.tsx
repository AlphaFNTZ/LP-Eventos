import style from "./Participe.module.css";
import textosParticipe from "./Participe.text";
import useTypingEffectSequential from "../../hooks/useTypingEffect";
import Container from "../../components/Container/Container";
import NavBar from "../../components/NavBar/NavBar";
import TerminalLine from "../../components/TerminalLine/TerminalLine";
import { useAutoRedirect } from "../../hooks/autoRedirect";

const arraysParaAnimar = [
	textosParticipe.linhasCabecario.map((h) => h.conteudo),
	textosParticipe.paragrafos,
	textosParticipe.curiosidades,
	textosParticipe.status,
];

export default function Participe() {
	const visibleCounts = useTypingEffectSequential(arraysParaAnimar);

	const totalCabecario = textosParticipe.linhasCabecario.length;
	const totalParagrafos = textosParticipe.paragrafos.length;
	const totalCuriosidades = textosParticipe.curiosidades.length;
	const totalStatus = textosParticipe.status.length;

	const terminouAnimacao =
		visibleCounts[0] === totalCabecario &&
		visibleCounts[1] === totalParagrafos &&
		visibleCounts[2] === totalCuriosidades &&
		visibleCounts[3] === totalStatus;

	useAutoRedirect("/contato", 5000, terminouAnimacao);

	return (
		<section className={style.participe}>
			<Container>
				<NavBar />
				<section className={style.participeContainer}>
					<div className={style.cabecario}>
						{textosParticipe.linhasCabecario
							.slice(0, visibleCounts[0])
							.map((linha, i) => (
								<TerminalLine
									key={i}
									type="cursor"
									className={"linhaDestaqueSequencia"}
									cursorText={"> "}
									content={linha.conteudo}
									description={linha.descricao}
								/>
							))}
					</div>
					<div className={style.paragrafos}>
						{textosParticipe.paragrafos
							.slice(0, visibleCounts[1])
							.map((linha, i) => (
								<TerminalLine
									key={i}
									type="normal"
									className={""}
									cursorText={""}
									content={linha}
									description={""}
								/>
							))}
					</div>
					<div className={style.complementares}>
						{textosParticipe.curiosidades
							.slice(0, visibleCounts[2])
							.map((linha, i) => (
								<TerminalLine
									key={i}
									type={linha === "Curiosidades:" ? "label" : "bullet"}
									bulletChar="- "
									label={linha === "Curiosidades:" ? linha : undefined}
									content={
										linha === "Curiosidades:" ? "" : linha.replace("- ", "")
									}
								/>
							))}
					</div>
					<div className={style.status}>
						{textosParticipe.status
							.slice(0, visibleCounts[3])
							.map((linha, i) => {
								const [label, ...resto] = linha.split(": ");
								return (
									<TerminalLine
										key={i}
										type="label"
										label={resto.length ? `${label}:` : ""}
										content={resto.join(": ")}
									/>
								);
							})}
					</div>
				</section>
			</Container>
		</section>
	);
}
