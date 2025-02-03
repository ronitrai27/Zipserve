import React from "react";
import { MagicCardDemo } from "../components/AnimationComp.jsx";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials.jsx";

const About = () => {
  return (
    <div className="bg-slate-50 h-screen overflow-y-auto scroll-smooth">
      <div className="my-0 h-full w-full">
        <MagicCardDemo />
      </div>
    </div>
  );
};

export default About;
