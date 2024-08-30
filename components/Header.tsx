import { Menu, RefreshCw, Search } from 'lucide-react'
import React from 'react'
import { ModeToggle } from './modeToggle'



export default function Header({ setSidebarOpen }: { setSidebarOpen: (value: boolean) => void }) {
    return (
        <header className="shadow-sm z-20 w-full">
            <div className="mx-auto py-4 px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <div className="relative flex-1 max-w-xs mx-4">
                        <input
                            type="text"
                            placeholder="Search something here..."
                            className="border rounded-full w-full pl-10 pr-4 py-2"
                        />
                        <Search className="absolute left-3 top-2.5 text-forground" size={20} />
                    </div>
                    <div className="flex items-center">
                        <button className="mr-4">
                            <RefreshCw size={20} />
                        </button>
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className='ml-4'>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
