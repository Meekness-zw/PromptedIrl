import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "Prompted IRL — AI + Pop Culture + Real Life",
  description:
    "The weekly AI newsletter that actually makes sense. AI stories, tools, and takes for smart, curious people.",
  openGraph: {
    title: "Prompted IRL",
    description: "The weekly AI newsletter that actually makes sense.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
