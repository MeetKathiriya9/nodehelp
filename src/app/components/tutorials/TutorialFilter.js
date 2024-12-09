"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import API_URL from "../apiConfig";

export function TutorialFilter({ onSearch, onFilterDifficulty, onFilterCategory }) {

  const [categories, setCategories] = useState([]); // List of categories
  const [categoryPage, setCategoryPage] = useState(1); // Current page
  const [loadingCategories, setLoadingCategories] = useState(false); // Loading state
  const [hasMoreCategories, setHasMoreCategories] = useState(true); // Whether more categories are available
  const [difficulties, setDifficulty] = useState([]); // List of categories
  
  const categoryDropdownRef = useRef(null); // Ref for the dropdown

  useEffect(() => {
    async function fetchCategories() {

      if (loadingCategories || !hasMoreCategories) return;

      setLoadingCategories(true);
      try {
        const response = await fetch(`${API_URL}/Category?page=${categoryPage}`);
        const data = await response.json();

        if (response.ok) {
          setCategories((prev) => {
            const newCategories = data.data.result;
            const uniqueCategories = [
              ...prev,
              ...newCategories.filter(
                (newCat) => !prev.some((existingCat) => existingCat._id === newCat._id)
              ),
            ];
            return uniqueCategories;
          });
          setHasMoreCategories(data.data.result.length > 0); // Check if there are more categories

          const Difficultyresponse = await fetch(`${API_URL}/Type`);
          const Difficultydata = await Difficultyresponse.json();
          if (Difficultyresponse.ok) { setDifficulty(Difficultydata.data.result) }

        } else {
          console.error(data.message || "Failed to load categories or difficulties.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, [categoryPage]);

  const handleCategoryScroll = () => {
    const dropdown = categoryDropdownRef.current;

    if (
      dropdown &&
      dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight - 10
    ) {
      setCategoryPage((prev) => prev + 1); // Load next page when scrolling to the bottom
    }
  };

  return (
    <div className="space-y-4 md:space-y-0 md:flex md:space-x-4 mb-8">
      <Input
        placeholder="Search tutorials..."
        onChange={(e) => onSearch(e.target.value)}
        className="md:w-1/3"
      />
      <Select onValueChange={onFilterDifficulty}>
        <SelectTrigger className="md:w-1/4">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectItem value="all">All Levels</SelectItem>

          {difficulties.map((difficulty) => (
            <SelectItem key={difficulty._id} value={difficulty.name}>
              {difficulty.name}
            </SelectItem>
          ))}
          {loadingCategories && (
            <div className="text-center py-2 text-sm">Loading more...</div>
          )}
        </SelectContent>
      </Select>

      <Select onValueChange={onFilterCategory}>
        <SelectTrigger className="md:w-1/4">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent

          ref={categoryDropdownRef}
          onScrollCapture={handleCategoryScroll}
          className="max-h-64 overflow-y-auto">

          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category._id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
          {loadingCategories && (
            <div className="text-center py-2 text-sm">Loading more...</div>
          )}
          {!hasMoreCategories && categories.length > 0 && (
            <div className="text-center py-2 text-sm text-gray-500">
              No more categories to load
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
