// import { getAnalytics } from "@/actions/getAnalytics";
// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
import React from "react";
import DataCard from "../../components/DataCard";
import Chart from "../../components/Chart";
import Layout from "../../components/Dashboard/Layout";

const Analytics = () => {
//   const { userId } = auth();

//   if (!userId) return redirect("/");

//   const { data, totalRevenue, totalSales } = await getAnalytics(userId);

    const totalRevenue = 1000;
    const totalSales = 100;
    const data = [
        { name: "Jan", sales: 100 },
        { name: "Feb", sales: 200 },
        { name: "Mar", sales: 300 },
        { name: "Apr", sales: 400 },
        { name: "May", sales: 500 },
        { name: "Jun", sales: 600 },
        { name: "Jul", sales: 700 },
        { name: "Aug", sales: 800 },
        { name: "Sep", sales: 900 },
        { name: "Oct", sales: 1000 },
        { name: "Nov", sales: 1100 },
        { name: "Dec", sales: 1200 },
    ];
  return (
    <Layout>
        <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
            <DataCard label="Total Sales" value={totalSales} />
        </div>
        <Chart data={data} />
        </div>
    </Layout>
  );
};

export default Analytics;
