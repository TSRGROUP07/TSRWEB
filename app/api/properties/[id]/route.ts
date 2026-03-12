import { NextRequest, NextResponse } from "next/server";
import { getSupabaseById } from "@/lib/supabase-db";

export const revalidate = 3600; // Cache for 1 hour
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Direct fetch by ID (much faster than fetching all)
    const driveProperty: any = await getSupabaseById("properties", id);

    if (!driveProperty) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    // Coordinates - return as-is
    const coordinates = driveProperty.coordinates || null;

    // Map to frontend Property interface
    const property = {
      id: driveProperty.id,
      title: `${driveProperty.title}`,
      location: driveProperty.location,
      price: driveProperty.price,
      currency: driveProperty.currency || "TL",
      description: driveProperty.description || `${driveProperty.title} - ${driveProperty.location}`,
      area: driveProperty.area,
      rooms: driveProperty.rooms,
      bathrooms: driveProperty.bathrooms,
      type: driveProperty.category || driveProperty.type || "Satılık",
      image: driveProperty.images && driveProperty.images.length > 0 ? driveProperty.images[0] : (driveProperty.image || null),
      additionalImages: driveProperty.images ? driveProperty.images.slice(1) : [],
      images: driveProperty.images || (driveProperty.image ? [driveProperty.image] : []),
      verified: true,
      coordinates: coordinates,
      propertyType: driveProperty.propertyType || driveProperty.property_type,
      agentName: "TSR GROUP",
      agentPhone: "+90 530 630 07 07",
      features: driveProperty.features || [],

      // Investment Analysis Data
      investment_score: driveProperty.investmentScore,
      investment_score_description: driveProperty.investmentScoreDescription,
      price_analysis: driveProperty.priceAnalysis,
      location_analysis: driveProperty.locationAnalysis,
      structural_score: driveProperty.structuralScore,
      structural_building_age_impact: driveProperty.structuralBuildingAgeImpact,
      structural_facilities_impact: driveProperty.structuralFacilitiesImpact,
      structural_gross_area_impact: driveProperty.structuralGrossAreaImpact,
      structural_usage_status_impact: driveProperty.structuralUsageStatusImpact,

      // Demographics
      demographics_married_rate: driveProperty.demographicsMarriedRate,
      demographics_youth_rate: driveProperty.demographicsYouthRate,
      demographics_higher_ed_rate: driveProperty.demographicsHigherEdRate,
      demographics_election_district: driveProperty.demographicsElectionDistrict,
      demographics_election_party: driveProperty.demographicsElectionParty,
      demographics_election_percentage: driveProperty.demographicsElectionPercentage,

      nearby_places: driveProperty.nearbyPlaces
    };

    return NextResponse.json(property, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'CDN-Cache-Control': 'public, s-maxage=3600',
      }
    });
  } catch (error: any) {
    console.error("Property fetch error:", error);
    return NextResponse.json(
      { error: "İlan yüklenemedi", details: error.message },
      { status: 500 }
    );
  }
}
