// import React, { useState } from "react";
// import { Lock, UserCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useAppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";
// function Login() {
//   const { setLoggedWorker, workerId, setWorkerId } = useAppContext();
//   // const [workerId, setWorkerId] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       if (!workerId || !password) {
//         toast.error("Please fill all fields");
//         return;
//       }

//       await axios.post(
//         "http://localhost:8080/api/login",
//         { workerId, password },
//         { withCredentials: true }
//       );

//       // Fetch worker details immediately after login
//       const { data } = await axios.get("http://localhost:8080/api/worker/me", {
//         withCredentials: true,
//       });

//       setLoggedWorker(data.worker); // Update the context immediately

//       // Show success toast
//       toast.success("Login successful!");
//       setWorkerId("");
//       setPassword("");
//       // Redirect after 2 seconds
//       setTimeout(() => {
//         navigate("/home");
//       }, 2000);
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || "Login failed";
//       toast.error(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   //-------------------------------------------------
//   //----------------------DEBUGGING LOGS
//   //----------------------------------------------------
//   // console.log("WORKER ID:", workerId);
//   // console.log("password:", password);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-800 to-primary flex items-center justify-center p-4">
//       <div className="w-full max-w-md font-inter">
//         {/* Card with enhanced glass effect */}
//         <div
//           className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl
//                       transform hover:scale-[1.01] transition-all duration-300
//                       border border-white/10"
//         >
//           {/* Logo and Header */}
//           <div className="text-center mb-8">
//             <div
//               className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4
//                           border-2 border-blue-500/30 animate-fade-in"
//             >
//               <UserCircle2 className="h-12 w-12 text-blue-400" />
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in">
//               Worker Portal
//             </h1>
//             <p className="text-blue-200 text-sm capitalize">
//               <span className="text-[15px] font-[400]">Zipserve </span>,
//               transperancy everywhere
//             </p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 animate-fade-in">
//               <AlertCircle className="h-5 w-5 text-red-400" />
//               <p className="text-red-400 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Worker ID Input */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="workerId"
//                 className="text-sm font-medium text-gray-300 block"
//               >
//                 Worker ID
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <UserCircle2 className="h-5 w-5 text-blue-300" />
//                 </div>
//                 <input
//                   id="workerId"
//                   type="text"
//                   value={workerId}
//                   onChange={(e) => setWorkerId(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 bg-black bg-opacity-20 border border-gray-600
//                            rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2
//                            focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                   placeholder="Enter your ID"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="password"
//                 className="text-sm font-medium text-gray-300 block"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-blue-300" />
//                 </div>
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pl-10 pr-12 py-3 bg-black bg-opacity-20 border border-gray-600
//                            rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2
//                            focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400
//                            hover:text-gray-300 transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center text-gray-300">
//                 <input
//                   type="checkbox"
//                   className="rounded border-gray-600 text-blue-500 shadow-sm focus:border-blue-300
//                            focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-black bg-opacity-20"
//                 />
//                 <span className="ml-2">Remember me</span>
//               </label>
//               <a
//                 href="#"
//                 className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium
//                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
//                        focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-[1.02]
//                        transition-all duration-300 shadow-lg shadow-blue-500/20
//                        disabled:opacity-50 disabled:cursor-not-allowed
//                        relative"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="mt-6 text-center space-y-2">
//             <p className="text-sm text-gray-200">
//               Having trouble logging in?{" "}
//               <a
//                 href="#"
//                 className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
//               >
//                 Contact Support
//               </a>
//             </p>
//             <p className="text-xs text-gray-200">
//               By logging in, you agree to our{" "}
//               <a
//                 href="#"
//                 className="text-blue-400 hover:text-blue-700 transition-colors duration-300"
//               >
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a
//                 href="#"
//                 className="text-blue-200 hover:text-blue-700 transition-colors duration-300"
//               >
//                 Privacy Policy
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
//---------------------------------------------------------------------
import React, { useState } from "react";
import { Lock, UserCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const { setLoggedWorker, workerId, setWorkerId } = useAppContext();
  // const [workerId, setWorkerId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!workerId || !password) {
        toast.error("Please fill all fields");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/login",
        { workerId, password },
        { withCredentials: true }
      );

      // Fetch worker details immediately after login
      const { data } = await axios.get("http://localhost:8080/api/worker/me", {
        withCredentials: true,
      });

      setLoggedWorker(data.worker); // Update the context immediately

      // Show success toast
      toast.success("Login successful!");
      setWorkerId("");
      setPassword("");
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Login failed";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  //-------------------------------------------------
  //----------------------DEBUGGING LOGS
  //----------------------------------------------------
  // console.log("WORKER ID:", workerId);
  // console.log("password:", password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md font-inter">
        {/* Card with enhanced modern design */}
        <div
          className="bg-white rounded-xl p-8 shadow-lg
                    border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4
                        shadow-inner transform hover:scale-105 transition-transform duration-300"
            >
              <UserCircle2 className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Worker Portal
            </h1>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Zipserve</span> - transparency
              everywhere
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md flex items-center gap-2 animate-pulse">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Worker ID Input */}
            <div className="space-y-1">
              <label
                htmlFor="workerId"
                className="text-sm font-medium text-gray-700 block"
              >
                Worker ID
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle2 className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  id="workerId"
                  type="text"
                  value={workerId}
                  onChange={(e) => setWorkerId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 
                           rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm
                           hover:bg-blue-50 hover:border-blue-300"
                  placeholder="Enter your ID"
                  required
                  autoComplete="username"
                  autoFocus
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                    Required
                  </span>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 block"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 
                           rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm
                           hover:bg-blue-50 hover:border-blue-300"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 
                           hover:text-blue-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-1">
                Password is case sensitive
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 
                           focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition-colors hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:ring-offset-2 transition-all transform hover:translate-y-[-1px]
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Having trouble logging in?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium hover:underline"
              >
                Contact Support
              </a>
            </p>
            <p className="text-xs text-gray-500">
              By logging in, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition-colors hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition-colors hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
