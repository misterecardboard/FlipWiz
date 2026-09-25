"use client";

import { useMemo, useState } from "react";

const MARKETPLACE_RATES: Record<string, number> = {
  eBay: 0.1325,
  Whatnot: 0.11,
  CollX: 0.1,
  "CollX Gold": 0.08,
  Other: 0.1,
};

function calculateFee(salePrice: number, marketplace: string) {
  if (salePrice <= 0) return 0;

  if (marketplace === "CollX Gold") {
    const firstTier = Math.min(salePrice, 2500);
    const secondTier = Math.max(salePrice - 2500, 0);

    return firstTier * 0.08 + secondTier * 0.03;
  }

  return salePrice * (MARKETPLACE_RATES[marketplace] ?? 0.1);
}

export default function ProfitCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [inboundShipping, setInboundShipping] = useState(0);
  const [repairCost, setRepairCost] = useState(0);
  const [gradingCost, setGradingCost] = useState(0);
  const [otherCost, setOtherCost] = useState(0);

  const [salePrice, setSalePrice] = useState(0);
  const [outboundShipping, setOutboundShipping] = useState(0);
  const [packagingCost, setPackagingCost] = useState(0);
  const [marketplace, setMarketplace] = useState("eBay");

  const [targetProfit, setTargetProfit] = useState(0);
  const [targetROI, setTargetROI] = useState(0);

  const results = useMemo(() => {
    const marketplaceFee = calculateFee(salePrice, marketplace);

    const acquisitionCost =
      purchasePrice +
      inboundShipping +
      repairCost +
      gradingCost +
      otherCost;

    const saleCosts =
      outboundShipping +
      packagingCost +
      marketplaceFee;

    const totalCost = acquisitionCost + saleCosts;

    const netSaleProceeds =
      salePrice - outboundShipping - packagingCost - marketplaceFee;

    const profit = netSaleProceeds - acquisitionCost;

    const profitMargin =
      salePrice > 0 ? (profit / salePrice) * 100 : 0;

    const roi =
      acquisitionCost > 0
        ? (profit / acquisitionCost) * 100
        : 0;

    /*
      Break-even sale price:

      sale price - marketplace fee - outbound shipping
      - packaging - acquisition costs = 0

      For normal percentage-based marketplaces:
      salePrice * (1 - feeRate) =
      acquisition costs + outbound shipping + packaging

      CollX Gold is tiered, so it gets a separate calculation.
    */

    const fixedBreakEvenCosts =
      acquisitionCost + outboundShipping + packagingCost;

    let breakEvenSale = 0;

    if (marketplace === "CollX Gold") {
      if (fixedBreakEvenCosts <= 2300) {
        breakEvenSale =
          fixedBreakEvenCosts / 0.92;
      } else {
        breakEvenSale =
          2500 +
          (fixedBreakEvenCosts - 2300) / 0.97;
      }
    } else {
      const feeRate =
        MARKETPLACE_RATES[marketplace] ?? 0.1;

      breakEvenSale =
        feeRate < 1
          ? fixedBreakEvenCosts / (1 - feeRate)
          : 0;
    }

    /*
      Maximum purchase price for a target profit.

      We solve:

      sale price
      - selling costs
      - acquisition costs
      - target profit = 0

      Therefore:

      max purchase =
      net sale proceeds
      - inbound shipping
      - repairs
      - grading
      - other costs
      - target profit
    */

    const maxBuyForTargetProfit = Math.max(
      0,
      netSaleProceeds -
        inboundShipping -
        repairCost -
        gradingCost -
        otherCost -
        targetProfit
    );

    /*
      Maximum purchase price for a target ROI.

      ROI is defined here as:

      Profit / acquisition investment

      We solve:

      Profit = ROI × acquisition investment

      For standard marketplaces:

      net sale proceeds - fixed acquisition costs - purchase
      =
      target ROI × (fixed acquisition costs + purchase)

      CollX Gold requires tier handling because its fee changes
      after $2,500 in sales.
    */

    const fixedAcquisitionCosts =
      inboundShipping +
      repairCost +
      gradingCost +
      otherCost;

    const roiMultiplier = 1 + targetROI / 100;

    let maxBuyForTargetROI = 0;

    if (targetROI > 0 && salePrice > 0) {
      if (marketplace === "CollX Gold") {
        const netSaleProceedsGold =
          salePrice -
          outboundShipping -
          packagingCost -
          marketplaceFee;

        maxBuyForTargetROI = Math.max(
          0,
          netSaleProceedsGold / roiMultiplier -
            fixedAcquisitionCosts
        );
      } else {
        const netSaleProceedsStandard =
          salePrice -
          outboundShipping -
          packagingCost -
          marketplaceFee;

        maxBuyForTargetROI = Math.max(
          0,
          netSaleProceedsStandard / roiMultiplier -
            fixedAcquisitionCosts
        );
      }
    }

    return {
      marketplaceFee,
      acquisitionCost,
      saleCosts,
      totalCost,
      netSaleProceeds,
      profit,
      profitMargin,
      roi,
      breakEvenSale,
      maxBuyForTargetProfit,
      maxBuyForTargetROI,
    };
  }, [
    purchasePrice,
    inboundShipping,
    repairCost,
    gradingCost,
    otherCost,
    salePrice,
    outboundShipping,
    packagingCost,
    marketplace,
    targetProfit,
    targetROI,
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
    border: "1px solid #d9d9e2",
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

  const sectionBox = {
    background: "#f8f9fc",
    border: "1px solid #e7e9f0",
    borderRadius: "16px",
    padding: "20px",
  };

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      {/* YOUR INVESTMENT */}

      <div style={sectionBox}>
        <h3
          style={{
            margin: "0 0 5px",
            fontSize: "20px",
            color: "#111827",
          }}
        >
          Your Investment
        </h3>

        <p
          style={{
            margin: "0 0 18px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          What will this flip cost you?
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          <div>
            <label style={labelStyle}>Purchase Price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={purchasePrice || ""}
              onChange={(e) =>
                setPurchasePrice(Number(e.target.value))
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Shipping to You</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={inboundShipping || ""}
              onChange={(e) =>
                setInboundShipping(Number(e.target.value))
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Repairs / Cleaning</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={repairCost || ""}
              onChange={(e) =>
                setRepairCost(Number(e.target.value))
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Grading Cost</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={gradingCost || ""}
              onChange={(e) =>
                setGradingCost(Number(e.target.value))
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Other Costs</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={otherCost || ""}
              onChange={(e) =>
                setOtherCost(Number(e.target.value))
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* YOUR SALE */}

      <div style={{ ...sectionBox, marginTop: "18px" }}>
        <h3
          style={{
            margin: "0 0 5px",
            fontSize: "20px",
            color: "#111827",
          }}
        >
          Your Sale
        </h3>

        <p
          style={{
            margin: "0 0 18px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          What do you expect to sell it for?
        </p>

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
              Expected Sale Price
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={salePrice || ""}
              onChange={(e) =>
                setSalePrice(Number(e.target.value))
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
            <label style={labelStyle}>Packaging</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={packagingCost || ""}
              onChange={(e) =>
                setPackagingCost(Number(e.target.value))
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Marketplace</label>

            <select
              value={marketplace}
              onChange={(e) =>
                setMarketplace(e.target.value)
              }
              style={inputStyle}
            >
              <option value="eBay">eBay</option>
              <option value="Whatnot">Whatnot</option>
              <option value="CollX">CollX</option>
              <option value="CollX Gold">
                CollX Gold
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* YOUR GOAL */}

      <div style={{ ...sectionBox, marginTop: "18px" }}>
        <h3
          style={{
            margin: "0 0 5px",
            fontSize: "20px",
            color: "#111827",
          }}
        >
          Your Goal
        </h3>

        <p
          style={{
            margin: "0 0 18px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Set the return you're looking for.
        </p>

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
              Target Profit
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={targetProfit || ""}
              onChange={(e) =>
                setTargetProfit(Number(e.target.value))
              }
              placeholder="0.00"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Target ROI %
            </label>

            <input
              type="number"
              min="0"
              step="1"
              value={targetROI || ""}
              onChange={(e) =>
                setTargetROI(Number(e.target.value))
              }
              placeholder="0"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* RESULTS */}

      <div
        style={{
          marginTop: "24px",
          background:
            "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
          borderRadius: "18px",
          padding: "24px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "14px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#cbd5e1",
                marginBottom: "5px",
              }}
            >
              Estimated Profit
            </div>

            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
              }}
            >
              {money(results.profit)}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#cbd5e1",
                marginBottom: "5px",
              }}
            >
              Profit Margin
            </div>

            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
              }}
            >
              {percent(results.profitMargin)}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#cbd5e1",
                marginBottom: "5px",
              }}
            >
              ROI
            </div>

            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
              }}
            >
              {percent(results.roi)}
            </div>
          </div>
        </div>
      </div>

      {/* BREAKDOWN */}

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #e5e7eb",
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
          Flip Breakdown
        </h3>

        {[
          ["Purchase Price", purchasePrice],
          ["Shipping to You", inboundShipping],
          ["Repairs / Cleaning", repairCost],
          ["Grading", gradingCost],
          ["Other Costs", otherCost],
          ["Seller Shipping", outboundShipping],
          ["Packaging", packagingCost],
          ["Marketplace Fees", results.marketplaceFee],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              padding: "8px 0",
              borderBottom:
                "1px solid #f0f1f4",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#6b7280" }}>
              {label}
            </span>

            <strong style={{ color: "#111827" }}>
              {money(Number(value))}
            </strong>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "14px",
            marginTop: "4px",
            fontSize: "16px",
          }}
        >
          <strong>Total Costs</strong>
          <strong>{money(results.totalCost)}</strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "8px",
            fontSize: "16px",
          }}
        >
          <strong>Net Sale Proceeds</strong>
          <strong>
            {money(results.netSaleProceeds)}
          </strong>
        </div>
      </div>

      {/* DECISION METRICS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "18px",
        }}
      >
        <div
          style={{
            background: "#f8f9fc",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "18px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#6b7280",
              marginBottom: "5px",
            }}
          >
            Break-Even Sale Price
          </div>

          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            {money(results.breakEvenSale)}
          </div>

          <div
            style={{
              marginTop: "6px",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            Minimum sale price to cover your costs.
          </div>
        </div>

        <div
          style={{
            background: "#f8f9fc",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "18px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#6b7280",
              marginBottom: "5px",
            }}
          >
            Maximum Buy Price
          </div>

          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            {money(results.maxBuyForTargetProfit)}
          </div>

          <div
            style={{
              marginTop: "6px",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            Based on your target profit.
          </div>
        </div>

        {targetROI > 0 && (
          <div
            style={{
              background: "#f8f9fc",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "18px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "5px",
              }}
            >
              Max Buy for Target ROI
            </div>

            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#111827",
              }}
            >
              {money(results.maxBuyForTargetROI)}
            </div>

            <div
              style={{
                marginTop: "6px",
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              Based on your {targetROI}% target ROI.
            </div>
          </div>
        )}
      </div>

      {/* DISCLAIMER */}

      <p
        style={{
          margin: "18px 2px 0",
          fontSize: "11px",
          lineHeight: 1.5,
          color: "#9ca3af",
        }}
      >
        Estimates are for planning purposes only. Marketplace
        fees can vary by category, seller status, promotions,
        payment method, and other marketplace-specific rules.
        Always verify current fees before making a purchase.
      </p>
    </div>
  );
}
