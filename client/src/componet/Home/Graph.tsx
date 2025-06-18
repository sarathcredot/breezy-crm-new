
import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const clientData = [
    { month: 'Jan', newClients: 10 },
    { month: 'Feb', newClients: 15 },
    { month: 'Mar', newClients: 8 },
    { month: 'Apr', newClients: 20 },
    { month: 'May', newClients: 0 },
    { month: 'Jun', newClients: 0 },
    { month: 'Jul', newClients: 0 },
    { month: 'Aug', newClients: 0 },
    { month: 'Sep', newClients: 0 },
    { month: 'Oct', newClients: 0 },
    { month: 'Nov', newClients: 0 },
    { month: 'Dec', newClients: 0 },
];

function Graph() {
    return (
        <div className="w-full h-[500px] ">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="newClients" fill="#4f46e5" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graph