import React, { useState, useEffect } from 'react';

const HomeLoan: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const tenure = loanTenure * 12;

    const emiValue =
      (principal * rate * Math.pow(1 + rate, tenure)) /
      (Math.pow(1 + rate, tenure) - 1);
    const totalPaymentValue = emiValue * tenure;
    const totalInterestValue = totalPaymentValue - principal;

    setEmi(Math.round(emiValue));
    setTotalInterest(Math.round(totalInterestValue));
    setTotalPayment(Math.round(totalPaymentValue));
  }, [loanAmount, interestRate, loanTenure]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Home Loan EMI Calculator</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-8">
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-semibold">Loan Amount</label>
                <span className="font-semibold text-blue-600">₹{loanAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-semibold">Interest Rate (p.a.)</label>
                <span className="font-semibold text-blue-600">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Loan Tenure */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-semibold">Loan Tenure (Years)</label>
                <span className="font-semibold text-blue-600">{loanTenure} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500 mb-2">Monthly EMI</h3>
            <p className="text-3xl font-bold text-blue-600">₹{emi.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500 mb-2">Total Interest</h3>
            <p className="text-3xl font-bold text-orange-600">₹{totalInterest.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500 mb-2">Total Payment</h3>
            <p className="text-3xl font-bold text-green-600">₹{totalPayment.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoan;
