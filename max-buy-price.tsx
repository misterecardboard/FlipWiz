"use client";

import { useMemo, useState } from "react";

const marketplaceFees: Record<string, number> = {
  eBay: 13.25,
  Whatnot: 11,
  Mercari: 10,
  "Facebook Marketplace": 0,
  Other: 10,
};

export default function MaxBuyPrice() {
  const [salePrice, setSalePrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [otherCosts, setOtherCosts] = useState("");
  const [profitGoal, setProfitGoal] = useState("");
  const [marketplace, setMarketplace] = useState("eBay");

  const result = useMemo(() => {
    const sale = parseFloat(salePrice) || 0;
    const ship = parseFloat(shipping) || 0;
    const costs = parseFloat(otherCosts) || 0;
    const profit = parseFloat(profitGoal) || 0;

    const feeRate = marketplaceFees[marketplace] / 100;
    const fees = sale * feeRate;

    const maxBuy = sale - fees - ship - costs - profit;

    return {
      fees,
      maxBuy: Math.max(0, maxBuy),
    };
  }, [salePrice, shipping, otherCosts, profitGoal, marketplace]);

  return (
    <section className="tool-section" id="max-buy-price">
      <div className="tool-card">
        <div className="tool-card-header">
          <div>
            <span className="eyebrow">BUY SMARTER</span>
            <h2>Maximum Buy Price</h2>
            <p>
              Find the most you should pay for an item while still hitting
              your target profit.
            </p>
          </div>
        </div>

        <div className="calculator-grid">
          <div className="calculator-inputs">
            <label>
              Expected Sale Price
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="$100"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </label>

            <label>
              Shipping Cost
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="$8"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              />
            </label>

            <label>
              Other Costs
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="$0"
                value={otherCosts}
                onChange={(e) => setOtherCosts(e.target.value)}
              />
            </label>

            <label>
              Desired Profit
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="$25"
                value={profitGoal}
                onChange={(e) => setProfitGoal(e.target.value)}
              />
            </label>

            <label>
              Marketplace
              <select
                value={marketplace}
                onChange={(e) => setMarketplace(e.target.value)}
              >
                {Object.keys(marketplaceFees).map((name) => (
                  <option key={name} value={name}>
                    {name} ({marketplaceFees[name]}% fee)
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="calculator-result">
            <span>MAXIMUM BUY PRICE</span>

            <strong>${result.maxBuy.toFixed(2)}</strong>

            <p>
              That's the most you should pay based on the numbers you entered.
            </p>

            <div className="result-detail">
              <span>Estimated marketplace fees</span>
              <strong>${result.fees.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <p className="calculator-disclaimer">
          Marketplace fees are estimates and may vary by category,
          promotions, payment processing, shipping arrangements, and other
          marketplace-specific charges. Always verify current fees before
          making a purchase.
        </p>
      </div>
    </section>
  );
}
