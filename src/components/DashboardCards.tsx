// components/SummaryCard.js
import React from 'react';

type DashboardCardsProps = {
  title: string;
  value: string | number;
};

const DashboardCards: React.FC<DashboardCardsProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};
export default DashboardCards;
