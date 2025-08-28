import style from "./Contato.module.css";
import textosContato from "./Contato.text";
import useTypingEffectSequential from "../../hooks/useTypingEffect";
import Container from "../../components/Container/Container";
import NavBar from "../../components/NavBar/NavBar";
import TerminalLine from "../../components/TerminalLine/TerminalLine";
import QR from "../../assets/QRCode.png";
import { useAutoRedirect } from "../../hooks/autoRedirect";

const arraysParaAnimar = [
	textosContato.linhasCabecario.map((h) => h.conteudo),
	textosContato.contatos,
];

export default function Contato() {
	const visibleCounts = useTypingEffectSequential(arraysParaAnimar);

	const totalCabecario = textosContato.linhasCabecario.length;
	const totalContatos = textosContato.contatos.length;

	const terminouAnimacao =
		visibleCounts[0] === totalCabecario && visibleCounts[1] === totalContatos;

	useAutoRedirect("/", 5000, terminouAnimacao);

	return (
		<section className={style.contato}>
			<Container>
				<NavBar />
				<section className={style.contatoContainer}>
					<div className={style.cabecario}>
						{textosContato.linhasCabecario
							.slice(0, visibleCounts[0])
							.map((linha, i) => (
								<TerminalLine
									key={i}
									type="cursor"
									cursorText={"> "}
									content={linha.conteudo}
									description={linha.descricao}
								/>
							))}
					</div>
					<div className={style.contatos}>
						{textosContato.contatos
							.slice(0, visibleCounts[1])
							.map((linha, i) => (
								<TerminalLine
									key={i}
									type="label"
									label={linha.split(":")[0] + ":"}
									content={linha.split(":").slice(1).join(":").trim()}
								/>
							))}
					</div>
					<div className={style.qrContainer}>
						{terminouAnimacao && (
							<img src={QR} alt="QR Code" className={style.qr} />
						)}
					</div>
				</section>
			</Container>
		</section>
	);
}
