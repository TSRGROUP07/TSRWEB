"use client";

import { useState } from "react";
import { Home, Building2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function InvestmentCalculator() {
  const [investmentType, setInvestmentType] = useState<"residential" | "commercial">("residential");
  const [purchasePrice, setPurchasePrice] = useState(5000000);
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [annualAppreciation, setAnnualAppreciation] = useState(5);
  const [expenses, setExpenses] = useState(5000);

  const calculateROI = () => {
    const annualRent = monthlyRent * 12;
    const annualNetIncome = annualRent - (expenses * 12);
    const roi = (annualNetIncome / purchasePrice) * 100;
    return roi;
  };

  const calculatePaybackPeriod = () => {
    const annualRent = monthlyRent * 12;
    const annualNetIncome = annualRent - (expenses * 12);
    if (annualNetIncome <= 0) return Infinity;
    return purchasePrice / annualNetIncome;
  };

  const generateProjection = () => {
    const years = [];
    let currentValue = purchasePrice;
    const annualRent = monthlyRent * 12;
    const annualNetIncome = annualRent - (expenses * 12);
    let cumulativeIncome = 0;

    for (let year = 0; year <= 10; year++) {
      if (year > 0) {
        currentValue = currentValue * (1 + annualAppreciation / 100);
        cumulativeIncome += annualNetIncome;
      }
      years.push({
        year,
        value: currentValue,
        cumulativeIncome,
        totalReturn: currentValue + cumulativeIncome - purchasePrice,
      });
    }
    return years;
  };

  const roi = calculateROI();
  const paybackPeriod = calculatePaybackPeriod();
  const projection = generateProjection();

  return (
    <div className="text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-white">Yatırım Geri Dönüş Hesaplayıcı</h2>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setInvestmentType("residential")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
              investmentType === "residential"
                ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white shadow-lg"
                : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15"
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Konut</span>
          </button>
          <button
            onClick={() => setInvestmentType("commercial")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
              investmentType === "commercial"
                ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white shadow-lg"
                : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15"
            }`}
          >
            <Building2 className="h-5 w-5" />
            <span>Ticari</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Satın Alma Fiyatı (₺)
          </label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Aylık Kira Geliri (₺)
          </label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Yıllık Değer Artışı (%)
          </label>
          <input
            type="number"
            value={annualAppreciation}
            onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Aylık Giderler (₺)
          </label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-6 rounded-xl shadow-xl border border-white/10">
          <div className="text-sm text-white/70 mb-2">Yıllık ROI</div>
          <div className="text-3xl font-bold text-white">{roi.toFixed(2)}%</div>
        </div>
        <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-6 rounded-xl shadow-xl border border-white/10">
          <div className="text-sm text-white/70 mb-2">Geri Dönüş Süresi</div>
          <div className="text-3xl font-bold text-white">
            {paybackPeriod === Infinity ? "∞" : `${paybackPeriod.toFixed(1)} Yıl`}
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-6 rounded-xl shadow-xl border border-white/10">
          <div className="text-sm text-white/70 mb-2">10 Yıl Sonra Değer</div>
          <div className="text-3xl font-bold text-white">
            {new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
              maximumFractionDigits: 0,
            }).format(projection[10].value)}
          </div>
        </div>
      </div>

      <div className="h-96 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-6 text-white">10 Yıllık Projeksiyon</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projection}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="year" 
              stroke="#ffffff80"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#ffffff80"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => 
                new Intl.NumberFormat("tr-TR", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(46, 60, 58, 0.95)', 
                border: '1px solid rgba(255, 255, 255, 0.2)', 
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                color: '#ffffff'
              }}
              formatter={(value: number) =>
                new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  maximumFractionDigits: 0,
                }).format(value)
              }
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0ea5e9"
              strokeWidth={3}
              name="Emlak Değeri"
              dot={{ fill: '#0ea5e9', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="totalReturn"
              stroke="#10b981"
              strokeWidth={3}
              name="Toplam Getiri"
              dot={{ fill: '#10b981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}



