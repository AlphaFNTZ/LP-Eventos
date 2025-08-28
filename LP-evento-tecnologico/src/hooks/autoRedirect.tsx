import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAutoRedirect(
	to: string,
	delay: number = 5000,
	enabled: boolean = true
) {
	const navigate = useNavigate();

	useEffect(() => {
		if (!enabled) return;

		const timer = setTimeout(() => {
			navigate(to);
		}, delay);

		return () => clearTimeout(timer);
	}, [navigate, to, delay, enabled]);
}
