import React from "react";
import style from "./TerminalLine.module.css";

interface TerminalLineProps {
	type: "normal" | "highlight" | "cursor" | "label" | "bullet" | "loading";
	cursorText?: string;
	content: string;
	description?: string;
	label?: string;
	bulletChar?: string;
	className?: string;
}

const TerminalLine: React.FC<TerminalLineProps> = ({
	type,
	cursorText,
	content,
	description,
	label,
	bulletChar = "-",
	className,
}) => {
	const renderContent = () => {
		switch (type) {
			case "highlight":
				return (
					<p className={`${style.linhaDestaqueUnico} ${className || ""}`}>
						{content}
					</p>
				);

			case "cursor":
				return (
					<p className={`${style.linhaCursor} ${className || ""}`}>
						<span className={style.cursor}>{cursorText || ">"}</span>
						<span className={style.conteudoDestaque}>{content}</span>
						{description && (
							<span className={style.description}>{description}</span>
						)}
					</p>
				);

			case "label":
				return (
					<p className={`${style.linhaLabel} ${className || ""}`}>
						{label && <span className={style.label}>{label}</span>}
						<span className={style.conteudoNormal}>{content}</span>
					</p>
				);

			case "bullet":
				return (
					<p className={`${style.linhaBullet} ${className || ""}`}>
						<span className={style.cursor}>{bulletChar}</span>
						<span className={style.conteudoNormal}>{content}</span>
					</p>
				);

			case "loading":
				return (
					<p className={`${style.linhaLoading} ${className || ""}`}>
						<span className={style.cursor}>{cursorText || ">"}</span>
						<span className={style.conteudoDestaque}>{content}</span>
					</p>
				);

			case "normal":
			default:
				return (
					<p className={`${style.linhaNormal} ${className || ""}`}>
						{cursorText && <span className={style.cursor}>{cursorText}</span>}
						<span className={style.conteudoNormal}>{content}</span>
						{description && (
							<span className={style.description}>{description}</span>
						)}
					</p>
				);
		}
	};

	return <>{renderContent()}</>;
};

export default TerminalLine;
