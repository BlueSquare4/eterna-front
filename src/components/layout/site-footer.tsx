"use client"

import { Button } from "@/components/ui/button"
import { BnbLogo, SolanaLogo } from "../pulse-header"
import { BarChart, Compass, SlidersHorizontal, Palette, Activity, Search, Settings, Twitter, Wallet, Bell, LayoutGrid, Bot } from "lucide-react"

const BtcIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F7931A]">
        <path d="M16.509 7.624a4.463 4.463 0 0 0-4.098-4.048C11.533 3.528 10.59 4.568 10.59 5.56v1.996h-1.92v-1.93c0-1.04-.94-2.08-1.88-2.08-1.41 0-1.88.973-1.88 1.947v9.98c0 .973.47 1.947 1.88 1.947.94 0 1.88-1.04 1.88-2.08v-1.93h1.92v2.016c0 1-.943 2.04 1.88 2.04.893 0 1.63-.614 1.787-1.424a4.463 4.463 0 0 0 4.19-4.204c0-2.733-1.88-4.32-4.148-4.32zm-2.093 5.484h-2.053V9.75h2.053c1.233 0 1.853 1.013 1.853 1.672 0 .66-.62 1.688-1.853 1.688z" fill="currentColor"/>
    </svg>
)

const EthIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#497493]">
        <path d="M12 1.75l-6.25 10.5 6.25 3.5 6.25-3.5L12 1.75z" fill="currentColor"/>
        <path d="M5.75 13.25l6.25 8.5 6.25-8.5-6.25 3.5-6.25-3.5z" fill="currentColor"/>
    </svg>
)

const DiscordIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
        <path d="M20.3,3.7c-0.8-0.3-1.6-0.6-2.5-0.8C17.1,2.2,16.4,1,15.2,1H8.8C7.6,1,6.9,2.2,6.2,2.9C5.3,3.1,4.5,3.3,3.7,3.7 C2.2,5.5,1.7,7.8,2,10.2c1.7,0.9,3.1,1.6,3.1,1.6s-0.3-0.5-0.5-0.9c-0.2-0.5-0.9-2.3,0.2-3.1c0,0,1.2-0.9,2.4-0.8 c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c-1.6,0.9-2.9,2.4-2.9,2.4s0,0.1,0.1,0.1c0.1,0,0.1,0,0.1,0c0.1-0.1,0.3-0.2,0.3-0.2 c-0.1,0-0.2,0.1-0.2,0.1s2.6,1.9,4.9,1.9c2.3,0,4.9-1.9,4.9-1.9s-0.1,0-0.2-0.1c0,0,0.2,0.2,0.3,0.2c0,0,0.1,0,0.1-0.1 c0-0.1,0-0.1,0-0.1s-1.3-1.5-2.9-2.4c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c1.2-0.1,2.4,0.8,2.4,0.8c1.1,0.8,0.4,2.6,0.2,3.1 c-0.2,0.4-0.5,0.9-0.5,0.9s1.5-0.7,3.1-1.6C22.3,7.8,21.8,5.5,20.3,3.7z M8.5,8.2C7.7,8.2,7,7.5,7,6.7s0.7-1.5,1.5-1.5 c0.8,0,1.5,0.7,1.5,1.5S9.3,8.2,8.5,8.2z M15.5,8.2c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5 C17,7.5,16.3,8.2,15.5,8.2z" fill="currentColor"/>
    </svg>
)


export function SiteFooter() {
    return (
        <footer className="hidden sm:block border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full h-[36px] text-nowrap">
                <div className="relative flex w-full h-full px-6 gap-4 items-center">
                    <div className="flex flex-shrink-0 gap-2 justify-start items-center">
                        <Button variant="secondary" className="h-6 px-2 text-xs">
                            <SlidersHorizontal className="h-4 w-4 mr-1" />
                            PRESET 1
                        </Button>
                        <Button variant="outline" className="h-6 px-2 rounded-full text-xs">
                            <Wallet className="h-3 w-3 mr-1" />
                            <span>1</span>
                            <SolanaLogo />
                            <span className="ml-1">0</span>
                        </Button>
                    </div>
                    <div className="w-px h-5 bg-border/70" />

                    <div className="flex gap-2 items-center">
                        <Button variant="ghost" size="icon" className="h-6 w-6"><Settings className="h-3.5 w-3.5" /></Button>
                        <FooterIconLink icon={<Wallet className="h-4 w-4" />} label="Wallet" />
                        <FooterIconLink icon={<Twitter className="h-4 w-4" />} label="Twitter" hasAlert />
                        <FooterIconLink icon={<Compass className="h-4 w-4" />} label="Discover" hasAlert />
                        <FooterIconLink icon={<Activity className="h-4 w-4" />} label="Pulse" />
                        <FooterIconLink icon={<BarChart className="h-4 w-4" />} label="PnL" />
                    </div>

                    <div className="w-px h-5 bg-border/70" />

                    <div className="flex flex-1 w-full gap-4 justify-start items-center">
                         <Button className="hidden 2xl:flex items-center h-6 px-1 gap-1" variant="ghost">
                            <BtcIcon />
                            <span className="text-xs font-normal">$85.9K</span>
                        </Button>
                        <Button className="hidden 2xl:flex items-center h-6 px-1 gap-1" variant="ghost">
                            <EthIcon />
                            <span className="text-xs font-normal">$2824</span>
                        </Button>
                        <Button className="hidden lg:flex items-center h-6 px-1 gap-1" variant="ghost">
                            <SolanaLogo />
                            <span className="text-xs font-normal">$130.44</span>
                        </Button>
                    </div>

                    <div className="flex flex-shrink-0 gap-2 justify-end items-center">
                        <div className="hidden 2xl:flex items-center gap-4 text-xs text-muted-foreground">
                            <span>$53.6K</span>
                            <span className="flex items-center gap-1"><Bot className="h-3.5 w-3.5" /> 0.0263</span>
                            <span className="flex items-center gap-1"><Search className="h-3.5 w-3.5" /> 0.003</span>
                        </div>
                         <div className="w-px h-5 bg-border/70" />
                         <div className="flex items-center gap-2 text-primary-foreground">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-medium text-green-500">Connection is stable</span>
                        </div>
                        <Button variant="secondary" className="h-6 px-2 text-xs">
                            GLOBAL
                        </Button>
                        <div className="w-px h-5 bg-border/70" />
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Button variant="ghost" size="icon" className="h-6 w-6"><LayoutGrid className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Bell className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Palette className="h-4 w-4" /></Button>
                            <div className="hidden md:flex w-px h-5 bg-border/70" />
                            <div className="hidden md:flex items-center gap-2">
                               <Button variant="ghost" size="icon" className="h-6 w-6"><DiscordIcon /></Button>
                               <Button variant="ghost" size="icon" className="h-6 w-6"><Twitter className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const FooterIconLink = ({ icon, label, hasAlert = false }: { icon: React.ReactNode, label: string, hasAlert?: boolean }) => (
    <Button variant="ghost" className="h-6 px-2 text-xs text-muted-foreground relative">
        {icon}
        <span className="ml-1">{label}</span>
        {hasAlert && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full" />}
    </Button>
)
