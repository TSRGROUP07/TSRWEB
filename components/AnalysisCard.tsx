"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AnalysisCardProps {
    title: string;
    score?: number; // 0-100
    items: {
        label: string;
        value: string;
        isPositive?: boolean; // true for positive, false for negative, undefined for neutral
    }[];
}

export default function AnalysisCard({ title, score, items }: AnalysisCardProps) {
    const getScoreColor = (score: number): string => {
        if (score >= 70) return "#4caf50";
        if (score >= 60) return "#8bc34a";
        if (score >= 50) return "#cddc39";
        if (score >= 40) return "#ff9800";
        return "#f44336";
    };

    const getIcon = (isPositive?: boolean) => {
        if (isPositive === true) return <TrendingUp className="h-5 w-5 text-green-600" />;
        if (isPositive === false) return <TrendingDown className="h-5 w-5 text-red-600" />;
        return <Minus className="h-5 w-5 text-gray-400" />;
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            {/* Header with score badge */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                {score !== undefined && (
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getScoreColor(score) }}
                    >
                        <span className="text-2xl font-bold text-white">{score}</span>
                    </div>
                )}
            </div>

            {/* Analysis Items */}
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                            {getIcon(item.isPositive)}
                            <span className="text-gray-700">{item.label}</span>
                        </div>
                        <span
                            className={`font-semibold ${item.isPositive === true ? 'text-green-600' :
                                    item.isPositive === false ? 'text-red-600' :
                                        'text-gray-800'
                                }`}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
