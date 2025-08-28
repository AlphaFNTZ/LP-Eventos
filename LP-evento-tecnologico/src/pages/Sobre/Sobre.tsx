import style from "./Sobre.module.css";
import textosSobre from "./Sobre.text";
import useTypingEffectSequential from "../../hooks/useTypingEffect";
import Container from "../../components/Container/Container";
import NavBar from "../../components/NavBar/NavBar";
import TerminalLine from "../../components/TerminalLine/TerminalLine";
import { useAutoRedirect } from "../../hooks/autoRedirect";

const arraysParaAnimar = [
	textosSobre.linhasCabecario.map((h) => h.conteudo),
	textosSobre.paragrafos.map((p) => p.conteudo),
	textosSobre.linhasComplementares.map((b) => b.conteudo),
];

export default function Sobre() {
	const visibleCounts = useTypingEffectSequential(arraysParaAnimar);

	const totalCabecario = textosSobre.linhasCabecario.length;
	const totalParagrafos = textosSobre.paragrafos.length;
	const totalComplementares = textosSobre.linhasComplementares.length;

	const terminouAnimacao =
		visibleCounts[0] === totalCabecario &&
		visibleCounts[1] === totalParagrafos &&
		visibleCounts[2] === totalComplementares;

	useAutoRedirect("/proposito", 5000, terminouAnimacao);

	return (
		<section className={style.sobre}>
			<Container>
				<NavBar />
				<section className={style.sobreContainer}>
					<div className={style.cabecario}>
						{textosSobre.linhasCabecario
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
						{textosSobre.paragrafos
							.slice(0, visibleCounts[1])
							.map((linha, i) => (
								<TerminalLine
									key={i}
									type="normal"
									className={""}
									cursorText={""}
									content={linha.conteudo}
									description={""}
								/>
							))}
					</div>
					<div className={style.complementares}>
						{textosSobre.linhasComplementares
							.slice(0, visibleCounts[2])
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
				</section>
			</Container>
		</section>
	);
}
