import React from "react";
import { Paper, Typography, Box } from "@material-ui/core";

export default function MissionItem({ title, reward, onClick }) {
  return (
    <Paper onClick={onClick} style={styles.item}>
      <Typography variant="subtitle1">{title}</Typography>
      <Box mt={0.5}>
        <Typography variant="body2" style={{ color: "var(--muted)" }}>
          Reward: <b>{reward} 💰</b>
        </Typography>
      </Box>
    </Paper>
  );
}

const styles = {
  item: {
    padding: 12,
    cursor: "pointer",
    background: "var(--card2)",
    border: "1px solid var(--border)"
  }
};

