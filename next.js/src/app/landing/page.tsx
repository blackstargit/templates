import Features from "@/components/Features/Main";
import Hero from "@/components/Hero/Main";
import CustomNavbar from "@/components/Navbar/Main";

export default function Main(): JSX.Element {
	return (
		<div>
			<CustomNavbar />
			<Hero />
			<Features/>
		</div>
	);
}
