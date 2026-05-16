import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TaskStatusData {
  name: string;
  value: number;
}

interface Props {
  taskStatusCounts: TaskStatusData[];
}

const COLORS = [
  "#3B82F6",
  "#F59E0B",
  "#10B981",
];

export const DashboardCharts: React.FC<
  Props
> = ({
  taskStatusCounts,
}) => {

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Task Analytics
          </h2>

          <p className="text-gray-400 mt-2">
            Realtime productivity insights
          </p>

        </div>

      </div>

      {/* Chart */}
      <div className="w-full h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={
                taskStatusCounts
              }
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              innerRadius={70}
              paddingAngle={5}
              label
            >

              {taskStatusCounts.map(
                (
                  _,
                  index
                ) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};