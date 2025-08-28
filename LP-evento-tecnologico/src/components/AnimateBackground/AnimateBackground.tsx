import React from "react";
import FaultyTerminal from "../FaultyTerminal/FaultyTerminal";

const AnimatedBackground = React.memo(() => {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: -1,
				pointerEvents: "none",
				overflow: "hidden",
				willChange: "transform, opacity",
			}}>
			<FaultyTerminal
				scale={3}
				gridMul={[2, 1]}
				digitSize={2.0}
				timeScale={0.2}
				pause={false}
				scanlineIntensity={0.5}
				glitchAmount={1}
				flickerAmount={0}
				noiseAmp={1}
				chromaticAberration={0}
				dither={0}
				curvature={0}
				tint="#00ff41"
				mouseReact={false}
				mouseStrength={0.5}
				pageLoadAnimation={true}
				brightness={0.2}
			/>
		</div>
	);
});

export default AnimatedBackground;
