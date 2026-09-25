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
  const [mode, setMode] = useState<
    "profit" | "maxbuy" | "card"
  >("profit");

  const [buy, setBuy] = useState("25");
  const [sale, setSale] = useState("100");
  const [shipping, setShipping] = useState("6");
  const [packaging, setPackaging] = useState("1");
  const [grading, setGrading] = useState("0");
  const [marketplace, setMarketplace] = useState("eBay");
  const [targetProfit, setTargetProfit] = useState("25");

  const result = useMemo(() => {
    const b = Math.max(0, Number(buy) || 0);
    const s = Math.max(0, Number(sale) || 0);
    const ship = Math.max(0, Number(shipping) || 0);
    const pack = Math.max(0, Number(packaging) || 0);
    const grade = Math.max(0, Number(grading) || 0);
    const target = Math.max(0, Number(targetProfit) || 0);

    const fee = calculateFee(s, marketplace);

    const total = b + ship + pack + fee;
    const cardTotal = b + ship + pack + fee + grade;

    const profit = s - total;
    const cardProfit = s - cardTotal;

    const maxBuy = Math.max(
      0,
      s - fee - ship - pack - target
    );

    const cardMaxBuy = Math.max(
      0,
      s - fee - ship - pack - grade - target
    );

    return {
      fee,
      total,
      cardTotal,
      profit,
      cardProfit,
      maxBuy,
      cardMaxBuy,
      margin: s ? (profit / s) * 100 : 0,
      cardMargin: s ? (cardProfit / s) * 100 : 0,
      roi: b ? (profit / b) * 100 : 0,
      cardRoi: b ? (cardProfit / b) * 100 : 0,
    };
  }, [
    buy,
    sale,
    shipping,
    packaging,
    grading,
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

          <button
            type="button"
            onClick={() => setMode("card")}
            style={{
              border: "1px solid #d5ded9",
              borderRadius: "999px",
              padding: "10px 18px",
              fontWeight: 700,
              cursor: "pointer",
              background:
                mode === "card" ? "#0b1813" : "#ffffff",
              color:
                mode === "card" ? "#ffffff" : "#0b1813",
            }}
          >
            🏀 Sports Card Flip
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
      ) : mode === "maxbuy" ? (
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
      ) : (
        <>
          <div
            style={{
              background: "#f4f8f6",
              borderRadius: "12px",
              padding: "14px 16px",
              marginBottom: "20px",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            <strong>🏀 Sports Card Flip</strong>
            <br />
            Calculate your potential profit on a sports card,
            including shipping, packaging, marketplace fees,
            and optional grading costs.
          </div>

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
              Expected card sale price
              <input
                value={sale}
                onChange={(e) => setSale(e.target.value)}
                inputMode="decimal"
              />
            </label>

            <label>
              Grading cost
              <input
                value={grading}
                onChange={(e) => setGrading(e.target.value)}
                inputMode="decimal"
              />
            </label>

            <label>
              Shipping
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
              (result.cardProfit >= 0
                ? "positive"
                : "negative")
            }
          >
            <span>Estimated Card Profit</span>

            <strong>
              {result.cardProfit >= 0 ? "+" : ""}
              {money(result.cardProfit)}
            </strong>

            <div className="metrics">
              <div>
                <b>{result.cardMargin.toFixed(1)}%</b>
                <small>Profit Margin</small>
              </div>

              <div>
                <b>{result.cardRoi.toFixed(1)}%</b>
                <small>Return on Investment</small>
              </div>

              <div>
                <b>{money(result.fee)}</b>
                <small>Marketplace Fees</small>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              border: "1px solid #d5ded9",
              borderRadius: "12px",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "8px",
                color: "#53635c",
              }}
            >
              CARD FLIP BREAKDOWN
            </div>

            <div
              style={{
                display: "grid",
                gap: "6px",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Purchase price</span>
                <strong>{money(Number(buy) || 0)}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Grading</span>
                <strong>{money(Number(grading) || 0)}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Shipping + packaging</span>
                <strong>
                  {money(
                    (Number(shipping) || 0) +
                      (Number(packaging) || 0)
                  )}
                </strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Marketplace fees</span>
                <strong>{money(result.fee)}</strong>
              </div>

              <div
                style={{
                  borderTop: "1px solid #d5ded9",
                  marginTop: "6px",
                  paddingTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Total costs</span>
                <strong>{money(result.cardTotal)}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "4px",
                }}
              >
                <span>Potential sale</span>
                <strong>{money(Number(sale) || 0)}</strong>
              </div>
            </div>
          </div>

          <p className="disclaimer">
            Estimates only. Card values, grading costs,
            marketplace fees, shipping, taxes, and selling
            prices can vary. Verify current rates and recent
            market sales before buying.
          </p>
        </>
      )}
    </div>
  );
}
