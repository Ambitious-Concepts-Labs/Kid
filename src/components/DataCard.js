import React from "react";

// Utility function to format the price
const formatPrice = (value) => {
  return `$${value.toFixed(2)}`;
};

// Basic Card components
const Card = ({ children }) => (
  <div className="border rounded-lg shadow-sm p-4 bg-white">{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div
    className={`flex flex-row items-center justify-between pb-2 ${className}`}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-sm font-medium ${className}`}>{children}</h2>
);

const CardContent = ({ children }) => <div>{children}</div>;

// DataCard component
const DataCard = ({ value, label, shouldFormat }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
