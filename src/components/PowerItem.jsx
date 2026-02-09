import React from "react";
import { Paper, Typography, Button, Box } from "@material-ui/core";

export default function PowerItem({ title, amount, cost, onBuy }) {
  return (
    <Paper style={styles.item}>
      <Typography variant="subtitle1">{title}</Typography>

      <Box mt={0.5} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" style={{ color: "var(--muted)" }}>
          Owned: <b>{amount}</b>
        </Typography>
        <Typography variant="body2" style={{ color: "var(--muted)" }}>
          Cost: <b>{cost} 💰</b>
        </Typography>
      </Box>

      <Box mt={1}>
        <Button variant="contained" color="primary" onClick={onBuy}>
          BUY +1
        </Button>
      </Box>
    </Paper>
  );
}

const styles = {
  item: {
    padding: 12,
    background: "var(--card2)",
    border: "1px solid var(--border)"
  }
};
