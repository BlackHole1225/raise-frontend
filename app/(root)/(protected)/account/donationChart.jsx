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
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { month: 'Jan', receivedAmount: 2 },
  { month: 'Feb', receivedAmount: 2 },
  { month: 'Mar', receivedAmount: 2.4 },
  { month: 'Apr', receivedAmount: 2.4 },
  { month: 'May', receivedAmount: 1.9 },
  { month: 'Jun', receivedAmount: 1.9 },
  { month: 'Jul', receivedAmount: 1.5 },
  { month: 'Aug', receivedAmount: 1.5 },
  { month: 'Sep', receivedAmount: 1.1 },
  { month: 'Oct', receivedAmount: 1.1 },
  { month: 'Nov', receivedAmount: 2.1 },
  { month: 'Dec', receivedAmount: 2.1 }
];

const DonationChart = () => {
  const hasData = true;

  return (
    <div>
      <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading">
        DONATIONS RECEIVED
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
            <Bar dataKey="receivedAmount">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? '#D1E2C0' : '#FAFF7D'}
                />
              ))}
            </Bar>
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
