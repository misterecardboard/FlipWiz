"use client";

import { useMemo, useState } from "react";

const fees: Record<string, number> = {
  eBay: 0.1325,
  Whatnot: 0.11,
  Mercari: 0.1,
  "Facebook Marketplace": 0,
  Other: 0.1,
};

export default function MaxBuyPrice() {
  const [sale, setSale] = useState("100");
  const [shipping, setShipping] = useState("6");
  const [otherCosts, setOtherCosts] = useState("1");
  const [profitGoal, setProfitGoal] = useState("25");
  const [marketplace, setMarketplace] = useState("eBay");

  const result = useMemo(() => {
    const salePrice = Math.max(0, Number(sale) || 0);
    const shippingCost = Math.max(0, Number(shipping) || 0);
    const costs = Math.max(0, Number(otherCosts) || 0);
    const desiredProfit = Math.max(0, Number(profitGoal) || 0);

    const fee = salePrice * (fees[marketplace] ?? 0.1);

    const maxBuy =
      salePrice - fee - shippingCost - costs - desiredProfit;

    return {
      fee,
      maxBuy: Math.max(0, maxBuy),
    };
  }, [sale, shipping, otherCosts, profitGoal, marketplace]);

  const money = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="calcbox">
      <div className="eyebrow">BUY SMARTER</div>

      <h2 style={{ marginTop: "10px" }}>Maximum Buy Price</h2>

      <p className="sectionIntro">
        Find the most you should pay while still reaching your target profit.
      </p>

      <div className="inputs">
        <label>
          Expected sale price
          <input
            value={sale}
            onChange={(e) => setSale(e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          Shipping cost
          <input
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          Other costs
          <input
            value={otherCosts}
            onChange={(e) => setOtherCosts(e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          Desired profit
          <input
            value={profitGoal}
            onChange={(e) => setProfitGoal(e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          Marketplace
          <select
            value={marketplace}
            onChange={(e) => setMarketplace(e.target.value)}
          >
            {Object.keys(fees).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="result positive">
        <span>Maximum buy price</span>

        <strong>{money(result.maxBuy)}</strong>

        <div className="metrics">
          <div>
            <b>{money(result.fee)}</b>
            <small>Est. marketplace fees</small>
          </div>

          <div>
            <b>{money(Number(profitGoal) || 0)}</b>
            <small>Target profit</small>
          </div>
        </div>
      </div>

      <p className="disclaimer">
        Estimates only. Marketplace fees and other costs can vary. Verify
        current rates before buying.
      </p>
    </div>
  );
}
