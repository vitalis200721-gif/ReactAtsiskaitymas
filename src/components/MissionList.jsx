import React from "react";
import { Typography, Box } from "@material-ui/core";
import MissionItem from "./MissionItem";

export default function MissionList({ missions, onCompleteMission }) {
  const visibleMissions = missions
    .filter((m) => !m.isCompleted)
    .slice(0, 5);

  return (
    <div>
      <Typography variant="h6">Missions (showing 5)</Typography>

      <Box mt={1} display="grid" gridGap={12}>
        {visibleMissions.length === 0 ? (
          <Typography variant="body2" style={{ color: "var(--muted)" }}>
            No missions left 🎉
          </Typography>
        ) : (
          visibleMissions.map((m) => (
            <MissionItem
              key={m.id}
              title={m.title}
              reward={m.reward}
              onClick={() => onCompleteMission(m.id)}
            />
          ))
        )}
      </Box>
    </div>
  );
}

