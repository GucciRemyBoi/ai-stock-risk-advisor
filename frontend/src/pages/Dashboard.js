import React from 'react';
import Sidebar from '../components/Sidebar';
import LineChart from '../components/LineChart';
import RiskGuage from '../components/RiskGuage';
import Alerts from '../components/Alerts';
import SummaryCard from '../components/SummaryCard';

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflor-auto">
                <LineChart />
                <RiskGuage />
                <Alerts />
                <SummaryCard />
            </main>
        </div>
    );
};

export default Dashboard;