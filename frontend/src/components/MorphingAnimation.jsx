import { MorphingText } from "../components/ui/morphing-text.jsx";

const texts = [
  "Carpenter",
  "Plumber",
  "Electrician",
  "Painter",
  "Cleaner",
  "Gardener",
  "Technician",
  ,
];

export function MorphingTextDemo() {
  return <MorphingText texts={texts} />;
}
