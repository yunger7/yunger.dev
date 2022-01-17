import { Box } from "@mui/material";

/*
width: number (100 => 300)
height: number (0 => 500)
invert: boolean
flip: boolean
position: string (top | bottom)
color: string (#hex)

Obs: Parent container position must be set to 'relative'
*/

export function WaveDivider({
	height = 100,
	width = 100,
	invert = false,
	flip = false,
	position = "top",
	color = "#ffffff",
}) {
	return (
		<Box
			sx={[
				{
					position: "absolute",
					left: 0,
					width: "100%",
					overflow: "hidden",
					lineHeight: 0,
					...(position === "top" && { top: -1 }),
					...(position === "bottom" && { bottom: -1 }),

					"& svg": {
						position: "relative",
						display: "block",
						width: `calc(${width}% + 1.3px)`,
						height,
						...(flip && { transform: "rotateY(180deg)" }),
					},

					"& .shape-fill": {
						fill: color,
					},
				},
				((position === "top" && invert) ||
					(position === "bottom" && !invert)) && {
					transform: "rotate(180deg)",
				},
			]}
		>
			<svg
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
			>
				<path
					d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
					className="shape-fill"
				></path>
			</svg>
		</Box>
	);
}
