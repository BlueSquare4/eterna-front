"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HelpCircle, List, BookmarkX, Keyboard, Volume2, Crosshair, Settings, Wallet, ArrowDown } from "lucide-react"

export const SolanaLogo = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.32117 5.03831C3.54848 4.76721 3.90159 4.73149 4.17269 4.9588L6.81521 7.15653C7.0863 7.38384 7.12202 7.73695 6.89471 8.00804L4.17269 11.2335C3.94538 11.5046 3.59227 11.5403 3.32117 11.313C3.05008 11.0857 3.01436 10.7326 3.24167 10.4615L5.4394 7.5979L3.24167 4.73432C3.01436 4.46323 3.05008 4.11012 3.32117 3.88281L3.32117 5.03831V5.03831ZM8.01633 6.94931L10.6588 9.14704C10.93 9.37435 10.9657 9.72746 10.7384 9.99855L8.01633 13.224C7.78902 13.4951 7.43591 13.5308 7.16482 13.3035C6.89372 13.0762 6.858 12.7231 7.08531 12.452L9.28304 9.58841L7.08531 6.72483C6.858 6.45374 6.89372 6.10063 7.16482 5.87332C7.43591 5.64601 7.78902 5.68173 8.01633 5.95282L8.01633 6.94931ZM12.7115 8.8603L15.354 11.058C15.6251 11.2854 15.6608 11.6385 15.4335 11.9096L12.7115 15.135C12.4842 15.4061 12.1311 15.4418 11.86 15.2145C11.5889 14.9872 11.5532 14.6341 11.7805 14.363L13.9782 11.5L11.7805 8.63641C11.5532 8.36532 11.5889 8.01221 11.86 7.7849C12.1311 7.55759 12.4842 7.59331 12.7115 7.8644L12.7115 8.8603ZM16.6788 3.88281C16.9499 4.11012 16.9856 4.46323 16.7583 4.73432L14.5606 7.5979L16.7583 10.4615C16.9856 10.7326 16.9499 11.0857 16.6788 11.313C16.4077 11.5403 16.0546 11.5046 15.8273 11.2335L13.1053 8.00804C12.878 7.73695 12.9137 7.38384 13.1848 7.15653L15.8273 4.9588C16.0984 4.73149 16.4515 4.76721 16.6788 5.03831V3.88281Z" fill="url(#paint0_linear_121_31)"/>
        <defs>
            <linearGradient id="paint0_linear_121_31" x1="3.04944" y1="9.58841" x2="16.9506" y2="9.58841" gradientUnits="userSpaceOnUse">
                <stop stopColor="#14F195"/>
                <stop offset="1" stopColor="#9945FF"/>
            </linearGradient>
        </defs>
    </svg>
)

export const BnbLogo = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="grayscale-[0.3]">
        <path d="M10 2.5L12.9167 5.41667L15.8333 2.5L12.9167 0L10 2.5Z" fill="#F0B90B"/>
        <path d="M7.08331 5.41667L10 8.33333L7.08331 11.25L4.16665 8.33333L7.08331 5.41667Z" fill="#F0B90B"/>
        <path d="M10 17.5L7.08331 14.5833L4.16665 17.5L7.08331 20L10 17.5Z" fill="#F0B90B"/>
        <path d="M12.9167 14.5833L10 11.6667L12.9167 8.75L15.8333 11.6667L12.9167 14.5833Z" fill="#F0B90B"/>
        <path d="M10 9.375L11.875 11.25L10 13.125L8.125 11.25L10 9.375Z" fill="#F0B90B"/>
    </svg>
)


export const PulseHeader = () => {
    return (
        <section className="flex-none flex flex-row w-full h-[32px] justify-start items-center">
            <div className="flex-1 flex items-center gap-3">
                <span className="text-foreground text-[20px] font-medium">Pulse</span>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full transition-all duration-150 bg-secondary/60 scale-110" aria-label="Switch to Solana">
                        <SolanaLogo />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full transition-all duration-150 hover:bg-secondary/30 opacity-60 hover:opacity-100" aria-label="Switch to BNB">
                        <BnbLogo />
                    </Button>
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Button variant="ghost" size="icon" className="flex flex-row w-[24px] h-[24px] justify-center items-center text-muted-foreground hover:text-foreground">
                    <HelpCircle className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="h-8">
                            <List className="h-4 w-4 mr-2" />
                            <span className="text-sm font-bold">Display</span>
                            <ArrowDown className="h-4 w-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {/* Dropdown items here */}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="group -mr-1 text-muted-foreground hover:text-foreground">
                    <BookmarkX className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="group -mr-1 text-muted-foreground hover:text-foreground">
                    <Keyboard className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="group -mr-1 text-muted-foreground hover:text-foreground">
                    <Volume2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="group relative text-muted-foreground hover:text-foreground">
                    <Crosshair className="h-4 w-4" />
                    <Settings className="h-3 w-3 absolute bottom-0 right-0" />
                </Button>
                
                <div className="relative flex ">
                    <Button variant="outline" className="h-8 rounded-full">
                        <Wallet className="h-4 w-4 mr-2" />
                        <span>1</span>
                        <SolanaLogo />
                        <span className="ml-1">0</span>
                        <ArrowDown className="h-4 w-4 ml-1" />
                    </Button>
                </div>

                 <div className="hidden sm:block lg:hidden">
                    {/* Empty for now as per image */}
                 </div>
            </div>
        </section>
    )
}
