import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader } from "@/components/ui/sidebar";
import MainNav from "@/components/layout/main-nav";
import { Button } from "@/components/ui/button";
import { BookCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Verity Insights",
  description: "AI-powered content credibility analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("font-sans antialiased h-full bg-background", inter.variable)}>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" asChild>
                  <Link href="/">
                    <BookCheck className="size-6" />
                  </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tighter">Verity Insights</h1>
              </div>
            </SidebarHeader>
            <MainNav />
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-6 sticky top-0 z-30">
                <SidebarTrigger className="md:hidden" />
                <div className="flex-1">
                    {/* could add breadcrumbs here */}
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
