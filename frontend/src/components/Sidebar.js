import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-64 bg-indigo-700 text-white flex-col p-4">
            <h2 className="text-2xl font-bold mb-6">Aegis</h2>
            <nav clasName="space-y-2">
                <a href="/" className="block hover:text-indigo-300">Dashboard</a>
                <a href="/" className="block hover:text-indigo-300">Reports</a>
                <a href="/" className="block hover:text-indigo-300">Settings</a>
            </nav>
        </div>
    );
};

export default Sidebar;