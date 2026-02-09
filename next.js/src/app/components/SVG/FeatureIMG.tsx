import Image from "next/image";

const FeatureIMG = () => {
	return (
		<div className="relative z-10  transition-transform duration-300 hover:scale-105 w-full">
			<div className=" flex justify-center items-center w-72 h-96">
				<Image
					src="/assets/feature_1.png"
					alt="Human Outline"
					fill // Use fill to make the image fill the parent container
					style={{
						objectFit: "contain",
					}} // Apply objectFit using inline style
					className="drop-shadow-2xl"
				/>
			</div>
		</div>
	);
};

export default FeatureIMG;
