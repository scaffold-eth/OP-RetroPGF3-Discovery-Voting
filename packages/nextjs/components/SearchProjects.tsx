import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProjectDocument } from "~~/models/Project";

const getSuggestions = (value: any, data: any) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : data.filter((item: any) => item.name.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = (suggestion: any) => suggestion.name;

const renderSuggestion = (suggestion: any) => {
  if (suggestion.isNoMatch) {
    return <div className="text-gray-500">No matches found</div>;
  }
  return <div>{suggestion.name}</div>;
};

interface Props {
  data: ProjectDocument[];
}
const SearchProjects: React.FC<Props> = ({ data }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);

  const theme = {
    suggestionsContainer: `${
      isInputFocused
        ? "absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        : "hidden"
    }`,
    suggestion: "p-2 hover:bg-gray-200 cursor-pointer",
  };
  return (
    <div className="relative w-full">
      <label className="w-full">
        <MagnifyingGlassIcon className="pointer-events-none absolute mr-2 w-8 h-6 top-2 pl-2 text-slate-400" />
        <Autosuggest
          theme={theme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => {
            let computedSuggestions = getSuggestions(value, data);
            if (computedSuggestions.length === 0) {
              computedSuggestions = [{ isNoMatch: true }];
            }
            setSuggestions(computedSuggestions);
          }}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            className: "input input-info input-bordered bg-secondary w-full min-w-full pl-10 rounded-md h-10",
            placeholder: "Search projects...",
            value,
            onChange: (event, { newValue }) => {
              setValue(newValue);
              setInputFocused(true);
              newValue.length === 0 && setInputFocused(false); // hides renderSuggestion styling which causes an anomaly in the UI underneath the search input element
            },
            onBlur: () => setInputFocused(false),
          }}
        />
      </label>
    </div>
  );
};

export default SearchProjects;
