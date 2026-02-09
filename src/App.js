import React, { useEffect, useMemo, useState } from "react";
import { Container, Box, Typography, Paper, Button } from "@material-ui/core";

import missionsData from "./data/missions";
import CharacterCard from "./components/CharacterCard";
import MissionList from "./components/MissionList";
import PowerShop from "./components/PowerShop";

export default function App() {
  // --- state ---
  const [missions, setMissions] = useState(missionsData);
  const [money, setMoney] = useState(0);

  // (10) atskiri state kiekvienai galiai
  const [strength, setStrength] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [luck, setLuck] = useState(0);

  // (16) error tekstas
  const [error, setError] = useState("");

  // Unmount demonstracijai (kad matytųsi useEffect cleanup)
  const [showGame, setShowGame] = useState(true);

  // --- shop config ---
  const shopItems = useMemo(
    () => [
      { key: "strength", title: "Strength", cost: 50 },
      { key: "speed", title: "Speed", cost: 40 },
      { key: "luck", title: "Luck", cost: 30 }
    ],
    []
  );

  const minCost = useMemo(() => Math.min(...shopItems.map((s) => s.cost)), [shopItems]);

  const powers = useMemo(
    () => ({ strength, speed, luck }),
    [strength, speed, luck]
  );

  // --- useEffects (minimalūs, aiškūs) ---
  // 1) Mount + Unmount
  useEffect(() => {
    console.log("Game mounted");
    return () => console.log("Game unmounted");
  }, []);

  // 2) Update kai keičiasi money
  useEffect(() => {
    console.log("Money changed:", money);
  }, [money]);

  // 3) Update kai keičiasi missions (kiek atlikta)
  useEffect(() => {
    const completed = missions.filter((m) => m.isCompleted).length;
    console.log("Missions completed:", completed);
  }, [missions]);

  // (17) jei vėl užtenka bent vienam pirkimui – klaida dingsta
  useEffect(() => {
    if (error && money >= minCost) setError("");
  }, [money, minCost, error]);

  // --- actions ---
  // (5,8,9) misijos atlikimas
  const completeMission = (missionId) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.isCompleted) return;

    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, isCompleted: true } : m))
    );
    setMoney((prev) => prev + mission.reward);
  };

  // (15) viena funkcija pirkimui
  const buyPower = (powerKey, cost) => {
    // (14,16) apsauga
    if (money < cost) {
      setError("Not enough money");
      return;
    }

    setMoney((prev) => prev - cost);

    // (10) atskiri state (paprasta ir aišku)
    if (powerKey === "strength") setStrength((p) => p + 1);
    if (powerKey === "speed") setSpeed((p) => p + 1);
    if (powerKey === "luck") setLuck((p) => p + 1);

    setError("");
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Character Game</Typography>
        <Button variant="outlined" color="primary" onClick={() => setShowGame((p) => !p)}>
          {showGame ? "Hide game" : "Show game"}
        </Button>
      </Box>

      {!showGame ? (
        <Typography variant="body1" style={{ color: "var(--muted)" }}>
          Game hidden (toggle to mount/unmount).
        </Typography>
      ) : (
        <>
          <Box display="grid" gridGap={16} style={{ gridTemplateColumns: "1fr 1fr" }}>
            <CharacterCard money={money} />

            <Paper style={styles.card}>
              <Typography variant="h6">Powers</Typography>
              <Typography variant="body2" style={{ color: "var(--muted)", marginTop: 8 }}>
                Strength: <b>{strength}</b> | Speed: <b>{speed}</b> | Luck: <b>{luck}</b>
              </Typography>
            </Paper>
          </Box>

          <Box mt={3} display="grid" gridGap={24} style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Paper style={styles.card}>
              <MissionList missions={missions} onCompleteMission={completeMission} />
            </Paper>

            <Paper style={styles.card}>
              <PowerShop powers={powers} shopItems={shopItems} onBuyPower={buyPower} />
            </Paper>
          </Box>

          <Box mt={3}>
            {error && (
              <Typography style={{ color: "var(--danger)", fontWeight: "bold" }}>
                {error}
              </Typography>
            )}
          </Box>
        </>
      )}
    </Container>
  );
}

const styles = {
  card: {
    padding: 16,
    background: "var(--card)",
    border: "1px solid var(--border)"
  }
};
