"use client";

import { useMemo, useState } from "react";

const fees: Record<string, number> = {
  eBay: 0.1325,
  Whatnot: 0.11,
  Mercari: 0.1,
  CollX: 0.1,
  "CollX Gold": 0.08,
  "Facebook Marketplace": 0,
  Other: 0.1,
};

function calculateFee(sale: number, marketplace: string) {
  if (marketplace === "CollX Gold") {
    const firstTier = Math.min(sale, 2500);
    const secondTier = Math.max(0, sale - 2500);

    return firstTier * 0.08 + secondTier * 0.03;
  }

  return sale * (fees[marketplace] ?? 0.1);
}

export function ProfitCalculator() {
  const [mode, setMode] = useState<"profit" | "maxbuy">("profit");

  const [buy, setBuy] = useState("25");
  const [sale, setSale] = useState("100");
  const [shipping, setShipping] = useState("6");
  const [packaging, setPackaging] = useState("1");
  const [marketplace, setMarketplace] = useState("eBay");
  const [targetProfit, setTargetProfit] = useState("25");

  const result = useMemo(() => {
    const b = Math.max(0, Number(buy) || 0);
    const s = Math.max(0, Number(sale) || 0);
    const ship = Math.max(0, Number(shipping) || 0);
    const pack = Math.max(0, Number(packaging) || 0);
    const target = Math.max(0, Number(targetProfit) || 0);

    const fee = calculateFee(s, marketplace);

    const total = b + ship + pack + fee;
    const profit = s - total;

    const maxBuy = Math.max(
      0,
      s - fee - ship - pack - target
    );

    return {
      fee,
      total,
      profit,
      maxBuy,
      margin: s ? (profit / s) * 100 : 0,
      roi: b ? (profit / b) * 100 : 0,
    };
  }, [
    buy,
    sale,
    shipping,
    packaging,
    marketplace,
    targetProfit,
  ]);

  const money = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="calcbox">
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            marginBottom: "10px",
            color: "#0b1813",
          }}
        >
          What do you want to calculate?
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setMode("profit")}
            style={{
              border: "1px solid #d5ded9",
              borderRadius: "999px",
              padding: "10px 18px",
              fontWeight: 700,
              cursor: "pointer",
              background:
                mode === "profit" ? "#0b1813" : "#ffffff",
              color:
                mode === "profit" ? "#ffffff" : "#0b1813",
            }}
          >
            💰 Profit
          </button>

          <button
            type="button"
            onClick={() => setMode("maxbuy")}
            style={{
              border: "1px solid #d5ded9",
              borderRadius: "999px",
              padding: "10px 18px",
              fontWeight: 700,
              cursor: "pointer",
              background:
                mode === "maxbuy" ? "#0b1813" : "#ffffff",
              color:
                mode === "maxbuy" ? "#ffffff" : "#0b1813",
            }}
          >
            🛒 Maximum Buy Price
          </button>
        </div>
      </div>

      {mode === "profit" ? (
        <>
          <div className="inputs">
            <label>
              Purchase price
              <input
                value={buy}
                onChange={(e) => setBuy(e.target.value)}
                inputMode="decimal"
              />
            </label>

            <label>
              Expected sale price
              <input
                value={sale}
                onChange={(e) => setSale(e.target.value)}
                inputMode="decimal"
              />
            </label>

            <label>
              Seller shipping
              <input
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                inputMode="decimal"
              />
            </label>

            <label>
              Packaging
              <input
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                inputMode="decimal"
              />
            </label>

            <label>
              Marketplace
              <select
                value={marketplace}
                onChange={(e) =>
                  setMarketplace(e.target.value)
                }
              >
                {Object.keys(fees).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div
            className={
              "result " +
              (result.profit >= 0
                ? "positive"
                : "negative")
            }
          >
            <span>Estimated Profit</span>

            <strong>
              {result.profit >= 0 ? "+" : ""}
              {money(result.profit)}
            </strong>

            <div className="metrics">
              <div>
                <b>{result.margin.toFixed(1)}%</b>
                <small>Profit Margin</small>
              </div>

              <div>
                <b>{result.roi.toFixed(1)}%</b>
                <small>Return on Investment</small>
              </div>

              <div>
                <b>{money(result.fee)}</b>
                <small>Marketplace Fees</small>
              </div>
            </div>
          </div>

          <p className="disclaimer">
            Estimates only. Marketplace fees, shipping, taxes,
            and policies can vary. Verify current rates before
            buying.
          </p>
        </>
      ) : (
        <>
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
              Seller shipping
              <input
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                inputMode="decimal"
              />
            </label>

            <label>
              Packaging
              <input
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                inputMode="decimal"
              />
            </label>

            <label>
              Target profit
              <input
                value={targetProfit}
                onChange={(e) =>
                  setTargetProfit(e.target.value)
                }
                inputMode="decimal"
              />
            </label>

            <label>
              Marketplace
              <select
                value={marketplace}
                onChange={(e) =>
                  setMarketplace(e.target.value)
                }
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
            <span>Maximum Buy Price</span>

            <strong>{money(result.maxBuy)}</strong>

            <div className="metrics">
              <div>
                <b>{money(result.fee)}</b>
                <small>Marketplace Fees</small>
              </div>

              <div>
                <b>{money(result.maxBuy)}</b>
                <small>Maximum Purchase</small>
              </div>

              <div>
                <b>{money(Number(targetProfit) || 0)}</b>
                <small>Target Profit</small>
              </div>
            </div>
          </div>

          <p className="disclaimer">
            Your maximum buy price is the most you could pay
            while still reaching your target profit based on the
            numbers entered. Marketplace fees and other costs
            can vary.
          </p>
        </>
      )}
    </div>
  );
}
