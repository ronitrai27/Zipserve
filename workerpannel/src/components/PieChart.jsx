// import * as React from "react";
// import { PieChart } from "@mui/x-charts/PieChart";

// const PieActiveArc = ({ totalEarnings }) => {
//   const workerRevenue = totalEarnings * 0.15;

//   return (
//     <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
//       <h3 className="text-lg font-semibold text-gray-700">
//         Earnings Breakdown
//       </h3>

//       <PieChart
//         series={[
//           {
//             data: [
//               {
//                 label: "Total Earnings",
//                 value: totalEarnings,
//                 color: "#4CAF50",
//               },
//               {
//                 label: "Worker Revenue (15%)",
//                 value: workerRevenue,
//                 color: "#FF9800",
//               },
//             ],
//             highlightScope: { fade: "global", highlight: "item" },
//             faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
//           },
//         ]}
//         height={250}
//       />

//       <div className="flex justify-between w-full mt-3 text-sm">
//         <div className="flex items-center gap-2">
//           <span className="w-3 h-3 bg-green-500 rounded-full"></span>
//           <p>Total Earnings: ₹{totalEarnings}</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
//           <p>Worker Revenue: ₹{workerRevenue.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PieActiveArc;
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieActiveArc = ({ totalEarnings }) => {
  const workerRevenue = totalEarnings * 0.15;

  return (
    <div className="w-40 h-40">
      <PieChart
        series={[
          {
            data: [
              { value: totalEarnings, color: "#3b75ef" },
              { value: workerRevenue, color: "#FF9800" },
            ],
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 20, additionalRadius: -20, color: "gray" },
          },
        ]}
        width={180}
        height={180}
      />
    </div>
  );
};

export default PieActiveArc;
