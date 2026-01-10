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
          colorPrimary: "#8b5cf6",
          colorBackground: "transparent",
          colorInputBackground: "rgba(255, 255, 255, 0.05)",
          colorInputText: "#e5e7eb",
          borderRadius: "0.75rem",
          fontFamily: fontSans.style.fontFamily,
        },
        elements: {
          // Main card with glassmorphism
          card: "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl",
          
          // Header styling
          headerTitle: "text-gray-100 font-bold text-2xl",
          headerSubtitle: "text-gray-400",
          
          // Form elements
          formButtonPrimary: 
            "bg-gradient-to-r from-primary to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50",
          
          formFieldInput: 
            "bg-white/5 border-white/10 text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300",
          
          formFieldLabel: "text-gray-300",
          
          // Footer links
          footerActionLink: "text-primary hover:text-purple-400 transition-colors",
          
          // Social buttons
          socialButtonsBlockButton: 
            "border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105",
          
          socialButtonsBlockButtonText: "text-gray-100",
          
          // Divider
          dividerLine: "bg-white/10",
          dividerText: "text-gray-400",
          
          // Input styling
          formFieldInputShowPasswordButton: "text-gray-400 hover:text-gray-200",
          
          // Alert/Error styling
          formFieldErrorText: "text-red-400",
          
          // Modal backdrop
          modalBackdrop: "backdrop-blur-sm",
          
          // User button (if used)
          userButtonPopoverCard: "bg-black/80 backdrop-blur-xl border border-white/10",
          userButtonPopoverActionButton: "hover:bg-white/10 transition-all",
          
          // Animation classes
          rootBox: "animate-in fade-in slide-in-from-bottom-4 duration-500",
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
