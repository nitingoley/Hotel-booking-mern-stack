import React from "react";
import Headers from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
 
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Headers />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};
