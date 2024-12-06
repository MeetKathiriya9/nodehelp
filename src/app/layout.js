import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider.js';
import Navbar from './components/layout/Navbar.js';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DevHub - Developer Learning Platform',
  description: 'A comprehensive platform for learning backend development',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
