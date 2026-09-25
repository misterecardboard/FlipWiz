"use client";

import { useMemo, useState } from "react";

const MARKETPLACES = [
  {
    name: "eBay",
    rate: 0.1325,
    description: "Estimated 13.25% selling fee",
  },
  {
    name: "Whatnot",
    rate: 0.11,
    description: "Estimated 11% selling fee",
  },
  {
    name: "CollX",
    rate: 0.1,
    description: "Estimated 10% selling fee",
  },
  {
    name: "CollX Gold",
    rate: 0.08,
    description: "8% first $2,500 / 3% above",
  },
  {
    name: "Other",
    rate: 0.1,
    description: "Estimated 10% selling fee",
  },
];

function calculateMarketplaceFee(
  salePrice: number,
  marketplace: string
) {
  if (salePrice <= 0) return 0;

  if (marketplace === "CollX Gold") {
    const firstTier = Math.min(salePrice, 2500);
    const secondTier = Math.max(salePrice - 2500, 0);

    return firstTier * 0.08 + secondTier * 0.03;
  }

  const marketplaceData = MARKETPLACES.find(
    (item) => item.name === marketplace
  );

  return salePrice * (marketplaceData?.rate ?? 0.1);
}

export default function MarketplaceComparison() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [inboundShipping, setInboundShipping] = useState(0);
  const [outboundShipping, setOutboundShipping] = useState(0);
  const [packaging, setPackaging] = useState(0);
  const [repairs, setRepairs] = useState(0);
  const [grading, setGrading] = useState(0);
  const [otherCosts, setOtherCosts] = useState(0);

  const results = useMemo(() => {
    const fixedCosts =
      purchasePrice +
      inboundShipping +
      outboundShipping +
      packaging +
      repairs +
      grading +
      otherCosts;

    return MARKETPLACES.map((marketplace) => {
      const fee = calculateMarketplaceFee(
        salePrice,
        marketplace.name
      );

      const totalCosts = fixedCosts + fee;

      const profit = salePrice - totalCosts;

      const roi =
        purchasePrice +
          inboundShipping +
          repairs +
          grading +
          otherCosts >
        0
          ? (profit /
              (purchasePrice +
                inboundShipping +
                repairs +
                grading +
                otherCosts)) *
            100
          : 0;

      const margin =
        salePrice > 0
          ? (profit / salePrice) * 100
          : 0;

      return {
        ...marketplace,
        fee,
        totalCosts,
        profit,
        roi,
        margin,
      };
    });
  }, [
    purchasePrice,
    salePrice,
    inboundShipping,
    outboundShipping,
    packaging,
    repairs,
    grading,
    otherCosts,
  ]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const percent = (value: number) =>
    `${value.toFixed(1)}%`;

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #d9dce5",
    background: "#ffffff",
    color: "#111827",
    fontSize: "15px",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#4b5563",
    marginBottom: "7px",
  };

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "20px",
        padding: "24px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 10px",
            borderRadius: "999px",
            background: "#eef2ff",
            color: "#4f46e5",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.7px",
            marginBottom: "10px",
          }}
        >
          MARKETPLACE COMPARISON
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: "30px",
            letterSpacing: "-0.8px",
            color: "#111827",
          }}
        >
          Where should you sell it?
        </h2>

        <p
          style={{
            maxWidth: "620px",
            margin: "10px auto 0",
            color: "#6b7280",
            lineHeight: 1.6,
            fontSize: "14px",
          }}
        >
          Enter the same flip once and FlipWiz will show how
          marketplace fees affect your potential profit.
        </p>
      </div>

      {/* INPUTS */}

      <div
        style={{
          background: "#f8f9fc",
          border: "1px solid #e7e9f0",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <h3
          style={{
            margin: "0 0 16px",
            fontSize: "18px",
            color: "#111827",
          }}
        >
          Flip Details
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          <div>
            <label style={labelStyle}>
              Purchase Price
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={purchasePrice || ""}
              onChange={(e) =>
                setPurchasePrice(
                  Number(e.target.value)
                )
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Expected Sale Price
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={salePrice || ""}
              onChange={(e) =>
                setSalePrice(
                  Number(e.target.value)
                )
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Shipping to You
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={inboundShipping || ""}
              onChange={(e) =>
                setInboundShipping(
                  Number(e.target.value)
                )
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Seller Shipping
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={outboundShipping || ""}
              onChange={(e) =>
                setOutboundShipping(
                  Number(e.target.value)
                )
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Packaging
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={packaging || ""}
              onChange={(e) =>
                setPackaging(
                  Number(e.target.value)
                )
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Repairs / Cleaning
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={repairs || ""}
              onChange={(e) =>
                setRepairs(
                  Number(e.target.value)
                )
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Grading
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={grading || ""}
              onChange={(e) =>
                setGrading(
                  Number(e.target.value)
                )
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Other Costs
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={otherCosts || ""}
              onChange={(e) =>
                setOtherCosts(
                  Number(e.target.value)
                )
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* RESULTS */}

      <div style={{ marginTop: "24px" }}>
        <h3
          style={{
            margin: "0 0 14px",
            fontSize: "20px",
            color: "#111827",
          }}
        >
          Estimated Results
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
          }}
        >
          {results.map((result) => (
            <div
              key={result.name}
              style={{
                border:
                  result.name === "CollX Gold"
                    ? "2px solid #6366f1"
                    : "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "18px",
                background:
                  result.name === "CollX Gold"
                    ? "#f8f8ff"
                    : "#ffffff",
              }}
            >
              {result.name === "CollX Gold" && (
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "999px",
                    background: "#6366f1",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: 800,
                    marginBottom: "8px",
                  }}
                >
                  GOLD
                </div>
              )}

              <h4
                style={{
                  margin: "0 0 4px",
                  fontSize: "18px",
                  color: "#111827",
                }}
              >
                {result.name}
              </h4>

              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  marginBottom: "15px",
                }}
              >
                {result.description}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "3px",
                }}
              >
                Estimated Profit
              </div>

              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 900,
                  color:
                    result.profit >= 0
                      ? "#111827"
                      : "#dc2626",
                  marginBottom: "14px",
                }}
              >
                {money(result.profit)}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    background: "#f8f9fc",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
                    }}
                  >
                    Fees
                  </div>

                  <strong
                    style={{
                      fontSize: "14px",
                      color: "#111827",
                    }}
                  >
                    {money(result.fee)}
                  </strong>
                </div>

                <div
                  style={{
                    background: "#f8f9fc",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
                    }}
                  >
                    ROI
                  </div>

                  <strong
                    style={{
                      fontSize: "14px",
                      color: "#111827",
                    }}
                  >
                    {percent(result.roi)}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                Total costs:{" "}
                <strong style={{ color: "#374151" }}>
                  {money(result.totalCosts)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEE DIFFERENCE */}

      {salePrice > 0 && (
        <div
          style={{
            marginTop: "22px",
            padding: "18px",
            borderRadius: "14px",
            background: "#111827",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#cbd5e1",
              marginBottom: "5px",
            }}
          >
            Fee Impact
          </div>

          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.5,
            }}
          >
            At a{" "}
            <strong>
              {money(salePrice)}
            </strong>{" "}
            sale price, marketplace fees alone can make a
            meaningful difference in your final profit.
          </div>
        </div>
      )}

      {/* DISCLAIMER */}

      <p
        style={{
          margin: "18px 2px 0",
          fontSize: "11px",
          lineHeight: 1.5,
          color: "#9ca3af",
        }}
      >
        Marketplace fees shown are estimates based on the rates
        configured in FlipWiz. Actual fees can vary by category,
        seller status, promotions, payment arrangements, and
        marketplace rules. Verify current fees before making a
        purchase.
      </p>
    </div>
  );
}
