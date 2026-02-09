import Apply from "@/components/Hero/Apply";
import Benefits from "@/components/Hero/Benefits";
import FeatureIMG from "@/components/SVG/FeatureIMG";

export default function Hero(): JSX.Element {
	return (
		<div className="rounded-bl-[100px] bg-orange-700 pb-10 sm:px-3 py-10">
			<h1 className="text-5xl text-center">
				Unlock Your{" "}
				<label className="font-bold">
					Business
				</label>{" "}
				Potential with Blackstar
			</h1>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 sm:px-4 md:px-10 lg:px-10 pt-20 justify-center items-center">
				<div className="flex justify-center items-center w-full">
					<Apply />
				</div>

				{/* Show on medium screens and larger */}
				<div className="hidden md:block w-full">
					<FeatureIMG />
				</div>

				<div className="w-full">
					<Benefits />
				</div>

				{/* Show on small screens */}
				<div className="block sm:block md:hidden w-full">
					<FeatureIMG />
				</div>
			</div>
		</div>
	);
}
