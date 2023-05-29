import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { LoadingContext } from "../context/load.context";
import { useContext } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

export const TopJobsChart = () => {
  const { jobs, user, months, sumOfAll, sumOfRejectedAll, jobsPerDay } =
    useContext(LoadingContext);
  const isMobile = useMediaQuery();

  const data = [
    { name: "Applied", value: sumOfAll() },
    { name: "Rejected", value: sumOfRejectedAll() },
    { name: "Follow Ups", value: user?.totalFollowUps },
    { name: "Jobs Per Day", value: jobsPerDay() },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      {isMobile ? (
        <div className="mainColor rounded-md  flex items center my-5 mx-5">
          <ResponsiveContainer width="96%" height={400}>
            <PieChart width={600} height={600}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                // outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="mainColor rounded-md w-11/12 flex items center my-5 mx-5">
          <ResponsiveContainer width="96%" height={400}>
            <PieChart width={600} height={600}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                // outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};
