"use client";

interface InvestmentScoreProps {
    score: number; // 0-100
    description?: string;
}

export default function InvestmentScore({ score, description }: InvestmentScoreProps) {
    // Determine color based on score
    const getScoreColor = (score: number): string => {
        if (score >= 70) return "#4caf50"; // Mükemmel - Green
        if (score >= 60) return "#8bc34a"; // İyi - Light Green  
        if (score >= 50) return "#cddc39"; // Orta - Yellow-Green
        if (score >= 40) return "#ff9800"; // Düşük - Orange
        return "#f44336"; // Çok Düşük - Red
    };


    const getScoreLabel = (score: number): string => {
        if (score >= 70) return "Mükemmel";
        if (score >= 60) return "İyi";
        if (score >= 50) return "Orta";
        if (score >= 40) return "Düşük";
        return "Çok Düşük";
    };

    const color = getScoreColor(score);
    const label = getScoreLabel(score);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Yatırım Skoru</h3>

            {/* Score Circle */}
            <div className="flex items-center justify-center mb-6">
                <div
                    className="relative w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: color }}
                >
                    <span className="text-5xl font-bold text-white">{score}</span>
                </div>
            </div>

            {/* Score Label */}
            <div className="text-center mb-4">
                <span
                    className="text-xl font-semibold px-4 py-2 rounded-full"
                    style={{ color: color }}
                >
                    {label}
                </span>
            </div>

            {/* Description */}
            {description && (
                <p className="text-gray-600 text-center leading-relaxed">
                    {description}
                </p>
            )}

            {/* Color Bar */}
            <div className="mt-6 relative h-8 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full flex">
                    <div className="h-full" style={{ width: "40%", backgroundColor: "#f44336" }}></div>
                    <div className="h-full" style={{ width: "10%", backgroundColor: "#ff9800" }}></div>
                    <div className="h-full" style={{ width: "10%", backgroundColor: "#cddc39" }}></div>
                    <div className="h-full" style={{ width: "10%", backgroundColor: "#8bc34a" }}></div>
                    <div className="h-full" style={{ width: "30%", backgroundColor: "#4caf50" }}></div>
                </div>
                {/* Score Indicator */}
                <div
                    className="absolute top-0 w-1 h-full bg-gray-800"
                    style={{ left: `${score}%` }}
                ></div>
            </div>

            {/* Labels under bar */}
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                <span>0-40</span>
                <span>40-50</span>
                <span>50-60</span>
                <span>60-70</span>
                <span>70-100</span>
            </div>
            <div className="flex justify-between text-xs font-semibold text-gray-700 mt-1 px-1">
                <span>Çok Düşük</span>
                <span>Düşük</span>
                <span>Orta</span>
                <span>İyi</span>
                <span>Mükemmel</span>
            </div>
        </div>
    );
}
