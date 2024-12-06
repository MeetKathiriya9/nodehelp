// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X, Code, BookOpen, Terminal, MessageSquare, Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const { theme, setTheme } = useTheme();

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <nav className="bg-background border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">   
//             <Link href="/" className="flex items-center space-x-2">
//               <Terminal className="h-6 w-6" />
//               <span className="font-bold text-xl">DevHub</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/tutorials" className="flex items-center space-x-1 hover:text-primary">
//               <BookOpen className="h-4 w-4" />
//               <span>Tutorials</span>
//             </Link>
//             <Link href="/code-library" className="flex items-center space-x-1 hover:text-primary">
//               <Code className="h-4 w-4" />
//               <span>Code Library</span>
//             </Link>
//             <Link href="/forum" className="flex items-center space-x-1 hover:text-primary">
//               <MessageSquare className="h-4 w-4" />
//               <span>Forum</span>
//             </Link>
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2 rounded-md hover:bg-accent"
//             >
//               {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md hover:bg-accent"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link
//               href="/tutorials"
//               className="block px-3 py-2 rounded-md hover:bg-accent"
//               onClick={toggleMenu}
//             >
//               Tutorials
//             </Link>
//             <Link
//               href="/code-library"
//               className="block px-3 py-2 rounded-md hover:bg-accent"
//               onClick={toggleMenu}
//             >
//               Code Library
//             </Link>
//             <Link
//               href="/forum"
//               className="block px-3 py-2 rounded-md hover:bg-accent"
//               onClick={toggleMenu}
//             >
//               Forum
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Code, BookOpen, Terminal, MessageSquare, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state to check client-side rendering

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsClient(true); // Set to true after the component is mounted
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Prevent rendering theme button until client-side
  const themeButton = isClient && (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md hover:bg-accent"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">   
            <Link href="/" className="flex items-center space-x-2">
              <Terminal className="h-6 w-6" />
              <span className="font-bold text-xl">DevHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tutorials" className="flex items-center space-x-1 hover:text-primary">
              <BookOpen className="h-4 w-4" />
              <span>Tutorials</span>
            </Link>
            <Link href="/code-library" className="flex items-center space-x-1 hover:text-primary">
              <Code className="h-4 w-4" />
              <span>Code Library</span>
            </Link>
            <Link href="/forum" className="flex items-center space-x-1 hover:text-primary">
              <MessageSquare className="h-4 w-4" />
              <span>Forum</span>
            </Link>
            {themeButton}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-accent"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/tutorials"
              className="block px-3 py-2 rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              Tutorials
            </Link>
            <Link
              href="/code-library"
              className="block px-3 py-2 rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              Code Library
            </Link>
            <Link
              href="/forum"
              className="block px-3 py-2 rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              Forum
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
