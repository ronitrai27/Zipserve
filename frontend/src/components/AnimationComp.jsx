import { MagicCard } from "./ui/magic-card.jsx";
import { assets } from "../assets/assets.js";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials.jsx";
import { cn } from "../lib/utils.js";
import TextPressure from "../TextAnimations/TextPressure/TextPressure.jsx";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  .wrapper {
    display: inline-flex;
    list-style: none;
    height: 120px;
    width: 100%;
    padding-top: 40px;
    font-family: "Poppins", sans-serif;
    justify-content: center;
  }

  .wrapper .icon {
    position: relative;
    background: #fff;
    border-radius: 50%;
    margin: 10px;
    width: 50px;
    height: 50px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .tooltip {
    position: absolute;
    top: 0;
    font-size: 14px;
    background: #fff;
    color: #fff;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .tooltip::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background: #fff;
    bottom: -3px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .icon:hover .tooltip {
    top: -45px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .wrapper .icon:hover span,
  .wrapper .icon:hover .tooltip {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
  }

  .wrapper .facebook:hover,
  .wrapper .facebook:hover .tooltip,
  .wrapper .facebook:hover .tooltip::before {
    background: #1877f2;
    color: #fff;
  }

  .wrapper .twitter:hover,
  .wrapper .twitter:hover .tooltip,
  .wrapper .twitter:hover .tooltip::before {
    background: #1da1f2;
    color: #fff;
  }

  .wrapper .instagram:hover,
  .wrapper .instagram:hover .tooltip,
  .wrapper .instagram:hover .tooltip::before {
    background: #e4405f;
    color: #fff;
  }
`;

export function MagicCardDemo() {
  return (
    <div className="full flex items-center justify-center ">
      <MagicCard className="cursor-pointer flex-col items-start justify-center shadow-lg px-4 mb-8 ">
        <div className="text-area text-center">
          <h1 className="font-outfit text-5xl">
            <span className="font-outfit text-primary text-4xl font-semibold">
              Welcome To{" "}
            </span>
            Zipserve
          </h1>
          <hr className="w-[24%] mx-auto border-[.8px] border-gray-300 shadow-lg my-3" />
          <p className="text-[1.1rem] font-light tracking-wide leading-snug text-gray-800">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
            veniam libero fugit distinctio, obcaecati ipsam, quas repudiandae
            laudantium veritatis, voluptas ad cupiditate eaque placeat
            consequuntur alias esse unde ut inventore? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ipsam, praesentium.
          </p>
        </div>
        {/* <div className="my-5">
        <div className="flex flex-col items-center">
          <p className="flex items-center gap-2 text-2xl font-inter mb-3">
            <assets.GiBullseye className="text-primary text-2xl" /> MISSION
          </p>
          <p className="text-sm text-center font-light font-outfit text-gray-600">
            Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Corrupti excepturi illo odit consequuntur illum atque.
          </p>
        </div>
        </div> */}

        {/* <div className="my-5">
        <div className="flex flex-col items-center">
          <p className="flex items-center gap-2 text-2xl font-inter mb-3">
            <assets.FaRegEye className="text-primary text-2xl" /> VISION
          </p>
          <ul className="text-sm text-center font-light font-outfit text-gray-600 space-y-2">
            <li key="1">• Quality Service Excellence</li>
            <li key="2">• Customer-First Approach</li>
            <li key="3">• Innovation and Improvement</li>
            <li key="4">• Community Engagement</li>
          </ul>
        </div>
        </div> */}

        <div className="my-5">
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Why Choose ZipServe?
        </h2> */}

          {/* <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Verified Professionals</h3>
            <p className="text-gray-600">All our service providers undergo thorough background checks</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Quick Response</h3>
            <p className="text-gray-600">Fast and efficient service delivery when you need it</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Satisfaction Guaranteed</h3>
            <p className="text-gray-600">Your satisfaction is our top priority</p>
          </div>
        </div> */}
        </div>
        <FeaturesSectionDemo />
        <AnimatedTestimonialsDemo />

        {/* <-------------------Button---------------------> */}
        <div className="my-0">
          <StyledWrapper>
            <ul className="wrapper">
              <li className="icon facebook">
                <span className="tooltip">Facebook</span>
                <svg
                  viewBox="0 0 320 512"
                  height="1.2em"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </li>
              <li className="icon twitter">
                <span className="tooltip">Twitter</span>
                <svg
                  height="1.8em"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  className="twitter"
                >
                  <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" />
                </svg>
              </li>
              <li className="icon instagram">
                <span className="tooltip">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.2em"
                  fill="currentColor"
                  className="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </li>
            </ul>
          </StyledWrapper>
        </div>
        <div style={{ position: "relative", height: "450px" }}>
          <TextPressure
            text="Zipserve"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#000000"
            strokeColor="#ff0000"
            minFontSize={24}
          />
        </div>
        <div className="w-full h-[.5rem] bg-transparent"></div>
      </MagicCard>
    </div>
  );
}

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Ronit Rai",
      designation: "Head",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Sandeep M",
      designation: "UI & Ux Designer, Animation",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Riya",
      designation: "Backend developer",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "MISSION",
      description:
        "Empowering businesses with seamless delivery solutions and exceptional service.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Fast Delivery",
      description:
        "Experience lightning-fast delivery with our optimized logistics network.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Competitive Pricing",
      description:
        "Transparent, affordable rates with no hidden fees. Get the best value for your deliveries.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Real-time Tracking",
      description:
        "Track your packages in real-time with our advanced tracking system.",
      icon: <IconCloud />,
    },
    {
      title: "Secure Handling",
      description:
        "Your packages are handled with utmost care and security throughout transit",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Support",
      description:
        "Our dedicated support team is available round the clock to assist you.",
      icon: <IconHelp />,
    },
    {
      title: "Satisfaction Guarantee",
      description:
        "We're committed to your satisfaction with our reliable delivery service.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Wide Coverage",
      description:
        "Extensive network coverage to serve you across multiple locations",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}
const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col p-6 relative group/feature bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
        "border border-neutral-200/50 dark:border-neutral-800",
        "transform hover:-translate-y-2 hover:border-primary/30",
        "backdrop-blur-sm bg-opacity-90"
      )}
    >
      <div className="mb-4 relative z-10 text-primary w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 group-hover/feature:bg-primary/20 transition-colors duration-300">
        {icon}
      </div>
      <div className="text-lg font-semibold mb-3 relative z-10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary/30 group-hover/feature:bg-primary/60 group-hover/feature:h-6 transition-all duration-300" />
        <span className="group-hover/feature:translate-x-3 transition-all duration-300 inline-block text-neutral-800 dark:text-neutral-100 pl-3">
          {title}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 group-hover/feature:text-neutral-700 dark:group-hover/feature:text-neutral-200 transition-colors duration-300">
        {description}
      </p>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 rounded-xl opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default TextPressure;
