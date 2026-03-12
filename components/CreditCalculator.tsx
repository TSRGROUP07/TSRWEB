"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CreditCalculator() {
  const [loanAmount, setLoanAmount] = useState(4000000);
  const [interestRate, setInterestRate] = useState(2.5);
  const [loanTerm, setLoanTerm] = useState(20);

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment;
  };

  const calculateTotalPayment = () => {
    return calculateMonthlyPayment() * loanTerm * 12;
  };

  const calculateTotalInterest = () => {
    return calculateTotalPayment() - loanAmount;
  };

  const generatePaymentSchedule = () => {
    const schedule = [];
    let remainingBalance = loanAmount;
    const monthlyPayment = calculateMonthlyPayment();
    const monthlyRate = interestRate / 100 / 12;

    for (let month = 1; month <= 12; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
      });
    }
    return schedule;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = calculateTotalPayment();
  const totalInterest = calculateTotalInterest();
  const schedule = generatePaymentSchedule();

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-8 text-white">Kredi Hesaplama</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Kredi Tutarı (₺)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Faiz Oranı (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Vade (Yıl)
          </label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-6 rounded-xl shadow-xl border border-white/10">
          <div className="text-sm text-white/70 mb-2">Aylık Ödeme</div>
          <div className="text-3xl font-bold text-white">
            {new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
              maximumFractionDigits: 0,
            }).format(monthlyPayment)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-6 rounded-xl shadow-xl border border-white/10">
          <div className="text-sm text-white/70 mb-2">Toplam Ödeme</div>
          <div className="text-3xl font-bold text-white">
            {new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
              maximumFractionDigits: 0,
            }).format(totalPayment)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-6 rounded-xl shadow-xl border border-white/10">
          <div className="text-sm text-white/70 mb-2">Toplam Faiz</div>
          <div className="text-3xl font-bold text-white">
            {new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
              maximumFractionDigits: 0,
            }).format(totalInterest)}
          </div>
        </div>
      </div>

      <div className="h-96 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-6 text-white">İlk Yıl Ödeme Dağılımı</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={schedule}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="month" 
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
            <Bar dataKey="principal" stackId="a" fill="#0ea5e9" name="Ana Para" radius={[8, 8, 0, 0]} />
            <Bar dataKey="interest" stackId="a" fill="#ef4444" name="Faiz" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}



