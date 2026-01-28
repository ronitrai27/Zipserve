import { createContext, useState } from "react";
import run from "../utils/gemini";
import { companyInfo } from "../utils/CompanyInfo";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentprompt, setrecentprompt] = useState("");
  const [prevprompt, setprevprompt] = useState([]);
  const [showresult, setshowresult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultdata, setresultdata] = useState("");
  const [opened, setOpened] = useState(false);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultdata((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    const fullPrompt = `${companyInfo}\n\nUser: ${input}\n\nPlease respond based on the provided company information and solve the user's query.`;
    setresultdata("");
    setloading(true);
    setshowresult(true);
    setrecentprompt(input);
    const responsevariable = await run(fullPrompt); // calling gemini
    let responseArray = responsevariable.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br>");
    // setresultdata(newResponse2);
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setloading(false);
    setinput("");
  };

  //   onSent("What is AI");

  const contextValue = {
    prevprompt,
    setprevprompt,
    onSent,
    setrecentprompt,
    recentprompt,
    showresult,
    // setshowresult,
    loading,
    resultdata,
    input,
    setinput,
    opened,
    setOpened,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
