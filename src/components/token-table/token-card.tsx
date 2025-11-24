"use client"

import Image from 'next/image';
import { Twitter, Send, Globe, Users, Crown, ShieldCheck, Ghost, Boxes, Crosshair, ChefHat, EyeOff, User, Trophy, Search, Copy, ExternalLink, MoreVertical, Star, Bot, Minus, ArrowRight, Pause, Settings, SlidersHorizontal, Trash2 } from 'lucide-react';
import type { Token } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TokenChart } from './token-chart';
import { Button } from '../ui/button';
import { PumpFunLogo, MayhemLogo, VirtualCurveLogo, MeteoraLogo } from '../icons/token-logos';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const formatCurrency = (value: number, minFraction = 2, maxFraction = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: minFraction,
    maximumFractionDigits: maxFraction,
  }).format(value);
};

const formatCompact = (value: number) => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toString();
}

const TxBar = ({ buys, sells }: { buys: number, sells: number }) => {
  const total = buys + sells;
  if (total === 0) return <div className="h-0.5 w-full bg-secondary rounded-full" />;
  const buyPercent = (buys / total) * 100;
  
  return (
    <div className="flex h-0.5 w-full bg-red-500/50 rounded-full overflow-hidden">
      <div className="bg-green-500" style={{ width: `${buyPercent}%` }}></div>
    </div>
  )
}

const CreatorPnlTag = ({ pnlPercent }: { pnlPercent: number }) => {
    const pnlClass = pnlPercent >= 0 ? 'text-green-400' : 'text-red-400';
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn("flex flex-row gap-1 items-center text-xs px-2 h-6 rounded-full bg-secondary border border-border/50", pnlClass)}>
                <Star className="h-3 w-3" />
                <span className="font-medium">{pnlPercent.toFixed(0)}%</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Creator's PnL: {pnlPercent.toFixed(2)}%</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
}

const Tag = ({ icon, label, value, valueClass, pnl, tooltip }: { icon: React.ReactNode, label?: string, value: string | number, valueClass?: string, pnl?: number, tooltip?: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-row gap-1 items-center text-xs px-2 h-6 rounded-full bg-secondary border border-border/50">
            {icon}
            {label && <span className="text-muted-foreground">{label}</span>}
            <span className={cn("font-medium", valueClass, pnl !== undefined ? (pnl >= 0 ? 'text-green-400' : 'text-red-400') : '')}>{value}</span>
        </div>
      </TooltipTrigger>
      {tooltip && <TooltipContent><p>{tooltip}</p></TooltipContent>}
    </Tooltip>
  </TooltipProvider>
)

const SmallActionButton = ({ icon, tooltip }: { icon: React.ReactNode, tooltip: string }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-0 text-muted-foreground hover:text-primary w-6 h-6 rounded-sm bg-card/80 border border-border/50">
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent><p>{tooltip}</p></TooltipContent>
        </Tooltip>
    </TooltipProvider>
)

const getLogoForType = (type: Token['type']) => {
    switch (type) {
        case 'pump': return <PumpFunLogo className="w-3.5 h-3.5" />;
        case 'mayhem': return <MayhemLogo className="w-3.5 h-3.5" />;
        case 'virtual-curve': return <VirtualCurveLogo className="w-3.5 h-3.5" />;
        case 'meteora': return <MeteoraLogo className="w-3.5 h-3.5" />;
        default: return null;
    }
}

export function TokenCard({ token }: { token: Token }) {
    const priceChangeClass = token.priceUpdate === 'up' 
        ? 'bg-green-500/10' 
        : token.priceUpdate === 'down' 
        ? 'bg-red-500/10' 
        : '';
    
    const mcColorClass = token.marketCap > 1000000 ? 'text-green-400' : token.marketCap > 50000 ? 'text-yellow-400' : 'text-primary';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("group p-3 sm:p-4 cursor-pointer hover:bg-muted/30 transition-colors duration-300 border-b border-border/50", priceChangeClass)}>
          
          <div className="flex gap-3 relative">
            <div className="absolute top-1.5 left-1.5 flex flex-col gap-1.5">
                <SmallActionButton icon={<EyeOff className="w-3.5 h-3.5" />} tooltip="Hide Token" />
                <SmallActionButton icon={<Minus className="w-3.5 h-3.5" />} tooltip="Remove from list" />
                <SmallActionButton icon={<Trash2 className="w-3.5 h-3.5" />} tooltip="Blacklist token" />
            </div>

            {/* Left side - Image */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className="relative w-[74px] h-[74px]">
                    <div className={cn("absolute top-0 left-0 w-full h-full rounded-md z-10 flex items-center justify-center", `text-${token.type === 'pump' ? 'yellow-400' : token.type === 'mayhem' ? 'red-500' : 'primary'}/50`)}>
                        <svg width="78" height="78" viewBox="0 0 78 78">
                            <path stroke="currentColor" fill="transparent" strokeWidth="1" d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76"></path>
                            <path className={cn("transition-all duration-300 ease-in-out", `text-${token.type === 'pump' ? 'yellow-400' : token.type === 'mayhem' ? 'red-500' : 'primary'}`)} stroke="currentColor" fill="transparent" strokeWidth="1" strokeLinecap="round" strokeDasharray="296" strokeDashoffset={296 - (296 * (Math.min(token.marketCap, 30000)/30000))}></path>
                        </svg>
                    </div>
                    <div className="absolute z-20 w-full h-full p-1.5">
                        <Image src={token.logo} alt={token.name} width={68} height={68} className="rounded-sm object-cover w-full h-full" />
                    </div>

                    {token.type && (
                        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 z-30">
                            {getLogoForType(token.type)}
                        </div>
                    )}
                </div>
                <button className="text-xs text-muted-foreground max-w-[74px] truncate flex items-center gap-1">
                    {token.id.slice(0, 4)}...{token.id.slice(-4)}
                    <Copy className="h-2.5 w-2.5 opacity-50 hover:opacity-100" />
                </button>
            </div>

            {/* Right side - Details */}
            <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start">
                    {/* Name & Socials */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-foreground truncate">{token.name}</h3>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                               <span className="text-sm">{token.symbol}</span>
                               <Copy className="h-3 w-3" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <span className="text-xs text-green-400 font-medium">{token.age}</span>
                            {token.socials.twitter && <a href={token.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-foreground"><Twitter className="h-3.5 w-3.5" /></a>}
                            {token.socials.telegram && <a href={token.socials.telegram} target="_blank" rel="noreferrer" className="hover:text-foreground"><Send className="h-3.5 w-3.5" /></a>}
                            {token.socials.website && <a href={token.socials.website} target="_blank" rel="noreferrer" className="hover:text-foreground"><Globe className="h-3.5 w-3.5" /></a>}
                            <a href="#" target="_blank" rel="noreferrer" className="hover:text-foreground"><Search className="h-3.5 w-3.5" /></a>
                        </div>
                    </div>
                    {/* Stats */}
                    <div className="text-right flex-shrink-0">
                        <div className={cn("text-base font-bold", mcColorClass)}>
                            MC {formatCompact(token.marketCap)}
                        </div>
                         <div className="text-xs text-muted-foreground mt-0.5">V {formatCompact(token.volume24h)}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">F {formatCompact(token.fdv)}</div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col mt-2 gap-2">
                     <div className="flex items-center gap-2 flex-wrap">
                        <Tag icon={<User className="h-3 w-3" />} value={token.holders} tooltip="Holders" />
                        <Tag icon={<ShieldCheck className="h-3 w-3" />} value={token.proTraders} tooltip="Pro Traders"/>
                        <Tag icon={<Trophy className="h-3 w-3" />} value={token.topTraders} tooltip="Top Traders" />
                        <Tag icon={<Crown className="h-3 w-3" />} value={`${token.vips.current}/${token.vips.total}`} tooltip="VIPs" />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                       <CreatorPnlTag pnlPercent={token.creator.pnlPercent} />
                       <Tag icon={<ChefHat className="h-3 w-3" />} value={`${token.creator.pnl.toFixed(0)}%`} pnl={token.creator.pnl} tooltip="Creator PnL"/>
                       <Tag icon={<Crosshair className="h-3 w-3" />} value={`${token.snipers}%`} pnl={-token.snipers} tooltip="Snipers"/>
                       <Tag icon={<Bot className="h-3 w-3" />} value={`${token.bots}%`} pnl={-token.bots} tooltip="Bots"/>
                       <Tag icon={<Boxes className="h-3 w-3" />} value={`${token.boxes}%`} pnl={-token.boxes} tooltip="Boxes"/>
                    </div>

                     <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground w-full">
                            <span>TXs {token.transactions.buys + token.transactions.sells}</span>
                            <TxBar buys={token.transactions.buys} sells={token.transactions.sells} />
                        </div>
                        <Button size="sm" variant="ghost" className="h-auto px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Buy <ArrowRight className="w-3 h-3 ml-1" /></Button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image src={token.logo} alt={token.name} width={24} height={24} className="rounded-full" />
            {token.name} ({token.symbol})
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-sm space-y-4">
          <TokenChart token={token} />
          <div className="grid grid-cols-2 gap-4">
              <div><span className="font-medium text-muted-foreground">Price:</span> {formatCurrency(token.price, 2, 8)}</div>
              <div><span className="font-medium text-muted-foreground">24h %:</span> <span className={cn(token.priceChange24hPercent >= 0 ? 'text-green-400' : 'text-red-400')}>{token.priceChange24hPercent.toFixed(2)}%</span></div>
              <div><span className="font-medium text-muted-foreground">Volume:</span> {formatCurrency(token.volume24h)}</div>
              <div><span className="font-medium text-muted-foreground">Liquidity:</span> {formatCurrency(token.liquidity)}</div>
              <div><span className="font-medium text-muted-foreground">FDV:</span> {formatCurrency(token.fdv)}</div>
              <div><span className="font-medium text-muted-foreground">Age:</span> {token.age}</div>
          </div>
          <Button size="lg" className="w-full">Buy {token.symbol}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
