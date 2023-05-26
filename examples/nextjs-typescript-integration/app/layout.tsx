import {
  ArrowTopRightOnSquareIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Carbon Retirement API Demo",
  description:
    "Retire carbon from any application. Powered by KlimaDAO and Carbonmark.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "h-full min-h-screen flex flex-col"
        )}
      >
        <header className="relative">
          <nav aria-label="Top">
            {/* Secondary navigation */}
            <div className="bg-white shadow-sm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="lg:flex lg:flex-1 lg:items-center">
                    <Link href="/">
                      <span className="sr-only">Home</span>
                      <HomeIcon className="w-8" />
                    </Link>
                  </div>
                  <Link
                    href="https://carbonmark.com/retirements/0xa17B52d5E17254B03dFdf7b4dfF2fc0C6108FaAc"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="flex items-center rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                      View Retirements{" "}
                      <ArrowTopRightOnSquareIcon className="w-5 ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="flex-grow flex flex-col bg-gray-50">{children}</div>
        <footer className="mt-auto bg-white">
          <div className="border-t border-gray-100 py-10 text-center">
            <p className="text-sm text-gray-500">
              Powered by{" "}
              <a
                href="https://klimadao.finance"
                className="text-green-700 font-semibold"
              >
                KlimaDAO
              </a>{" "}
              &{" "}
              <a
                href="https://carbonmark.com"
                className="text-blue-700 font-semibold"
              >
                Carbonmark
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
