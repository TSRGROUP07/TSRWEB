// Admin formunuza eklemek için kod örneği
// Dosya: app/admin/ilanlar/yeni/page.tsx
// Konum: "Notlar" alanından ÖNCE
// NOT: Bu dosya sadece örnek kod içerir, build sırasında TypeScript kontrolünden geçmez

import InvestmentAnalysisForm from "@/components/admin/InvestmentAnalysisForm";

{/* Investment Analysis Section - Yatırım Analizi */ }
<div className="md:col-span-2 border-t border-gray-300 pt-8 mt-8">
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">📊 Yatırım Analizi</h3>
        <p className="text-sm text-gray-600">
            Bu bölümde gayrimenkulün yatırım potansiyelini, fiyat analizini, bölge skorlarını ve yakındaki yerleri girebilirsiniz.
        </p>
    </div>

    <InvestmentAnalysisForm
        data={{
            investment_score: formData.investmentScore ? parseInt(formData.investmentScore) : undefined,
            investment_score_description: formData.investmentRating,
            price_analysis: {
                yearly_return: formData.priceAnalysis?.annualReturn,
                unit_price: formData.priceAnalysis?.unitPriceChange,
                value_estimation: formData.priceAnalysis?.valuePrediction,
                rental_income: formData.priceAnalysis?.rentalIncomeChange,
            },
            location_analysis: {
                neighborhood_score: formData.marketingAnalysis?.neighborhoodScore ? parseInt(formData.marketingAnalysis.neighborhoodScore) : undefined,
                district_score: formData.marketingAnalysis?.districtScore ? parseInt(formData.marketingAnalysis.districtScore) : undefined,
                province_score: formData.marketingAnalysis?.cityScore ? parseInt(formData.marketingAnalysis.cityScore) : undefined,
            },
            location_nearby_transit: formData.locationAnalysis?.transport,
            location_nearby_schools: formData.locationAnalysis?.schools,
            location_nearby_health: formData.locationAnalysis?.health,
            location_nearby_green_areas: formData.locationAnalysis?.green,
            location_nearby_sports: formData.locationAnalysis?.sports,
            location_nearby_entertainment: formData.locationAnalysis?.entertainment,
            structural_score: formData.structuralAnalysis?.ageScore ? parseInt(formData.structuralAnalysis.ageScore) : undefined,
            structural_building_age_impact: formData.structuralAnalysis?.ageScore,
            structural_facilities_impact: formData.structuralAnalysis?.amenitiesScore,
            structural_gross_area_impact: formData.structuralAnalysis?.areaScore,
            structural_usage_status_impact: formData.structuralAnalysis?.usageScore,
            demographics_married_rate: formData.demographics?.marriedRatio ? parseFloat(formData.demographics.marriedRatio) : undefined,
            demographics_youth_rate: formData.demographics?.youthRatio ? parseFloat(formData.demographics.youthRatio) : undefined,
            demographics_higher_ed_rate: formData.demographics?.educationRatio ? parseFloat(formData.demographics.educationRatio) : undefined,
            demographics_election_district: formData.demographics?.electionDistrict,
            demographics_election_party: formData.demographics?.electionWinner,
            demographics_election_percentage: formData.demographics?.electionPercentage ? parseFloat(formData.demographics.electionPercentage) : undefined,
            nearby_places: formData.nearbyPlaces || [],
        }}
        onChange={(updates) => {
            setFormData({
                ...formData,
                investmentScore: updates.investment_score?.toString() || formData.investmentScore,
                investmentRating: updates.investment_score_description || formData.investmentRating,
                priceAnalysis: {
                    annualReturn: updates.price_analysis?.yearly_return || formData.priceAnalysis?.annualReturn || "",
                    unitPriceChange: updates.price_analysis?.unit_price || formData.priceAnalysis?.unitPriceChange || "",
                    valuePrediction: updates.price_analysis?.value_estimation || formData.priceAnalysis?.valuePrediction || "",
                    rentalIncomeChange: updates.price_analysis?.rental_income || formData.priceAnalysis?.rentalIncomeChange || "",
                },
                marketingAnalysis: {
                    neighborhoodScore: updates.location_analysis?.neighborhood_score?.toString() || formData.marketingAnalysis?.neighborhoodScore || "",
                    districtScore: updates.location_analysis?.district_score?.toString() || formData.marketingAnalysis?.districtScore || "",
                    cityScore: updates.location_analysis?.province_score?.toString() || formData.marketingAnalysis?.cityScore || "",
                },
                locationAnalysis: {
                    transport: updates.location_nearby_transit ?? formData.locationAnalysis?.transport ?? false,
                    schools: updates.location_nearby_schools ?? formData.locationAnalysis?.schools ?? false,
                    health: updates.location_nearby_health ?? formData.locationAnalysis?.health ?? false,
                    green: updates.location_nearby_green_areas ?? formData.locationAnalysis?.green ?? false,
                    sports: updates.location_nearby_sports ?? formData.locationAnalysis?.sports ?? false,
                    entertainment: updates.location_nearby_entertainment ?? formData.locationAnalysis?.entertainment ?? false,
                },
                structuralAnalysis: {
                    ageScore: updates.structural_building_age_impact || formData.structuralAnalysis?.ageScore || "",
                    amenitiesScore: updates.structural_facilities_impact || formData.structuralAnalysis?.amenitiesScore || "",
                    areaScore: updates.structural_gross_area_impact || formData.structuralAnalysis?.areaScore || "",
                    usageScore: updates.structural_usage_status_impact || formData.structuralAnalysis?.usageScore || "",
                },
                demographics: {
                    marriedRatio: updates.demographics_married_rate?.toString() || formData.demographics?.marriedRatio || "",
                    youthRatio: updates.demographics_youth_rate?.toString() || formData.demographics?.youthRatio || "",
                    educationRatio: updates.demographics_higher_ed_rate?.toString() || formData.demographics?.educationRatio || "",
                    electionDistrict: updates.demographics_election_district || formData.demographics?.electionDistrict || "",
                    electionWinner: updates.demographics_election_party || formData.demographics?.electionWinner || "",
                    electionPercentage: updates.demographics_election_percentage?.toString() || formData.demographics?.electionPercentage || "",
                },
                nearbyPlaces: updates.nearby_places || formData.nearbyPlaces || [],
            });
        }}
    />
</div>
