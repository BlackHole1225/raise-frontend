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
  { month: 'Jan', receivedAmount: 0 },
  { month: 'Feb', receivedAmount: 0 },
  { month: 'Mar', receivedAmount: 0 },
  { month: 'Apr', receivedAmount: 0 },
  { month: 'May', receivedAmount: 0 },
  { month: 'Jun', receivedAmount: 0 },
  { month: 'Jul', receivedAmount: 0 },
  { month: 'Aug', receivedAmount: 0 },
  { month: 'Sep', receivedAmount: 0 },
  { month: 'Oct', receivedAmount: 0 },
  { month: 'Nov', receivedAmount: 0 },
  { month: 'Dec', receivedAmount: 0 }
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
