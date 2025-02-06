import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BorderBeam } from "../components/ui/border-beam.jsx";
import { useSearch } from "../context/SearchContext.jsx";
const ServiceSearch = () => {
  const navigate = useNavigate();
  const { recentSearch, setRecentSearch } = useSearch();
  const [input, setInput] = useState(""); // Track user input
  const [suggestions, setSuggestions] = useState([]); // Track suggestion results
  const [bestMatch, setBestMatch] = useState(null); // Track the best match result
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility

  // Fetch suggestions from the API
  useEffect(() => {
    if (input.trim()) {
      setIsLoading(true);
      setShowDropdown(true); // Show dropdown when input is not empty
      axios
        .get(`http://localhost:8080/api/suggestProfessional?service=${input}`)
        .then((response) => {
          setBestMatch(response.data.best_match); // Set the best match
          setSuggestions(response.data.suggestions); // Set other suggestions
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
          setIsLoading(false);
        });
    } else {
      setBestMatch(null); // Clear best match when input is empty
      setSuggestions([]); // Clear suggestions when input is empty
      setShowDropdown(false); // Hide dropdown when input is empty
    }
  }, [input]);
  // typing -----------------

  const placeholderTexts = [
    "Search AC Repair...",
    "Search Pipe Leakage...",
    "Search Bathroom Cleaning...",
  ];
  const [placeholder, setPlaceholder] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let typingInterval;

    if (isTyping) {
      if (charIndex < placeholderTexts[currentTextIndex].length) {
        typingInterval = setInterval(() => {
          setPlaceholder(
            placeholderTexts[currentTextIndex].substring(0, charIndex + 1)
          );
          setCharIndex((prev) => prev + 1);
        }, 200);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setCharIndex(0);
          setPlaceholder("");
          setCurrentTextIndex((prev) => (prev + 1) % placeholderTexts.length);
        }, 2000);
      }
    }

    return () => {
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [charIndex, currentTextIndex, isTyping]);

  // Handle suggestion click
  const handleSuggestionClick = (selectedService, professional) => {
    setRecentSearch((prevSearches) => [...prevSearches, selectedService]); // Add search to recent searches
    setInput(""); // Clear the input field
    setBestMatch(null); // Clear suggestions after selection
    setSuggestions([]); // Clear suggestions
    setShowDropdown(false); // Hide the dropdown
    navigate(`/workers/${professional}`); // Navigate to the professional's page
  };

  return (
    <div className="relative rounded-full font-inter">
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-[22rem]  px-5 py-3  focus:shadow-md rounded-full focus:outline-none bg-stone-100 text-gray-800 text-sm font-light "
      />
      <BorderBeam size={300} duration={18} delay={12} />

      {/* Dropdown for suggestions */}
      {showDropdown && input && (
        <div className="absolute w-full bg-white shadow-lg rounded-md mt-1 z-50">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : (
            <>
              {/* Highly Recommended */}
              {bestMatch && (
                <div
                  className="px-4 py-2 text-sm text-gray-800 flex items-center justify-between border-b cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    handleSuggestionClick(
                      bestMatch.service,
                      bestMatch.professional
                    )
                  }
                >
                  <span className="text-gray-600 text-[15px] capitalize">
                    {bestMatch.service}
                  </span>
                  <span className="font-semibold text-[14px] text-primary">
                    Highly Recommended
                  </span>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 ? (
                <div>
                  <div className="px-4 py-2 text-sm text-primary capitalize">
                    Other Suggestions:
                  </div>
                  <ul>
                    {suggestions.map((item, index) => (
                      <li
                        key={index}
                        className="px-8 py-2 text-[14px] text-gray-800 cursor-pointer hover:bg-gray-100 capitalize hover:scale-105 transition-all duration-200 "
                        onClick={() =>
                          handleSuggestionClick(item.service, item.professional)
                        }
                      >
                        {item.service}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="px-4 py-2 text-primary">
                  No suggestions found
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceSearch;
