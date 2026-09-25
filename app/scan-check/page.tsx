"use client";

import { useState } from "react";

export default function ScanCheckPage() {
  const [item, setItem] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [marketplace, setMarketplace] = useState("eBay");
  const [checked, setChecked] = useState(false);

  const price = Number(buyPrice) || 0;
  const estimatedValue = price * 2;
  const estimatedFees = estimatedValue * 0.1325;
  const estimatedProfit = estimatedValue - price - estimatedFees;
  const maxBuy = estimatedValue * 0.6;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f8fc",
        color: "#111827",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "18px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "#111827",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            Flip<span style={{ color: "#6366f1" }}>Wiz</span>
          </a>

          <a
            href="/"
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            ← Back
          </a>
        </div>
      </header>

      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "70px 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <div
            style={{
              display: "inline-block",
              background: "#eef2ff",
              color: "#4f46e5",
              padding: "7px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            FLIPWIZ AI
          </div>

          <h1
            style={{
              fontSize: "52px",
              margin: 0,
              fontWeight: 900,
              letterSpacing: "-2px",
            }}
          >
            Scan & Check
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "17px",
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: "15px auto",
            }}
          >
            Check an item before you buy it and see what the numbers could
            look like when you resell it.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 10px 30px rgba(0,0,0,.05)",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Item
          </label>

          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Example: 1989 Ken Griffey Jr. card"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              marginBottom: "20px",
              fontSize: "15px",
            }}
          />

          <label
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Purchase Price
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="25.00"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              marginBottom: "20px",
              fontSize: "15px",
            }}
          />

          <label
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Planned Marketplace
          </label>

          <select
            value={marketplace}
            onChange={(e) => setMarketplace(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              marginBottom: "20px",
              fontSize: "15px",
              background: "#ffffff",
            }}
          >
            <option>eBay</option>
            <option>Whatnot</option>
            <option>CollX</option>
            <option>Other</option>
          </select>

          <button
            onClick={() => setChecked(true)}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#111827",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Check This Deal
          </button>
        </div>

        {checked && (
          <div
            style={{
              marginTop: "25px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "28px",
            }}
          >
            <div
              style={{
                color: "#4f46e5",
                fontWeight: 800,
                fontSize: "12px",
                marginBottom: "8px",
              }}
            >
              FLIPWIZ PREVIEW
            </div>

            <h2 style={{ margin: "0 0 8px" }}>
              {item || "Item Analysis"}
            </h2>

            <p style={{ color: "#6b7280" }}>
              This is the first working version of Scan & Check. AI image
              identification and live market research will be connected next.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "14px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  background: "#f3f4f6",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <small>Estimated Resale</small>
                <h2>${estimatedValue.toFixed(2)}</h2>
              </div>

              <div
                style={{
                  background: "#f3f4f6",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <small>Estimated Profit</small>
                <h2>${estimatedProfit.toFixed(2)}</h2>
              </div>

              <div
                style={{
                  background: "#f3f4f6",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <small>Suggested Max Buy</small>
                <h2>${maxBuy.toFixed(2)}</h2>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
