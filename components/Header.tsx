import React, { useState } from 'react'
import { Search, RefreshCw, Cloud } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModeToggle } from './modeToggle';

interface HeaderProps {
    handleSearch: () => void;
    setCity: (city: string) => void;
    setSidebarOpen: (open: boolean) => void;
}

export default function Header({ handleSearch, setCity, setSidebarOpen }: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            setCity(searchQuery.trim())
            handleSearch()
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-8 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Cloud className="h-6 w-6" />
                        <span className="sr-only">Toggle sidebar</span>
                    </Button>
                    <div className="hidden lg:flex items-center space-x-2">
                        <Cloud className="h-6 w-6 text-primary" />
                        <span className="text-lg font-semibold">Weather Dashboard</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 max-w-sm mx-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for a city..."
                            className="pl-10 pr-4 py-2 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </form>
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSearch}
                        aria-label="Refresh weather data"
                    >
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}