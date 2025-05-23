import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import "./LightsaberBarChart.css";

interface ColorStat {
  color: string;
  count: number;
}

const STAR_WARS_YELLOW = "#FFE81F";

// Map of lightsaber colors to their hex values
const colorMap: { [key: string]: string } = {
  blue: "#0088FE",
  green: "#00C49F",
  purple: "#8884d8",
  red: "#FF0000",
  yellow: STAR_WARS_YELLOW,
  white: "#FFFFFF"
};

interface LightsaberBarChartProps {
  stats: ColorStat[];
}

export default function LightsaberBarChart({ stats }: LightsaberBarChartProps) {
  function getBarColor(color: string) {
    return colorMap[color.toLowerCase()] || STAR_WARS_YELLOW;
  }

  // Sort colors alphabetically
  function sortStats(stats: ColorStat[]) {
    return [...stats].sort((a, b) => 
      a.color.toLowerCase().localeCompare(b.color.toLowerCase())
    );
  }

  const sortedStats = sortStats(stats);

  return (
    <div className="stats-container">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart 
          data={sortedStats}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3"
            stroke={STAR_WARS_YELLOW}
            opacity={0.2}
          />
          <XAxis 
            dataKey="color" 
            tick={{ fill: STAR_WARS_YELLOW }}
            stroke={STAR_WARS_YELLOW}
            label={{ 
              value: "Colors", 
              fill: STAR_WARS_YELLOW,
              position: "bottom",
              offset: 0
            }}
          />
          <YAxis 
            tick={{ fill: STAR_WARS_YELLOW }}
            stroke={STAR_WARS_YELLOW}
            tickFormatter={(value) => Math.round(value).toString()}
            allowDecimals={false}
            label={{ 
              value: "Number of Selections", 
              angle: -90, 
              position: "insideLeft",
              fill: STAR_WARS_YELLOW,
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#000000",
              border: `1px solid ${STAR_WARS_YELLOW}`,
              color: STAR_WARS_YELLOW
            }}
            labelStyle={{ color: STAR_WARS_YELLOW }}
            itemStyle={{ color: STAR_WARS_YELLOW }}
            formatter={(value) => [Math.round(Number(value)).toString(), "Selections"]}
          />
          <Bar
            dataKey="count"
            name="Colors"
          >
            {sortedStats.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={getBarColor(entry.color)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 