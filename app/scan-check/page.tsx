"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";

export default function ScanCheckPage() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [marketplace, setMarketplace] = useState("eBay");
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageName(file.name);
      setAnalyzed(false);
    }
  };

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const price = Number(purchasePrice || 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7f9fc 0%, #ffffff 50%, #f7f9fc 100%)",
        color: "#111827",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #e5e7eb",
          background: "rgba(255,255,255,0.95)",
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "#111827",
              fontSize: "24px",
              fontWeight: 900,
              letterSpacing: "-0.7px",
            }}
          >
            Flip<span style={{ color: "#6366f1" }}>Wiz</span>
          </a>

          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "#4b5563",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            ← Back to FlipWiz
          </a>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "65px 20px 90px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "#eef2ff",
              color: "#4f46e5",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.8px",
              marginBottom: "12px",
            }}
          >
            FLIPWIZ AI
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(38px, 6vw, 58px)",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              fontWeight: 900,
            }}
          >
            Scan & Check
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "16px auto 0",
              color: "#6b7280",
              fontSize: "17px",
              lineHeight: 1.6,
            }}
          >
            Take a photo of an item and let FlipWiz help you decide whether
            the deal makes sense before you buy.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ margin: "0 0 6px", fontSize: "22px" }}>
            Analyze an Item
          </h2>

          <p
            style={{
              margin: "0 0 22px",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Upload a photo and provide the basic buying information.
          </p>

          <label
            style={{
              display: "block",
              cursor: "pointer",
              border: "2px dashed #cfd4e1",
              borderRadius: "16px",
              padding: "35px 20px",
              textAlign: "center",
              background: "#fafbfe",
              marginBottom: "22px",
            }}
          >
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImage}
              style={{ display: "none" }}
            />

            <div style={{ fontSize: "38px", marginBottom: "8px" }}>📷</div>

            <div
              style={{
                fontWeight: 800,
                fontSize: "16px",
                color: "#111827",
              }}
            >
              {imageName || "Upload or take a photo"}
            </div>

            <div
              style={{
                marginTop: "6px",
                color: "#9ca3af",
                fontSize: "13px",
              }}
            >
              JPG, PNG, or WEBP
            </div>
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "18px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#4b5563",
                  marginBottom: "7px",
                }}
              >
                What is it?
              </label>

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: 1989 Ken Griffey Jr. card"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d9dce5",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#4b5563",
                  marginBottom: "7px",
                }}
              >
                Purchase Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="0.00"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d9dce5",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#4b5563",
                  marginBottom: "7px",
                }}
              >
                Planned Marketplace
              </label>

              <select
                value={marketplace}
                onChange={(e) => setMarketplace(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d9dce5",
                  fontSize: "14px",
                  background: "#ffffff",
                  boxSizing: "border-box",
                }}
              >
                <option>eBay</option>
                <option>Whatnot</option>
                <option>CollX</option>
                <option>CollX Gold</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            style={{
              width: "100%",
              marginTop: "22px",
              padding: "15px",
              borderRadius: "11px",
              border: "none",
              background: "#111827",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Analyze Item
          </button>
        </div>

        {analyzed && (
          <div
            style={{
              marginTop: "24px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: "999px",
                background: "#fff7ed",
                color: "#c2410c",
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.7px",
                marginBottom: "12px",
              }}
            >
              DEMO ANALYSIS
            </div>

            <h2 style={{ margin: "0 0 8px", fontSize: "24px" }}>
              {description || "Item Analysis"}
            </h2>

            <p
              style={{
                margin: "0 0 20px",
                color: "#6b7280",
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              This is the preview version of FlipWiz AI. The actual AI
              identification and market research will be connected next.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "14px",
              }}
            >
              <div
                style={{
                  background: "#f8f9fc",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  Estimated Resale Value
                </div>

                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "25px",
                    fontWeight: 900,
                  }}
                >
                  {money(price * 2)}
                </div>
              </div>

              <div
                style={{
                  background: "#f8f9fc",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  Estimated Profit
                </div>

                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "25px",
                    fontWeight: 900,
                  }}
                >
                  {money(price * 0.7)}
                </div>
              </div>

              <div
                style={{
                  background: "#f8f9fc",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  Suggested Max Buy
                </div>

                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "25px",
                    fontWeight: 900,
                  }}
                >
                  {money(price * 0.6)}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "18px",
                padding: "16px",
                borderRadius: "12px",
                background: "#eef2ff",
                color: "#3730a3",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              <strong>Coming next:</strong> FlipWiz AI will identify the item
              from the photo, research comparable sales, estimate the market
              value, calculate marketplace fees, and provide a buying
              recommendation based on your numbers.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
