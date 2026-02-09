import { ArrowRight } from "@mui/icons-material";

export default function Apply(): JSX.Element{
    return (
		<div className="flex flex-col gap-7 justify-center items-center sm:items-centerspace-y-4 w-full">
			<p className="text-lg text-white max-w-[90vw] text-center ">
				Achieve business success with Xenon
				Bank. Our comprehensive financial
				solutions help unlock your business
				potential.
			</p>

			<button className="bg-white ps-3 py-2 rounded-xl text-gray-500 flex flex-row items-center">
				<div className=" px-4 py-2 text-gray-800 font-semibold rounded-xl bg-green-500">
					Apply Now
                </div>
                <ArrowRight style={{fontSize:"40px"}}/>
            </button>
            
		</div>
    );
}