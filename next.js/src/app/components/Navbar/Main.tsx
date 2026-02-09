"use client";

import { KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";
import Logo from "./Logo";

export default function CustomNavbar(): JSX.Element {
	const [menu, setMenu] = useState(false);

	const handleMenu = () => {
		setMenu(!menu);

		setTimeout(() => {
			console.log("alive");
			setMenu(false);
		}, 3000);
	};

	const vDivider = (
		<div className="bg-gray-500 w-[1px] ms-3 me-3 h-[20px]"></div>
	);

	const hDivider = (
		<div className="bg-gray-500 h-[1px] mt-2 mb-2 w-[50vw]"></div>
	);

	return (
		<div className="min-h-[70px] flex justify-center flex-col pt-2 px-4 text-gray-600">
			<div className=" flex justify-between min-w-[100%] items-center">
				<Logo />
				<button
					className="lg:hidden md:hidden sm:inline-block"
					onClick={handleMenu}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block h-5 w-5 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>

				<div className="hidden md:flex lg:flex flex-row justify-center items-center font-semibold">
					<div>Home</div>
					{vDivider}

					<div>Products</div>
					{vDivider}

					<div>Features</div>
					{vDivider}

					<div>Tools</div>
					{vDivider}

					<div className="flex items-center">
						<label>More</label>
						<KeyboardArrowDown
							style={{
								fontSize: "20px",
							}}
						/>
					</div>

					<button className="lg:hidden md:hidden sm:inline-block mt-3 px-3 py-2 font-semibold rounded-xl bg-green-500">
						Apply Now
					</button>
				</div>

				<button className="hidden md:inline-block lg:inline-block px-5 py-3 font-semibold rounded-xl text-white bg-green-500">
					Apply Now
				</button>
			</div>

			{menu && (
				<div className="flex flex-col justify-center items-center font-semibold mt-3 pb-4">
					<div>Home</div>
					{hDivider}

					<div>Products</div>
					{hDivider}

					<div>Features</div>
					{hDivider}

					<div>Tools</div>
					{hDivider}

					<div className="flex items-center">
						<label>More</label>
						<KeyboardArrowDown
							style={{
								fontSize: "20px",
							}}
						/>
					</div>
					{hDivider}

					<button className="lg:hidden mt-3 px-3 py-2 font-semibold rounded-xl bg-green-500">
						Apply Now
					</button>
				</div>
			)}
		</div>
	);
}
