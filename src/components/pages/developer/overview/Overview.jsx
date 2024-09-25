import { formatInPeso } from "@/components/helpers/functions-general.jsx";
import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import { Plus, Trophy } from "lucide-react";
import React from "react";

const Overview = () => {
  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <Navigation menu="overview" />

        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper bg-secondary">
              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Overview</h1>
              </div>

              <div className="grid grid-cols-[500px_1fr] gap-4">
                <div className="bg-primary p-4 rounded-md">
                  <div className="py-5 text-center">
                    <p className="leading-none uppercase text-[clamp(14px,4vw,19px)] font-medium text-center">
                      Top Member Buyer
                    </p>
                    <div className="flex justify-center items-center gap-5">
                      <div className="flex justify-start items-center">
                        <select className="border-none">
                          <option value="">January</option>
                          <option value="">Febuary</option>
                          <option value="">March</option>
                        </select>
                      </div>
                      2024
                    </div>
                  </div>

                  <ul>
                    <li className="grid grid-cols-[30px_50px_1fr_auto] items-center border-b border-line pb-2 mb-2">
                      <span className="pr-5">1.</span>
                      <Trophy className="mr-5" stroke={"#FFD700"} />
                      <h4 className="mb-0">Abrigo, Charlene Kyle</h4>

                      <p className="mb-0 text-lg font-bold text-accent">
                        {formatInPeso(10000)}
                      </p>
                    </li>
                    <li className="grid grid-cols-[30px_50px_1fr_auto] items-center border-b border-line pb-2 mb-2">
                      <span className="pr-5">2.</span>
                      <Trophy className="mr-5" stroke={"#C0C0C0"} />
                      <h4 className="mb-0">Abrigo, Charlene Kyle</h4>

                      <p className="mb-0 text-lg font-bold text-accent">
                        {formatInPeso(10000)}
                      </p>
                    </li>

                    <li className="grid grid-cols-[30px_50px_1fr_auto] items-center border-b border-line pb-2 mb-2">
                      <span className="pr-5">3.</span>
                      <Trophy className="mr-5" stroke={"#CD7F32"} />
                      <h4 className="mb-0">Abrigo, Charlene Kyle</h4>

                      <p className="mb-0 text-lg font-bold text-accent">
                        {formatInPeso(10000)}
                      </p>
                    </li>

                    <li className="grid grid-cols-[30px_50px_1fr_auto] items-center border-b border-line pb-2 mb-2">
                      <span className="pr-5">3.</span>
                      <Trophy className="mr-5" stroke={"#CD7F32"} />
                      <h4 className="mb-0">Abrigo, Charlene Kyle</h4>

                      <p className="mb-0 text-lg font-bold text-accent">
                        {formatInPeso(10000)}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

export default Overview;
