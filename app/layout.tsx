import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/common/header";
import Footer from "@/components/ui/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
// import { LoadingProvider } from "@/components/loading-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Adiya | PDF Summary Generator",
  description: "Easily generate PDF summaries with Adiya.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#000000", /* Clean black */
          colorBackground: "white",
          colorInputBackground: "transparent",
          colorInputText: "#111827",
          borderRadius: "0.75rem",
          fontFamily: fontSans.style.fontFamily,
        },
        elements: {
          card: "bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-2xl rounded-[2rem]",
          headerTitle: "text-gray-900 dark:text-gray-100 font-extrabold text-2xl tracking-tight",
          headerSubtitle: "text-gray-500 dark:text-gray-400 font-medium",
          formButtonPrimary: 
            "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-all font-bold duration-300 rounded-full h-12",
          formFieldInput: 
            "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-gray-100 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all duration-200 rounded-xl h-11 px-4",
          formFieldLabel: "text-gray-700 dark:text-gray-300 font-semibold mb-1",
          footerActionLink: "text-black dark:text-white font-bold hover:text-gray-700 transition-colors",
          socialButtonsBlockButton: 
            "border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all duration-300 rounded-xl h-12",
          socialButtonsBlockButtonText: "text-gray-700 dark:text-gray-300 font-semibold",
          dividerLine: "bg-gray-200 dark:bg-zinc-800",
          dividerText: "text-gray-500 dark:text-gray-400 font-medium",
          formFieldInputShowPasswordButton: "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
          formFieldErrorText: "text-red-500 font-medium text-sm mt-1",
          modalBackdrop: "bg-black/40 backdrop-blur-sm",
          userButtonPopoverCard: "bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden",
          userButtonPopoverActionButton: "hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors py-3 w-full text-left",
          userButtonPopoverActionButtonText: "text-gray-700 dark:text-gray-300 font-medium",
          userButtonPopoverActionButtonIcon: "text-gray-500 dark:text-gray-400",
          userButtonPopoverFooter: "bg-gray-50 dark:bg-zinc-900/50",
        },
      }}
    >
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${fontSans.className} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {/* <LoadingProvider> */}
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Header />
          </header>
          <div>
          <main className=" relative flex-grow z-10 ">{children}</main>
          </div>
          <Toaster />
          <footer className="relative z-10">
          <Footer />
          </footer>
        </div>
        {/* </LoadingProvider> */}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
