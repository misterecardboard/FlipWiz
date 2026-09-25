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

export default function CardDealAnalyzer() {
  const [marketValue, setMarketValue] = useState("100");
  const [askingPrice, setAskingPrice] = useState("45");
  const [shipping, setShipping] = useState("6");
  const [packaging, setPackaging] = useState("1");
  const [marketplace, setMarketplace] = useState("CollX");

  const result = useMemo(() => {
    const market = Math.max(0, Number(marketValue) || 0);
    const asking = Math.max(0, Number(askingPrice) || 0);
    const ship = Math.max(0, Number(shipping) || 0);
    const pack = Math.max(0, Number(packaging) || 0);

    const fee = calculateFee(market, marketplace);
    const totalCosts = asking + ship + pack + fee;
    const netProfit = market - totalCosts;

    const discount =
      market > 0 ? ((market - asking) / market) * 100 : 0;

    const upside =
      asking > 0 ? ((market - asking) / asking) * 100 : 0;

    return {
      fee,
      totalCosts,
      netProfit,
      discount,
      upside,
    };
  }, [
    marketValue,
    askingPrice,
    shipping,
    packaging,
    marketplace,
  ]);

  const money = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="calcbox">
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            marginBottom: "6px",
            color: "#0b1813",
          }}
        >
          🃏 Card Deal Analyzer
        </div>

        <p
          style={{
            margin: 0,
            color: "#53635c",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          Compare a seller's asking price against the card's
          estimated market value before you buy.
        </p>
      </div>

      <div className="inputs">
        <label>
          Estimated market value
          <input
            value={marketValue}
            onChange={(e) => setMarketValue(e.target.value)}
            inputMode="decimal"
            placeholder="100"
          />
        </label>

        <label>
          Seller asking price
          <input
            value={askingPrice}
            onChange={(e) => setAskingPrice(e.target.value)}
            inputMode="decimal"
            placeholder="45"
          />
        </label>

        <label>
          Expected shipping
          <input
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            inputMode="decimal"
            placeholder="6"
          />
        </label>

        <label>
          Packaging
          <input
            value={packaging}
            onChange={(e) => setPackaging(e.target.value)}
            inputMode="decimal"
            placeholder="1"
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

      <div
        className={
          "result " +
          (result.netProfit >= 0
            ? "positive"
            : "negative")
        }
      >
        <span>Potential Net Profit</span>

        <strong>
          {result.netProfit >= 0 ? "+" : ""}
          {money(result.netProfit)}
        </strong>

        <div className="metrics">
          <div>
            <b>{result.discount.toFixed(1)}%</b>
            <small>Below Market</small>
          </div>

          <div>
            <b>{result.upside.toFixed(1)}%</b>
            <small>Potential Upside</small>
          </div>

          <div>
            <b>{money(result.fee)}</b>
            <small>Est. Fees</small>
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
            marginBottom: "10px",
            color: "#53635c",
          }}
        >
          DEAL BREAKDOWN
        </div>

        <div
          style={{
            display: "grid",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Market value</span>
            <strong>{money(Number(marketValue) || 0)}</strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Asking price</span>
            <strong>{money(Number(askingPrice) || 0)}</strong>
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
            <span>Estimated marketplace fees</span>
            <strong>{money(result.fee)}</strong>
          </div>

          <div
            style={{
              borderTop: "1px solid #d5ded9",
              paddingTop: "10px",
              marginTop: "4px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Total estimated cost</span>
            <strong>{money(result.totalCosts)}</strong>
          </div>
        </div>
      </div>

      <p className="disclaimer">
        Market value is user-entered and should be based on
        recent comparable sales. Actual selling prices, fees,
        shipping, taxes, and condition can vary.
      </p>
    </div>
  );
}
