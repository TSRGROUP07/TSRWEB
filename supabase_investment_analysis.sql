-- Investment Analysis System - Schema Update
-- Add new columns to properties table for investment analysis features

-- Investment Score
ALTER TABLE properties ADD COLUMN IF NOT EXISTS investment_score INTEGER CHECK (investment_score >= 0 AND investment_score <= 100);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS investment_score_description TEXT;

-- Price Analysis (enhance existing price_analysis JSONB)
-- Expected structure:
-- {
--   "yearly_return": "+1.8%",
--   "unit_price": "-13%",
--   "value_estimation": "-22%",
--   "rental_income": "+8%"
-- }

-- Region Analysis (enhance existing location_analysis JSONB)
-- Expected structure:
-- {
--   "neighborhood_score": 50,
--   "district_score": 66,
--   "province_score": 61
-- }

-- Location Proximity Checklist
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_nearby_transit BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_nearby_schools BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_nearby_health BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_nearby_green_areas BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_nearby_sports BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location_nearby_entertainment BOOLEAN DEFAULT false;

-- Structural Condition
ALTER TABLE properties ADD COLUMN IF NOT EXISTS structural_score INTEGER CHECK (structural_score >= 0 AND structural_score <= 100);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS structural_building_age_impact TEXT; -- "-15 yaş"
ALTER TABLE properties ADD COLUMN IF NOT EXISTS structural_facilities_impact TEXT; -- "+2"
ALTER TABLE properties ADD COLUMN IF NOT EXISTS structural_gross_area_impact TEXT; -- "+1%"
ALTER TABLE properties ADD COLUMN IF NOT EXISTS structural_usage_status_impact TEXT; -- "+0.08%"

-- Demographics
ALTER TABLE properties ADD COLUMN IF NOT EXISTS demographics_married_rate NUMERIC; -- %50
ALTER TABLE properties ADD COLUMN IF NOT EXISTS demographics_youth_rate NUMERIC; -- %38
ALTER TABLE properties ADD COLUMN IF NOT EXISTS demographics_higher_ed_rate NUMERIC; -- %19
ALTER TABLE properties ADD COLUMN IF NOT EXISTS demographics_election_district TEXT; -- "Çankırı"
ALTER TABLE properties ADD COLUMN IF NOT EXISTS demographics_election_party TEXT; -- "AK Parti"
ALTER TABLE properties ADD COLUMN IF NOT EXISTS demographics_election_percentage NUMERIC; -- %54

-- Nearby Places (dynamic customizable list)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS nearby_places JSONB DEFAULT '[]'::jsonb;
-- Structure:
-- [
--   { "icon": "bus", "distance": 89, "name": "40294 Nolu Otobüs Durağı" },
--   { "icon": "hospital", "distance": 214, "name": "Devrez Eczanesi" },
--   { "icon": "park", "distance": 123, "name": "Eyüp Sultan Parkı" },
--   { "icon": "school", "distance": 202, "name": "Özel Pursaklar Sınav Temel Lisesi" },
--   { "icon": "heart", "distance": 585, "name": "Özel Duru Tıp Merkezi" },
--   { "icon": "sports", "distance": 330, "name": "Basketbol Sahası" }
-- ]

-- Comments for documentation
COMMENT ON COLUMN properties.investment_score IS 'Overall investment score (0-100)';
COMMENT ON COLUMN properties.nearby_places IS 'Dynamic list of nearby places with icon, distance (meters), and custom name';
COMMENT ON COLUMN properties.structural_score IS 'Structural condition score (0-100)';

-- Update timestamp
UPDATE properties SET updated_at = NOW() WHERE updated_at IS NOT NULL;
