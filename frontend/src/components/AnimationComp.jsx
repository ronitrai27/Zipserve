// import { useTheme } from "next-themes";

import { MagicCard } from "./ui/magic-card.jsx";
import { assets } from "../assets/assets.js";
export function MagicCardDemo() {
  //   const { theme } = useTheme();
  return (
    <div
      className={
        "flex h-[500px] w-[80%] flex-col gap-14 lg:h-[240px] lg:flex-row  mx-auto"
      }
    >
      <MagicCard className="cursor-pointer flex-col items-start justify-center   shadow-xl px-4">
        <div className="">
          <p className="flex items-center gap-2 text-2xl font-inter mb-3 ml-3 -mt-8">
            <assets.GiBullseye className="text-primary text-2xl" /> MISSION
          </p>
          <p className="text-sm text-center font-light font-outfit text-gray-600">
            Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Corrupti excepturi illo odit consequuntur illum
            atque.
          </p>
        </div>
      </MagicCard>
      <MagicCard className="cursor-pointer flex-col items-start justify-center   shadow-xl px-4">
        <div className="">
          <p className="flex items-center gap-2 text-2xl font-inter mb-3 ml-3">
            <assets.FaRegEye className="text-primary text-2xl" /> VISION
          </p>
          <ul className="text-sm text-center font-light font-outfit text-gray-600 space-y-2 ml-10">
            <li>• Quality Service Excellence</li>
            <li>• Customer-First Approach</li>
            <li>• Customer-First Approach</li>
            <li>• Quality Service Excellence</li>
          </ul>
        </div>
      </MagicCard>
         
    </div>
  );
}
