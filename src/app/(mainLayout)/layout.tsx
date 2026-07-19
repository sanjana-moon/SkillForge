import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ReactNode } from "react";


interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({
    children,
}: RootLayoutProps) {
    return (
        <div>
            <Navbar />
            <div className="grow flex flex-col">
                {children}
            </div>
            <Footer />
        </div>
    );
}