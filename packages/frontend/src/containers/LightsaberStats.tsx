import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";
import "./LightsaberStats.css";
import { useAppContext } from "../lib/contextLib";
import LightsaberBarChart from "../components/LightsaberBarChart";

interface ColorStat {
  color: string;
  count: number;
}

export default function LightsaberStats() {
  const { isAuthenticated } = useAppContext();
  const [stats, setStats] = useState<ColorStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const stats = await loadStats();
        setStats(stats);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadStats() {
    return API.get("api", "/lightsaberStats", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="LightsaberStats">
      <div className="star-wars-body">
        <h1>Lightsaber Color Statistics</h1>
        <div className="scroll-container">
          <div className="holo-screen">
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              <LightsaberBarChart stats={stats} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 