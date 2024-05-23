import Footer from "@/components/shared/Footer";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="root relative">
			<Sidebar />
			<MobileNav />
			<div className="root-container">
				<div className="wrapper">{children}</div>
				{/* <div className="w-full shadow-lg fixed bottom-0 bg-white mr-[50%]">
					<Footer />
				</div> */}
			</div>
			<Toaster />
		</main>
	);
};

export default Layout;
