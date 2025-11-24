"use client";

import { ChevronDown, Search, Star, Bell, Wallet, User, Menu } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

const navLinks = [
    { name: "Discover", href: "#", active: false },
    { name: "Pulse", href: "#", active: true },
    { name: "Trackers", href: "#", active: false },
    { name: "Perpetuals", href: "#", active: false },
    { name: "Yield", href: "#", active: false },
    { name: "Vision", href: "#", active: false },
    { name: "Portfolio", href: "#", active: false },
    { name: "Rewards", href: "#", active: false },
]

const AxiomLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[36px] h-[36px] sm:w-[36px] sm:h-[36px] text-foreground">
        <g clipPath="url(#clip0_88_28967)">
            <path d="M24.1384 17.3876H11.8623L18.0001 7.00012L24.1384 17.3876Z" fill="currentColor"></path>
            <path d="M31 29.0003L5 29.0003L9.96764 20.5933L26.0324 20.5933L31 29.0003Z" fill="currentColor"></path>
        </g>
        <defs><clipPath id="clip0_88_28967"><rect width="26" height="22" fill="white" transform="translate(5 7)"></rect></clipPath></defs>
    </svg>
)

const AxiomText = () => (
     <svg width="102" height="21" viewBox="0 0 103 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[102px] hidden 2xl:block text-foreground">
        <path d="M56.1914 18.3745V1.33447H59.7434L64.8074 15.3265L69.8714 1.33447H73.4234V18.3745H70.8314V5.89447L66.2474 18.3505H63.3674L58.7834 5.89447V18.3745H56.1914Z" fill="currentColor"></path>
        <path d="M45.9362 18.7584C40.9922 18.7584 37.9922 15.3984 37.9922 9.87844C37.9922 4.35844 40.9922 0.950439 45.9362 0.950439C50.9282 0.950439 53.9042 4.35844 53.9042 9.87844C53.9042 15.3984 50.9282 18.7584 45.9362 18.7584ZM45.9362 16.3824C49.2482 16.3824 51.2162 13.9824 51.2162 9.87844C51.2162 5.77444 49.2482 3.32644 45.9362 3.32644C42.6482 3.32644 40.6802 5.77444 40.6802 9.87844C40.6802 13.9824 42.6482 16.3824 45.9362 16.3824Z" fill="currentColor"></path>
        <path d="M33.1055 18.3745V1.33447H35.6975V18.3745H33.1055Z" fill="currentColor"></path>
        <path d="M16.9023 18.3745L22.5663 9.83047L16.9503 1.33447H19.9983L24.1983 7.81447L28.3263 1.33447H31.3503L25.7343 9.78247L31.4223 18.3745H28.3743L24.1503 11.7985L19.9263 18.3745H16.9023Z" fill="currentColor"></path>
        <path d="M0.980469 18.3745L7.12447 1.33447H10.4125L16.5565 18.3745H13.7965L12.2365 13.9345H5.27647L3.74047 18.3745H0.980469ZM6.09247 11.5825H11.4445L8.75647 3.80647L6.09247 11.5825Z" fill="currentColor"></path>
        <path d="M99.2929 18.6624C97.0311 18.6624 95.5703 16.9661 95.5703 14.3116C95.5703 11.6571 97.0311 9.96069 99.2929 9.96069C101.539 9.96069 103 11.6571 103 14.3116C103 16.9661 101.539 18.6624 99.2929 18.6624ZM99.2929 17.6729C100.926 17.6729 101.916 16.4006 101.916 14.3116C101.916 12.2225 100.926 10.9502 99.2929 10.9502C97.6437 10.9502 96.6541 12.2225 96.6541 14.3116C96.6541 16.4006 97.6437 17.6729 99.2929 17.6729Z" fill="currentColor"></path>
        <path d="M90.9961 18.4742V10.1494H91.8914L91.9385 11.7987C92.2684 10.6835 92.9438 10.1494 94.0276 10.1494H94.7501V11.1547H93.9962C92.7396 11.1547 92.0328 12.0186 92.0328 13.4008V18.4742H90.9961Z" fill="currentColor"></path>
        <path d="M81.2461 18.4741V7.32202H85.1572C87.6075 7.32202 89.0525 8.57859 89.0525 10.6519C89.0525 12.7253 87.6075 13.9818 85.1572 13.9818H82.3142V18.4741H81.2461ZM82.3142 12.9452H85.1572C86.9792 12.9452 87.9216 12.1441 87.9216 10.6519C87.9216 9.14405 86.9792 8.35869 85.1572 8.35869H82.3142V12.9452Z" fill="currentColor"></path>
    </svg>
)

const DesktopNav = () => (
    <div className="hidden sm:flex flex-1 items-center gap-4">
        <div className="hidden sm:flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-row gap-1">
                {navLinks.map(link => (
                    <Button key={link.name} variant={link.active ? "secondary" : "ghost"} asChild className={`text-sm font-medium text-nowrap rounded-sm h-8 px-2 xl:px-3 ${link.active ? 'text-primary' : 'text-foreground'}`}>
                        <a href={link.href}>{link.name}</a>
                    </Button>
                ))}
            </div>
        </div>
        <div className="flex-1" />
        <Button variant="outline" className="h-8 rounded-full border-border/70 bg-transparent hidden 2xl:flex">
            <Search className="h-4 w-4 mr-2" />
            Search by token or CA...
            <span className="ml-4 border border-border/70 rounded-md px-2 py-0.5 text-xs">/</span>
        </Button>
         <Button variant="outline" className="h-8 w-8 p-0 rounded-full border-border/70 bg-transparent flex 2xl:hidden">
            <Search className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="h-8 rounded-full border-border/70 bg-transparent" style={{ borderColor: 'rgba(20, 241, 149, 0.1)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M3.55554 6.22221L7.99998 3.55554L12.4444 6.22221L7.99998 8.88888L3.55554 6.22221Z" fill="#14F195"></path><path d="M8 9.6111L12.4444 6.94443V8.87777L8 11.5444L3.55556 8.87777V6.94443L8 9.6111Z" fill="#14F195"></path><path d="M8 12.2667L12.4444 9.6V11.5333L8 14.2L3.55556 11.5333V9.6L8 12.2667Z" fill="#14F195"></path></svg>
            SOL
            <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
    </div>
);

const MobileNav = () => (
    <div className="flex sm:hidden items-center gap-2">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-3/4">
                <div className="flex flex-col gap-4 py-8">
                     {navLinks.map(link => (
                        <a key={link.name} href={link.href} className={`text-lg font-medium ${link.active ? 'text-primary' : 'text-foreground'}`}>{link.name}</a>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
        <div className="flex-1" />
    </div>
);


export function SiteHeader() {
    const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-full items-center gap-4 sm:gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
            <AxiomLogo />
            <AxiomText />
        </div>
        
        {isMobile ? <MobileNav /> : <DesktopNav />}

        <div className="flex items-center gap-2">
            <Button variant="default" className="h-8 rounded-full bg-primary hidden sm:flex">Deposit</Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hidden sm:flex">
                <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 rounded-full px-2 hidden xl:flex">
                <Wallet className="h-4 w-4 mr-2" /> 0
            </Button>
             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full flex xl:hidden">
                <Wallet className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <User className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </header>
  )
}
