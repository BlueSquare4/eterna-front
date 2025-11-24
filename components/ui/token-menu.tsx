"use client"

import { memo, useState } from "react"
import type { Token } from "@/lib/types"
import { MoreHorizontal, Copy, ExternalLink, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface TokenMenuProps {
  token: Token
}

export const TokenMenu = memo(function TokenMenu({ token }: TokenMenuProps) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(token.contractAddress)
    toast({
      title: "Copied",
      description: "Contract address copied to clipboard",
    })
    setIsOpen(false)
  }

  const handleViewOnExplorer = () => {
    window.open(`https://etherscan.io/token/${token.contractAddress}`, "_blank")
    setIsOpen(false)
  }

  const handleSetAlert = () => {
    toast({
      title: "Alert set",
      description: `Price alert set for ${token.symbol}`,
    })
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewOnExplorer} className="cursor-pointer">
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSetAlert} className="cursor-pointer">
          <Bell className="w-4 h-4 mr-2" />
          Set Price Alert
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
