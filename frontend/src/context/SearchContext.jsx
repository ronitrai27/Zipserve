// import { createContext, useState, useContext, useEffect } from "react";
// // storing the Searches to local storage for persistent.
// const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//   const [recentSearch, setRecentSearch] = useState(() => {
//     // Load from localStorage on first render
//     const savedSearches = localStorage.getItem("recentSearches");
//     return savedSearches ? JSON.parse(savedSearches) : [];
//   });

//   useEffect(() => {
//     // Save to localStorage whenever recentSearch changes
//     localStorage.setItem("recentSearches", JSON.stringify(recentSearch));
//   }, [recentSearch]);

//   return (
//     <SearchContext.Provider value={{ recentSearch, setRecentSearch }}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export const useSearch = () => useContext(SearchContext);

// SESIION STORAGE -------------------------------------------------
// can be used to save data only during duration of page duration.
import { createContext, useState, useContext, useEffect } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [recentSearch, setRecentSearch] = useState(() => {
    // Load from sessionStorage on first render
    const savedSearches = sessionStorage.getItem("recentSearches");
    return savedSearches ? JSON.parse(savedSearches) : [];
  });

  useEffect(() => {
    // Save to sessionStorage whenever recentSearch changes
    sessionStorage.setItem("recentSearches", JSON.stringify(recentSearch));
  }, [recentSearch]);

  return (
    <SearchContext.Provider value={{ recentSearch, setRecentSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
