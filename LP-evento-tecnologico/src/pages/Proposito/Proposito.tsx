import style from "./Proposito.module.css";
import textosProposito from "./Proposito.text";
import Container from "../../components/Container/Container";
import useTypingEffectSequential from "../../hooks/useTypingEffect";
import NavBar from "../../components/NavBar/NavBar";
import TerminalLine from "../../components/TerminalLine/TerminalLine";
import { useAutoRedirect } from "../../hooks/autoRedirect";

const arraysParaAnimar = [
	textosProposito.linhasCabecario.map((h) => h.conteudo),
	textosProposito.linhasDestaque.map((d) => d.conteudo),
	textosProposito.paragrafos.map((p) => p.conteudo),
	textosProposito.linhasComplementares.map((b) => b.conteudo),
];

export default function Proposito() {
	const visibleCounts = useTypingEffectSequential(arraysParaAnimar);

	const totalCabecario = textosProposito.linhasCabecario.length;
	const totalDestaques = textosProposito.linhasDestaque.length;
	const totalParagrafos = textosProposito.paragrafos.length;
	const totalComplementares = textosProposito.linhasComplementares.length;

	const terminouAnimacao =
		visibleCounts[0] === totalCabecario &&
		visibleCounts[1] === totalDestaques &&
		visibleCounts[2] === totalParagrafos &&
		visibleCounts[3] === totalComplementares;

	useAutoRedirect("/equipe/1", 5000, terminouAnimacao);

	return (
		<section className={style.proposito}>
			<Container>
				<NavBar />
				<section className={style.propositoContainer}>
					<div className={style.cabecario}>
						{textosProposito.linhasCabecario
							.slice(0, visibleCounts[0])
							.map((linha, i) => (
								<TerminalLine
									key={i}
									type="cursor"
									className={"linhaDestaqueSequencia"}
									cursorText={"> "}
									content={linha.conteudo}
									description={""}
								/>
							))}
					</div>
					<div className={style.cabecario}>
						{textosProposito.linhasDestaque
							.slice(0, visibleCounts[1])
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
						{textosProposito.paragrafos
							.slice(0, visibleCounts[2])
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
						{textosProposito.linhasComplementares
							.slice(0, visibleCounts[3])
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
