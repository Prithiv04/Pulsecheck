import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Users, LogIn, Heart } from 'lucide-react';
import classNames from 'classnames';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: Activity },
        { path: '/users', label: 'Users', icon: Users },
        { path: '/moods', label: 'Moods', icon: Heart },
        { path: '/login', label: 'Login', icon: LogIn },
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <Activity className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 text-xl font-bold text-gray-800">PulseCheck</span>
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={classNames(
                                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200',
                                    {
                                        'border-indigo-500 text-gray-900': location.pathname === item.path,
                                        'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': location.pathname !== item.path,
                                    }
                                )}
                            >
                                <item.icon className="w-4 h-4 mr-2" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
