import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./Equipe.module.css";
import textosEquipe from "./Equipe.text";
import useTypingEffectSequential from "../../hooks/useTypingEffect";
import Container from "../../components/Container/Container";
import TerminalLine from "../../components/TerminalLine/TerminalLine";
import TeamHeader from "../../components/TeamHeader/TeamHeader";
import NavBar from "../../components/NavBar/NavBar";

const Equipe: React.FC = () => {
	const { memberId } = useParams<{ memberId: string }>();
	const navigate = useNavigate();

	const [activeMemberId, setActiveMemberId] = useState("1");

	const activeMember = textosEquipe.membros.find(
		(member) => member.id === activeMemberId
	);

	const arraysParaAnimar = [
		textosEquipe.linhasCabecario.map((h) => h.conteudo),
		activeMember
			? [
					`Nome: ${activeMember.descricao.name}`,
					`Cargo: ${activeMember.descricao.cargo}`,
					`Especialidade: ${activeMember.descricao.especialidade}`,
					`Biografia: ${activeMember.descricao.biografia}`,
			  ]
			: [],
		activeMember ? ["Curiosidades:", ...activeMember.destaques] : [],
		activeMember ? [`Status: ${activeMember.status}`] : [],
	];

	const visibleCounts = useTypingEffectSequential(
		arraysParaAnimar,
		500,
		activeMemberId
	);

	const totalCabecario = textosEquipe.linhasCabecario.length;
	const totalDescricao = arraysParaAnimar[1].length;
	const totalCuriosidas = arraysParaAnimar[2].length;
	const totalStatus = arraysParaAnimar[3].length;

	const terminouAnimacao =
		visibleCounts[0] === totalCabecario &&
		visibleCounts[1] === totalDescricao &&
		visibleCounts[2] === totalCuriosidas &&
		visibleCounts[3] === totalStatus;

	useEffect(() => {
		if (terminouAnimacao) {
			const timeout = setTimeout(() => {
				const idAtual = parseInt(activeMemberId, 10);
				const totalMembros = textosEquipe.membros.length;

				if (idAtual < totalMembros) {
					navigate(`/equipe/${idAtual + 1}`);
				} else {
					navigate("/participe");
				}
			}, 5000);

			return () => clearTimeout(timeout);
		}
	}, [terminouAnimacao, activeMemberId, navigate]);

	const handleMemberSelect = (memberId: string) => {
		setActiveMemberId(memberId);
		navigate(`/equipe/${memberId}`);
	};

	if (!activeMember) return null;

	useEffect(() => {
		if (memberId) {
			setActiveMemberId(memberId);
		}
	}, [memberId]);

	return (
		<section className={style.equipe}>
			<Container>
				<NavBar />
				<TeamHeader
					members={textosEquipe.membros.map((member) => ({
						id: member.id,
						name: member.descricao.name,
					}))}
					activeMemberId={activeMemberId}
					onMemberSelect={handleMemberSelect}
				/>
				<section className={style.equipeContainer} key={activeMemberId}>
					<div className={style.cabecario}>
						{textosEquipe.linhasCabecario
							.slice(0, visibleCounts[0])
							.map((linha, i) => (
								<TerminalLine
									key={i}
									type="cursor"
									cursorText="> "
									content={linha.conteudo}
									description={linha.descricao}
								/>
							))}
					</div>
					<div className={style.descricao}>
						{arraysParaAnimar[1]
							.slice(0, visibleCounts[1])
							.map((conteudo, i) => {
								if (conteudo.includes(":")) {
									const [label, ...resto] = conteudo.split(": ");
									const content = resto.join(": ");
									return (
										<TerminalLine
											key={i}
											type="label"
											label={`${label}:`}
											content={content}
										/>
									);
								}
								return (
									<TerminalLine key={i} type="normal" content={conteudo} />
								);
							})}
					</div>
					<div className={style.destaques}>
						{arraysParaAnimar[2]
							.slice(0, visibleCounts[2])
							.map((conteudo, i) => {
								if (conteudo === "Curiosidades:") {
									return (
										<TerminalLine
											key={i}
											type="label"
											label={conteudo}
											content=""
										/>
									);
								}
								return (
									<TerminalLine
										key={i}
										type="bullet"
										bulletChar="- "
										content={conteudo.replace("- ", "")}
									/>
								);
							})}
					</div>
					<div className={style.status}>
						{arraysParaAnimar[3]
							.slice(0, visibleCounts[3])
							.map((conteudo, i) => {
								const [label, ...resto] = conteudo.split(": ");
								const content = resto.join(": ");
								return (
									<TerminalLine
										key={i}
										type="label"
										label={`${label}:`}
										content={content}
									/>
								);
							})}
					</div>
				</section>
			</Container>
		</section>
	);
};

export default Equipe;
