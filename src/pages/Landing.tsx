import React from "react";
import Spline from "@splinetool/react-spline";
import { LogoWhite } from "../assets/";

export const Landing = () => {
  return (
    <main>
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <Spline
                scene="https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode"
                className="w-screen h-screen absolute top-0 left-0 z-0"
            />
            <div className="font-[Geist] text-9xl text-white text-bold w-full h-full z-10 flex flex-col items-center justify-center gap-10">
                <img src={LogoWhite} className="" />

                <div className="flex flex-row items-center justify-center gap-10">
                    <p>June 20-22, 2025 </p>
                    <span>|</span>
                    <p>In-person</p>
                    <span>|</span>
                    <p>Waterloo, ON</p>
                </div>

                <p>
                    <a href="https://linktr.ee/spurhacks"
                        target="_blank">
                        Coming soon - stay tuned!
                    </a>
                </p>
            </div>
        </div>
    </main>
  );
}

