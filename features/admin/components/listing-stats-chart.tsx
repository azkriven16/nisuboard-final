"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface ListingStatsChartProps {
    data: {
        approved: number;
        pending: number;
    };
}

export default function ListingStatsChart({ data }: ListingStatsChartProps) {
    const COLORS = ["#00C49F", "#FFBB28"];

    const chartData = [
        { name: "Approved", value: data.approved },
        { name: "Pending", value: data.pending },
    ];

    const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <div className="w-full h-[20rem] md:h-[30rem]">
            <h2 className="text-lg font-semibold mb-4">Listing Statistics</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        dataKey="value"
                        nameKey="name"
                        label={({ value }) => `${value}`}
                        labelLine={false}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xl dark:invert"
                    >
                        {`Total\n${total}`}
                    </text>
                    <Tooltip />
                    <Legend
                        wrapperStyle={{
                            fontSize: "12px",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
