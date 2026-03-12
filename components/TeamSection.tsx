import { useEffect, useState } from "react";
import Image from "next/image";

interface TeamMember {
  id: string | number;
  name: string;
  title: string;
  image: string;
  order?: number;
}

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("/api/admin/team");
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data);
        }
      } catch (error) {
        console.error("Team members fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="relative py-12 lg:py-16" style={{ background: '#b7b1ad' }}>
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="animate-pulse text-[#2e3c3a] font-medium">Ekibimiz yükleniyor...</div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) return null;

  return (
    <section className="relative py-12 lg:py-16" style={{ background: '#b7b1ad' }}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Başlık */}
        <div className="text-center mb-8 lg:mb-10 animate-slide-up">
          <div className="relative inline-block mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2e3c3a] relative z-10 leading-tight">
              Ekibimiz
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] rounded-full"></div>
          </div>
          <p className="text-base lg:text-lg text-white/80 max-w-3xl mx-auto">
            Deneyimli ve profesyonel ekibimizle sizlere en iyi hizmeti sunuyoruz
          </p>
        </div>

        {/* Ekip Üyeleri Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="group relative animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 shadow-sm">
                {/* Fotoğraf */}
                <div className="relative w-full h-[312px] lg:h-[336px] overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* İsim ve Unvan */}
                <div className="p-3 lg:p-4 text-center bg-white">
                  <h3 className="text-sm lg:text-base font-bold text-gray-900 mb-1 group-hover:text-[#2e3c3a] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-xs lg:text-sm font-medium">
                    {member.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
