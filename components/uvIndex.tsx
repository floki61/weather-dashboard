import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Wind } from 'lucide-react';

export default function UvIndex({ uvIndex }: { uvIndex: number }) {
    const getstatus = (index: number) => {
        if (index < 3) {
            return "use sun protection if you are outside.";
        } else if (index < 6) {
            return "Stay in shade near midday.";
        } else if (index < 8) {
            return "Reduce time in the sun between 10 a.m. and 4 p.m.";
        } else if (index < 11) {
            return "Take all precautions because unprotected skin and eyes can burn in minutes.";
        } else {
            return "Try to avoid sun exposure between 10 a.m. and 4 p.m.";
        };
    }

    return (
        <div className='flex flex-col rounded-xl bg-accent h-full p-6 gap-4'>
            <div className="text-sm font-medium flex items-center">
                <Sun className="w-4 h-4 mr-2" />
                Uv Index
            </div>
            <div className='h-full flex flex-col'>
                <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold">{uvIndex}</div>
                    <div className="text-sm text-muted-foreground">(Moderate)</div>
                </div>
                <div className="mt-2 h-3 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 to-purple-500 rounded-full">
                    <div className={`h-3 w-3 bg-white border border-blue-400 rounded-full `} style={{ marginLeft: `${(uvIndex / 11) * 100}%` }}></div>
                </div>
                <p className="text-xs text-muted-foreground h-full flex items-end">{getstatus(uvIndex)}</p>
            </div>
        </div>

    );
};
