import React from "react";
import { Typography, Box } from "@material-ui/core";
import PowerItem from "./PowerItem";

export default function PowerShop({ powers, shopItems, onBuyPower }) {
  return (
    <div>
      <Typography variant="h6">Power Shop</Typography>

      <Box mt={1} display="grid" gridGap={12}>
        {shopItems.map((item) => (
          <PowerItem
            key={item.key}
            title={item.title}
            amount={powers[item.key]}
            cost={item.cost}
            onBuy={() => onBuyPower(item.key, item.cost)}
          />
        ))}
      </Box>
    </div>
  );
}
