import React, { useEffect, useState } from 'react';
import { moodService } from '../services/api';
import { Smile, Frown, Meh, Activity } from 'lucide-react';

const Moods = () => {
    const [moods, setMoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const response = await moodService.getAllMoods();
                setMoods(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                setError('Failed to fetch mood logs.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMoods();
    }, []);

    const getMoodIcon = (mood) => {
        const m = mood.toLowerCase();
        if (m.includes('happy') || m.includes('good') || m.includes('calm')) return <Smile className="text-green-500" />;
        if (m.includes('sad') || m.includes('bad') || m.includes('stressed')) return <Frown className="text-red-500" />;
        if (m.includes('neutral') || m.includes('okay')) return <Meh className="text-yellow-500" />;
        return <Activity className="text-blue-500" />;
    };

    if (loading) return <div className="text-center py-10">Loading mood logs...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Mood Logs</h2>
            {moods.length === 0 ? (
                <div className="text-center p-10 bg-white rounded shadow">
                    <p className="text-gray-500">No mood logs found.</p>
                    <p className="text-sm text-gray-400 mt-2">Start using the tracker to see data here!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {moods.map((log) => (
                        <div key={log._id || Math.random()} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-gray-100 rounded-full">
                                    {getMoodIcon(log.mood || 'unknown')}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{log.mood || 'Unknown Mood'}</h4>
                                    <p className="text-sm text-gray-500">{new Date(log.date).toLocaleDateString()} {new Date(log.date).toLocaleTimeString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                    Reading: {log.reading || 'N/A'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Moods;
