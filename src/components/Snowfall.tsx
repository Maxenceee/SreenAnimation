import React, { useEffect, useRef, useState } from "react";
import { useTiming } from "@src/utils/useTiming";

interface Snowflake {
	x: number;
	y: number;
	radius: number;
	speedX: number;
	speedY: number;
	rotation: number;
    rotationSpeed: number;
	numBranches: number;

	update: () => void;
	draw: (ctx: CanvasRenderingContext2D) => void;
	isOutOfScreen: (height: number) => boolean;
}

export const Snowfall = () => {
	const { isExpired, setExpiration } = useTiming("snowfall");

	const canDisplay = () => {
		const now = Date.now();
		return isExpired() && new Date("10-02-2025").getTime() > now;
	}

	const [display, setDisplay] = useState(canDisplay());
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const generationActive = useRef(true);
	const snowflakesRef = useRef<Snowflake[]>([]);

	useEffect(() => {
		if (!display) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		setExpiration(3);

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		let anim: number;

		class SnowflakeClass implements Snowflake {
			x: number;
			y: number;
			radius: number;
			speedX: number;
			speedY: number;
			rotation: number;
			rotationSpeed: number;
			numBranches: number;

			constructor(x: number, y: number, radius: number, speedX: number, speedY: number) {
				this.x = x;
				this.y = y;
				this.radius = radius;
				this.speedX = speedX;
				this.speedY = speedY;
				this.rotation = Math.random() * Math.PI * 2;
				this.rotationSpeed = (Math.random() - 0.5) * 0.05;
				this.numBranches = Math.floor(Math.random() * 3) + 6;
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;
				this.rotation += this.rotationSpeed;
			}

			isOutOfScreen(height: number) {
				return this.y > height + this.radius;
			}

			draw(ctx: CanvasRenderingContext2D) {
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate(this.rotation);

				const angle = (Math.PI * 2) / this.numBranches;
				const subBranchAngle = Math.PI / 3;
				const subBranchLength = this.radius * 0.3;

				const branchOffset = this.radius * 0.3;
			
				for (let i = 0; i < this.numBranches; i++) {
					const branchAngle = angle * i;

					ctx.beginPath();
					ctx.moveTo(0, 0);
					ctx.lineTo(
						Math.cos(branchAngle) * this.radius,
						Math.sin(branchAngle) * this.radius
					);
					ctx.strokeStyle = "#bdd6e2";
					ctx.lineWidth = 1.5;
					ctx.stroke();

					const endX = Math.cos(branchAngle) * this.radius;
					const endY = Math.sin(branchAngle) * this.radius;

					const subBranchStartX = endX - Math.cos(branchAngle) * branchOffset;
        			const subBranchStartY = endY - Math.sin(branchAngle) * branchOffset;

					ctx.beginPath();
					ctx.moveTo(subBranchStartX, subBranchStartY);
					ctx.lineTo(
						subBranchStartX + Math.cos(branchAngle + subBranchAngle) * subBranchLength,
						subBranchStartY + Math.sin(branchAngle + subBranchAngle) * subBranchLength
					);
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(subBranchStartX, subBranchStartY);
					ctx.lineTo(
						subBranchStartX + Math.cos(branchAngle - subBranchAngle) * subBranchLength,
						subBranchStartY + Math.sin(branchAngle - subBranchAngle) * subBranchLength
					);
					ctx.stroke();
				}
			
				ctx.restore();
			}
		}

		const addSnowflake = () => {
			if (snowflakesRef.current.length < 200 && generationActive.current) {
				const x = Math.random() * canvas.width;
				const y = -10;
				const radius = Math.random() * 4 + 2;
				const speedX = Math.random() * 2 - 1;
				const speedY = Math.random() * 3 + 1;
				snowflakesRef.current.push(new SnowflakeClass(x, y, radius, speedX, speedY));
			}
		};

		const animate = () => {
			console.log("animate");
			if (!ctx) return;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			snowflakesRef.current.forEach((snowflake, index) => {
				snowflake.update();
				snowflake.draw(ctx);

				if (snowflake.isOutOfScreen(canvas.height)) {
					snowflakesRef.current.splice(index, 1);
				}
			});

			if (snowflakesRef.current.length > 0 || generationActive.current) {
				anim = requestAnimationFrame(animate);
			} else {
				setDisplay(false);
			}
		};

		animate();

		const generationInterval = setInterval(addSnowflake, 50);

		setTimeout(() => {
			generationActive.current = false;
			clearInterval(generationInterval);
		}, 5000);

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			clearInterval(generationInterval);
			cancelAnimationFrame(anim);
		};
	}, []);

	return display && <canvas ref={canvasRef} style={{ pointerEvents: "none", display: "block", position: "fixed", top: 0, left: 0, bottom: 0, right: 0, zIndex: 10000 }} />;
};