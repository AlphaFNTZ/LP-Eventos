import { useState, useEffect } from "react";

export default function useTypingEffectSequential(
	arrays: string[][],
	delay = 500,
	resetKey?: string | number
) {
	const [visibleCounts, setVisibleCounts] = useState(
		new Array(arrays.length).fill(0)
	);
	const [currentGroup, setCurrentGroup] = useState(0);

	useEffect(() => {
		setVisibleCounts(new Array(arrays.length).fill(0));
		setCurrentGroup(0);
	}, [arrays.length, resetKey]);

	useEffect(() => {
		if (currentGroup >= arrays.length) return;

		const currentArray = arrays[currentGroup];

		if (visibleCounts[currentGroup] < currentArray.length) {
			const interval = setInterval(() => {
				setVisibleCounts((prev) => {
					const newCounts = [...prev];
					newCounts[currentGroup] += 1;
					return newCounts;
				});
			}, delay);
			return () => clearInterval(interval);
		} else {
			const timeout = setTimeout(() => {
				setCurrentGroup((g) => g + 1);
			}, delay);
			return () => clearTimeout(timeout);
		}
	}, [visibleCounts, currentGroup, arrays, delay]);

	return visibleCounts;
}
