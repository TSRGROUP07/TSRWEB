"use client";

import { Users, GraduationCap, Heart, Vote } from "lucide-react";

interface DemographicsData {
    marriedRate?: number; // %50
    youthRate?: number; // %38
    higherEdRate?: number; // %19
    electionDistrict?: string; // "Çankırı"
    electionParty?: string; // "AK Parti"
    electionPercentage?: number; // %54
}

interface DemographicsCardProps {
    data: DemographicsData;
    title?: string;
}

export default function DemographicsCard({ data, title }: DemographicsCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{title || "Bölge Nasıl Bir Yer?"}</h3>
            <p className="text-gray-600 mb-6">
                Gayrimenkul ve çevresi hakkında bilinmesi gereken istatistiklere ulaşabilirsiniz
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Married Rate */}
                {data.marriedRate !== undefined && (
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <Users className="h-8 w-8 text-[#2e3c3a] mx-auto mb-2" />
                        <p className="text-3xl font-bold text-[#2e3c3a]">%{data.marriedRate}</p>
                        <p className="text-sm text-gray-600 mt-1">EVLİ ORANI</p>
                    </div>
                )}

                {/* Youth Rate */}
                {data.youthRate !== undefined && (
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <Heart className="h-8 w-8 text-[#2e3c3a] mx-auto mb-2" />
                        <p className="text-3xl font-bold text-[#2e3c3a]">%{data.youthRate}</p>
                        <p className="text-sm text-gray-600 mt-1">GENÇ NÜFUS ORANI</p>
                    </div>
                )}

                {/* Higher Education Rate */}
                {data.higherEdRate !== undefined && (
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <GraduationCap className="h-8 w-8 text-[#2e3c3a] mx-auto mb-2" />
                        <p className="text-3xl font-bold text-[#2e3c3a]">%{data.higherEdRate}</p>
                        <p className="text-sm text-gray-600 mt-1">YÜKSEK ÖĞRENİM ORANI</p>
                    </div>
                )}
            </div>

            {/* Election Data */}
            {data.electionParty && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <Vote className="h-6 w-6 text-[#2e3c3a]" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-gray-800">{data.electionDistrict || "Bölge"}</p>
                            <p className="text-sm text-gray-600">
                                KÜTÜK DAĞILIMI
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-[#2e3c3a]">{data.electionParty}</p>
                        <p className="text-sm text-gray-600">
                            (%{data.electionPercentage || 0}) SON SEÇİM
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
