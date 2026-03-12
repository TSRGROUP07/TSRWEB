"use client";

import { Check } from "lucide-react";

interface LocationChecklistProps {
    items: {
        label: string;
        checked: boolean;
    }[];
}

export default function LocationChecklist({ items }: LocationChecklistProps) {
    const checkedCount = items.filter(item => item.checked).length;
    const totalCount = items.length;
    const score = Math.round((checkedCount / totalCount) * 100);

    const getScoreColor = (score: number): string => {
        if (score >= 70) return "#4caf50";
        if (score >= 50) return "#8bc34a";
        return "#ff9800";
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            {/* Header with score */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Konum Analizi</h3>
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getScoreColor(score) }}
                >
                    <span className="text-2xl font-bold text-white">{score}</span>
                </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${item.checked ? 'bg-green-50' : 'bg-gray-50'
                            }`}
                    >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${item.checked ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                            {item.checked && <Check className="h-4 w-4 text-white" />}
                        </div>
                        <span className={`text-sm ${item.checked ? 'text-gray-800 font-medium' : 'text-gray-500'
                            }`}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
