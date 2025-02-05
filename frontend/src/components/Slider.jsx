import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const minDistance = 10;

export default function MinimumDistanceSlider({ value, setValue }) {
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 150 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <>
      <Box sx={{ width: 200 }}>
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          value={value}
          onChange={handleChange2}
          valueLabelDisplay="auto"
          disableSwap
          min={0}
          max={150}
        />
      </Box>
      <p className="text-center font-extralight text-[12px]">
        Selected Range: {value[0]} - {value[1]}
      </p>
    </>
  );
}
