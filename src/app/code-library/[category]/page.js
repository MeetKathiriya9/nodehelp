"use client";

import { useEffect, useRef, useState } from "react";
import { CodeSnippetCard } from "../../components/code-library/CodeSnippetCard.js";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import API_URL from "../../components/apiConfig.js";
import Masonry from "react-masonry-css"; // Import Masonry component
import { usePathname, useRouter } from "next/navigation"; // Import from next/navigation

export default function CodeLibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [tutorials, setTutorials] = useState([]);
  const [libraries, setLibrary] = useState([]);
  const [categories, setCategories] = useState([]); // List of categories
  const [categoryPage, setCategoryPage] = useState(1); // Current page
  const [loadingCategories, setLoadingCategories] = useState(false); // Loading state
  const [hasMoreCategories, setHasMoreCategories] = useState(true); // Whether more categories are available
  const categoryDropdownRef = useRef(null); // Ref for the dropdown

  const pathname = usePathname(); // Get the current path
  const tutorialID = pathname?.split("/").pop();

  useEffect(() => {
    if (tutorialID) {

      const fetchData = async () => {
        try {

          const TutorialRes = await fetch(`${API_URL}/Tutorials?id=${tutorialID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!TutorialRes.ok) {
            console.error('Error Status:', TutorialRes.status);
            throw new Error("Failed to fetch tutorials");
          }
          const TutorialData = await TutorialRes.json();
          setTutorials(TutorialData.data || []);

          const libraryRes = await fetch(`${API_URL}/Library?page=-2`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!libraryRes.ok) { throw new Error("Failed to fetch code snnipets"); }
          const libraryData = await libraryRes.json();
          const filteredSnippetsofLibrary = libraryData.data.filter(
            (snippet) => snippet.tutorial._id == tutorialID // Filter by tutorialId
          );
          setLibrary(filteredSnippetsofLibrary || []);

        } catch (err) {
          console.error(err); // Log the error for debugging
        }
      };
      fetchData();
    }
  }, [tutorialID]);


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

  const filteredSnippets = libraries.filter((snippet) => {
    const matchesSearch = snippet.title?.toLowerCase().includes(search.toLowerCase()) ||
      snippet.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || snippet.category?.name === category;

    return matchesSearch && matchesCategory;
  });

  // Masonry Breakpoints
  const breakpointColumnsObj = {
    default: 2, // Default column count
    768: 1,     // Columns for screens smaller than 768px
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{tutorials.title}</h1>
      <p className="text-xl mb-8 text-gray-500">{tutorials.description}</p>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search code snippets..."
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/2"
        />
        <Select onValueChange={setCategory}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent

            ref={categoryDropdownRef}
            onScrollCapture={handleCategoryScroll}
            className="max-h-64 overflow-y-auto"
          >

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

      <Masonry
        breakpointCols={breakpointColumnsObj} // Define responsive columns
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredSnippets?.length > 0 ? (
          filteredSnippets.map((snippet) => (
            <CodeSnippetCard key={snippet._id} snippet={snippet} />
          ))
        ) : (
          <p> No Tutorials found for "{search}" in "{category}"</p>
        )}
      </Masonry>
    </div>
  );
}
