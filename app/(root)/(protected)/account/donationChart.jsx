'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', donateAmount: 2, receivedAmount: 2 },
  { month: 'Feb', donateAmount: 2, receivedAmount: 2 },
  { month: 'Mar', donateAmount: 2.4, receivedAmount: 2.4 },
  { month: 'Apr', donateAmount: 2.4, receivedAmount: 2.4 },
  { month: 'May', donateAmount: 1.9, receivedAmount: 1.9 },
  { month: 'Jun', donateAmount: 1.9, receivedAmount: 1.9 },
  { month: 'Jul', donateAmount: 1.5, receivedAmount: 1.5 },
  { month: 'Aug', donateAmount: 1.5, receivedAmount: 1.5 },
  { month: 'Sep', donateAmount: 1.1, receivedAmount: 1.1 },
  { month: 'Oct', donateAmount: 1.1, receivedAmount: 1.1 },
  { month: 'Nov', donateAmount: 1.5, receivedAmount: 2.1 },
  { month: 'Dec', donateAmount: 1.5, receivedAmount: 2.1 }
];

const DonationChart = () => {
  const hasData = true;
  return (
    <div>
      <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading">
        Donation Analytics
      </h1>
      {hasData ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              label={{ value: 'SOL', angle: -90, position: 'insideLeft' }}
              ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="donateAmount" fill="#D1E2C0" />
            <Bar dataKey="receivedAmount" fill="#3D4630" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="border border-dashed border-brand-dark rounded-xl h-[350px] flex flex-col gap-4 items-center justify-center">
          <h4 className="uppercase text-3xl font-bold text-brand-dark mb-8 font-heading">
            No Data Yet
          </h4>
        </div>
      )}
    </div>
  );
};

export default DonationChart;
