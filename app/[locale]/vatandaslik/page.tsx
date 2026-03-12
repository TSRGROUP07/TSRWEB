import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Globe2, Wallet, Building2, FileCheck } from 'lucide-react';
import CitizenshipCalculator from '@/components/CitizenshipCalculator';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale });
    return {
        title: locale === 'en'
            ? 'Turkish Citizenship by Investment | Get Turkish Passport - TSR GROUP'
            : 'Yatırım Yoluyla Türk Vatandaşlığı | TSR GROUP',
        description: locale === 'en'
            ? 'Secure your future with Turkish Citizenship by Investment. Minimum $400,000 real estate investment. Get your Turkish Passport in 3-6 months with TSR GROUP expert guidance.'
            : '400.000$ gayrimenkul yatırımı ile Türk Vatandaşlığı kazanın. TSR GROUP uzmanlığı ile 3-6 ayda Türk pasaportuna sahip olun.',
        keywords: locale === 'en'
            ? ['Turkish Citizenship', 'Turkish Passport', 'Citizenship by Investment', 'Buying Property in Turkey', 'Turkey Golden Visa']
            : ['Türk Vatandaşlığı', 'Yatırım Yoluyla Vatandaşlık', 'Türk Pasaportu', 'Türkiye Golden Visa']
    };
}

export default async function CitizenshipPage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations('Citizenship');

    // Static content to ensure high quality (can be moved to messages/en.json later for full i18n)
    const features = [
        {
            icon: <Globe2 className="h-8 w-8 text-[#c5a265]" />,
            title: "Visa-Free Travel",
            desc: "Access to 110+ countries visa-free or visa-on-arrival, including Japan, Singapore, and South Korea."
        },
        {
            icon: <Wallet className="h-8 w-8 text-[#c5a265]" />,
            title: "Profitable Investment",
            desc: "Earn high rental yields (5-8%) in foreign currency and property appreciation in USD."
        },
        {
            icon: <Shield className="h-8 w-8 text-[#c5a265]" />,
            title: "Family Security",
            desc: "Citizenship granted to spouse and children under 18. Full medical and education rights."
        },
        {
            icon: <Building2 className="h-8 w-8 text-[#c5a265]" />,
            title: "No Residency Required",
            desc: "You are not required to live in Turkey to maintain your citizenship status."
        }
    ];

    const steps = [
        {
            num: "01",
            title: "Property Selection",
            desc: "Choose properties worth at least $400,000. We ensure correct valuation reports."
        },
        {
            num: "02",
            title: "Investment & Title Deed",
            desc: "Purchase the property and get the Title Deed with 'Citizenship Annotation'."
        },
        {
            num: "03",
            title: "Residency Application",
            desc: "We apply for a special investor residency permit for you and your family."
        },
        {
            num: "04",
            title: "Passport Application",
            desc: "Final application for citizenship. Approval typically takes 3-4 months."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[600px] bg-[#2e3c3a] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop"
                        alt="Istanbul Turkey"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start pt-20">
                    <div className="inline-block px-4 py-2 bg-[#c5a265] text-black font-bold rounded-lg mb-6 tracking-wide uppercase text-sm">
                        Official Government Program
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">
                        Get Turkish Citizenship <br />
                        <span className="text-[#c5a265]">by Real Estate Investment</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl font-light">
                        Secure your family's future with a sophisticated investment.
                        Minimum entry: <span className="font-bold text-white">$400,000</span>.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="#calculator"
                            className="bg-[#c5a265] hover:bg-[#b08d55] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center gap-2"
                        >
                            Check Eligibility <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/iletisim"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2"
                        >
                            Contact Expert
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 py-16 -mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Info */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Benefits Cards */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Investors Choose Turkey?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {features.map((item, idx) => (
                                    <div key={idx} className="flex flex-col gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process Steps */}
                        <div className="bg-[#2e3c3a] rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a265]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                            <h2 className="text-3xl font-bold mb-12 relative z-10">4 Steps to Turkish Passport</h2>
                            <div className="space-y-8 relative z-10">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-6 items-start group">
                                        <div className="text-4xl font-black text-[#c5a265]/30 group-hover:text-[#c5a265] transition-colors">
                                            {step.num}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-[#c5a265] transition-colors">{step.title}</h3>
                                            <p className="text-gray-300 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-6 items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Total Process Time</p>
                                    <p className="text-2xl font-bold text-[#c5a265]">3 - 6 Months</p>
                                </div>
                                <Link
                                    href="/iletisim"
                                    className="bg-white text-[#2e3c3a] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                                >
                                    Start Application
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Calculator & sticky sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div id="calculator" className="sticky top-8">
                            <CitizenshipCalculator />

                            {/* Trust Signals */}
                            <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <FileCheck className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">100% Success Rate</h4>
                                        <p className="text-xs text-gray-500">For eligible applicants</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    We verify all title deeds and valuation reports before you invest 1 cent. Your application is handled by our expert legal team.
                                </p>
                                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                                        ))}
                                    </div>
                                    <p className="text-xs font-medium text-gray-500">
                                        <span className="text-[#2e3c3a] font-bold">120+ Families</span> helped in 2025
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
