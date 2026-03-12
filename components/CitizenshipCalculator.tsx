"use client";

import { useState } from "react";
import { Check, X, ArrowRight, Calculator } from "lucide-react";

export default function CitizenshipCalculator() {
    const [propertyValue, setPropertyValue] = useState<number>(400000);
    const [familySize, setFamilySize] = useState<number>(1);
    const [showResult, setShowResult] = useState(false);

    const calculateEligibility = () => {
        setShowResult(true);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-[#2e3c3a] p-6 text-white text-center">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-[#c5a265]" />
                <h3 className="text-2xl font-bold">Eligibility Calculator</h3>
                <p className="text-white/80 text-sm mt-2">Check if you qualify for Turkish Citizenship</p>
            </div>

            <div className="p-8 space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Investment Amount ($)</label>
                    <input
                        type="range"
                        min="200000"
                        max="1000000"
                        step="10000"
                        value={propertyValue}
                        onChange={(e) => {
                            setPropertyValue(Number(e.target.value));
                            setShowResult(false);
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2e3c3a]"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 font-medium">
                        <span>$200k</span>
                        <span className="text-[#2e3c3a] font-bold text-lg">${propertyValue.toLocaleString()}</span>
                        <span>$1M+</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Family Members (Including You)</label>
                    <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                onClick={() => {
                                    setFamilySize(num);
                                    setShowResult(false);
                                }}
                                className={`flex-1 py-3 rounded-lg border-2 font-semibold transition-all ${familySize === num
                                        ? "border-[#2e3c3a] bg-[#2e3c3a] text-white"
                                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                                    }`}
                            >
                                {num}{num === 5 ? "+" : ""}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={calculateEligibility}
                    className="w-full bg-[#c5a265] hover:bg-[#b08d55] text-white font-bold py-4 rounded-xl shadow-lg transition-transform transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    Check Eligibility <ArrowRight className="h-5 w-5" />
                </button>

                {showResult && (
                    <div className={`mt-6 p-6 rounded-xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${propertyValue >= 400000
                            ? "bg-green-50 border-green-200"
                            : "bg-orange-50 border-orange-200"
                        }`}>
                        {propertyValue >= 400000 ? (
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Check className="h-8 w-8 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-green-800 mb-1">Congratulations! You are Eligible.</h4>
                                    <p className="text-green-700 mb-4">
                                        Your investment of <span className="font-bold">${propertyValue.toLocaleString()}</span> qualifies you and your family for Turkish Citizenship.
                                    </p>
                                    <ul className="space-y-2 mb-4">
                                        <li className="flex items-center gap-2 text-green-700 text-sm">
                                            <Check className="h-4 w-4" /> Turkish Passport in ~3-6 months
                                        </li>
                                        <li className="flex items-center gap-2 text-green-700 text-sm">
                                            <Check className="h-4 w-4" /> Full medical assistance included
                                        </li>
                                        <li className="flex items-center gap-2 text-green-700 text-sm">
                                            <Check className="h-4 w-4" /> Rental income approx. 5-7%
                                        </li>
                                    </ul>
                                    <a href="/iletisim" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg text-sm transition-colors">
                                        Start Process Now
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <X className="h-8 w-8 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-orange-800 mb-1">Investment Threshold Not Met</h4>
                                    <p className="text-orange-700">
                                        The minimum requirement for Turkish Citizenship is <span className="font-bold">$400,000</span>.
                                        You need to increase your investment by <span className="font-bold">${(400000 - propertyValue).toLocaleString()}</span>.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
