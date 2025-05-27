import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
		>
			<Header />
			Hello home page
			<Footer />
		</div>
	);
};
export default HomePage;
