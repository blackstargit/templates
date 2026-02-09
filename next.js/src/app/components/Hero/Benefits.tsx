import { AccountCircleRounded, Add } from "@mui/icons-material";
import BenefitsSVG from "@/components/SVG/BenefitsSvg";

export default function Benefits(): JSX.Element {
	return (
		<div className="flex flex-col justify-between space-y-4">
			<div className="space-y-2"></div>

			<div className=" w-[500px]">
				<BenefitsSVG />
			</div>

			<div className="pt-10 text-xl flex items-center justify-end pe-5">
				<div className="-space-x-5 overflow-hidden -me-1.5">
					<AccountCircleRounded className="inline-block h-10 w-10 rounded-full " />
					<AccountCircleRounded className="inline-block h-10 w-10 rounded-full " />
					<AccountCircleRounded className="inline-block h-10 w-10 rounded-full " />
				</div>
				<Add />
				<label>12M Active Users</label>
			</div>
		</div>
	);
}
