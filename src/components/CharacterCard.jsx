import React from "react";
import { Paper, Typography, Box } from "@material-ui/core";

export default function CharacterCard({ money }) {
  return (
    <Paper style={styles.card}>
      <Typography variant="h6">Character</Typography>
      <Box mt={1}>
        <Typography variant="body1">
          Money: <b>{money} 💰</b>
        </Typography>
      </Box>
    </Paper>
  );
}

const styles = {
  card: {
    padding: 16,
    background: "var(--card)",
    border: "1px solid var(--border)"
  }
};

