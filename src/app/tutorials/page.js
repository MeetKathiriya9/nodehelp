"use client";

import { useEffect, useState } from "react";
import { TutorialCard } from "../components/tutorials/TutorialCard.js";
import { TutorialFilter } from "../components/tutorials/TutorialFilter.js";
import API_URL from "../components/apiConfig";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TutorialsPage() {
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("all");
    const [category, setCategory] = useState("all");
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false, // Ensures animations run on reload
        });
      }, []);
      
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const tutorialsRes = await fetch(`${API_URL}/Tutorials?page=-2`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!tutorialsRes.ok) {
                    throw new Error("Failed to fetch tutorials");
                }

                const tutorialsData = await tutorialsRes.json();
                setTutorials(tutorialsData.data || []);

            } catch (err) {
                console.error(err); // Log the error for debugging
                setError(err.message || "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredTutorials = tutorials.filter((tutorial) => {
        const matchesSearch =
            tutorial.title.toLowerCase().includes(search.toLowerCase()) ||
            tutorial.description.toLowerCase().includes(search.toLowerCase());
        const matchesDifficulty =
            difficulty === "all" || tutorial.difficulty.name === difficulty;
        const matchesCategory =
            category === "all" || tutorial.category.name === category;

        return matchesSearch && matchesDifficulty && matchesCategory;
    });

    return (
        <div className="container mx-auto px-4 py-8" data-aos="fade-up">
            <h1 className="text-4xl font-bold mb-8" data-aos="zoom-in">Tutorials</h1>

            {error && <p className="text-red-600">{error}</p>}

            <TutorialFilter
                onSearch={setSearch}
                onFilterDifficulty={setDifficulty}
                onFilterCategory={setCategory}
            />
            {loading ? (
                <p>Loading tutorials...</p>
            ) : (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up"
                    data-aos-delay="200">
                        {filteredTutorials.length > 0 ? (
                            filteredTutorials.map((tutorial) => (
                                
                                <TutorialCard
                                 data-aos="fade-up" data-aos-delay="300"
                                    key={tutorial._id}
                                    tutorial={{
                                        ...tutorial,
                                        category: tutorial.category.name,
                                        difficulty: tutorial.difficulty.name,
                                    }}
                                />
                            ))
                        ) : (
                            <p data-aos="fade-in">
                                No Tutorials found for "{search}" in "{category}" at "
                                {difficulty}" level
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
