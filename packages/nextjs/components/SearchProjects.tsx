import React, { useState } from "react";
import Link from "next/link";
import debounce from "lodash.debounce";
import Autosuggest from "react-autosuggest";
import useSWR from "swr";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ListDocument } from "~~/models/List";
import { ProjectDocument } from "~~/models/Project";
import { fetcher } from "~~/utils/fetcher";

interface SearchResult {
  searchData: ProjectDocument[] | ListDocument[];
}

const SearchProjects: React.FC = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);
  const [cachedSearch, setCachedSearch] = useState<any>({}); // local cache

  const { data: initialData } = useSWR<SearchResult[]>(`/api/search?limit=50`, fetcher);

  const fetchData = async (searchTerm: string) => {
    if (!searchTerm.length) return [];
    // Check the cache first
    if (cachedSearch && cachedSearch[searchTerm]) {
      return cachedSearch[searchTerm];
    }
    try {
      const data = await fetch(`/api/search?term=${searchTerm}`);
      const jsonData = await data.json();
      setCachedSearch({ ...cachedSearch, [searchTerm]: jsonData });
      return jsonData;
    } catch (e) {
      console.log("ERR_FETCHING_DATA:", e);
    }
  };
  const renderSuggestion = (suggestion: any) => {
    if (suggestion.isNoMatch && suggestion.isLoading) return <div className="text-gray-500">Searching...</div>;
    if (suggestion.isNoMatch) {
      return <div className="text-gray-500">No matches found</div>;
    }
    return (
      <Link href={`${suggestion.type === "project" ? "/projects" : "/lists"}/${suggestion._id}`}>
        <div>
          {suggestion.name}
          {suggestion.type === "project" ? (
            <span className="ml-2 badge badge-warning">project</span>
          ) : (
            <span className="ml-2 badge badge-warning">list</span>
          )}
        </div>
      </Link>
    );
  };

  const getSuggestions = (value: any, data: any) => {
    const inputValue = value.trim().toLowerCase();
    return inputValue.length === 0 ? [] : data.filter((item: any) => item.name.toLowerCase().includes(inputValue));
  };

  const getSuggestionValue = (suggestion: any) => suggestion.name;

  const debounceOnSuggestionsFetchRequested = debounce(async ({ value }) => {
    if (!initialData) {
      setSuggestions([]);
      return;
    }

    let computedSuggestions = getSuggestions(value, initialData);
    if (computedSuggestions.length === 0) {
      computedSuggestions = [{ isNoMatch: true, isLoading: true }];
      setSuggestions(computedSuggestions);
      const serverSearchData = await fetchData(value);
      computedSuggestions = getSuggestions(value, serverSearchData);
      computedSuggestions.length === 0 && (computedSuggestions = [{ isNoMatch: true, isLoading: false }]);
    }
    setSuggestions(computedSuggestions);
  }, 500);

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
          onSuggestionsFetchRequested={debounceOnSuggestionsFetchRequested}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            className: "input input-info input-bordered bg-secondary w-full min-w-full pl-10 rounded-md h-10",
            placeholder: "Search projects and lists...",
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
