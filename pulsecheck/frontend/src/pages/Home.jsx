import React from 'react';
import { CheckCircle } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl w-full">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">PulseCheck API is Running 🚀</h1>
                <div className="flex items-center justify-center space-x-2 mb-8">
                    <CheckCircle className="text-green-500 w-6 h-6" />
                    <span className="text-lg font-medium text-green-600">System Online</span>
                </div>

                <p className="text-gray-600 mb-8">
                    Welcome to the PulseCheck Mental Health Tracker dashboard.
                    Use the navigation menu to access different modules.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <h3 className="font-semibold text-lg mb-2">User Management</h3>
                        <p className="text-sm text-gray-500">View and manage registered users.</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <h3 className="font-semibold text-lg mb-2">Mood Tracking</h3>
                        <p className="text-sm text-gray-500">Log and analyze emotional trends.</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gray-50">
                        <h3 className="font-semibold text-lg mb-2">Secure Access</h3>
                        <p className="text-sm text-gray-500">Authenticated entry to sensitive data.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
