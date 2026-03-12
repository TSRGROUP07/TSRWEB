"use client";

import {
    Bus, Cross, TreePine, School, Heart, Trophy,
    Music, ShoppingBag, MapPin
} from "lucide-react";

interface NearbyPlace {
    icon: string;
    distance: number; // in meters
    name: string;
}

interface NearbyPlacesListProps {
    places: NearbyPlace[];
}

export default function NearbyPlacesList({ places }: NearbyPlacesListProps) {
    const getIcon = (iconName: string) => {
        const iconProps = { className: "h-6 w-6 text-[#2e3c3a]" };

        switch (iconName.toLowerCase()) {
            case "bus": return <Bus {...iconProps} />;
            case "hospital": return <Cross {...iconProps} />;
            case "park": return <TreePine {...iconProps} />;
            case "school": return <School {...iconProps} />;
            case "heart": return <Heart {...iconProps} />;
            case "sports": return <Trophy {...iconProps} />;
            case "entertainment": return <Music {...iconProps} />;
            case "shopping": return <ShoppingBag {...iconProps} />;
            default: return <MapPin {...iconProps} />;
        }
    };

    if (places.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Yakınlarda Neler Var?</h3>
            <p className="text-gray-600 mb-6">
                Gayrimenkulün etrafındaki sosyal imkanlar, sağlık ve eğitim kurumlarına yakınlık gibi
                etkenler fiyatına etki eder
            </p>

            {/* Places Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {places.map((place, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            {getIcon(place.icon)}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <p className="text-lg font-bold text-[#2e3c3a]">{place.distance} m</p>
                            <p className="text-sm text-gray-600">{place.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
