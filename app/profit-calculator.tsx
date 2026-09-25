"use client";

import { useMemo, useState } from "react";

const fees: Record<string, number> = {
  eBay: 0.1325,
  Whatnot: 0.11,
  CollX: 0.1,
  "CollX Gold": 0.08,
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
  const [buy, setBuy] = useState("25");
  const [sale, setSale] = useState("100");

  const [shippingToYou, setShippingToYou] = useState("0");
  const [sellerShipping, setSellerShipping] = useState("6");

  const [repairs, setRepairs] = useState("0");
  const [grading, setGrading] = useState("0");
  const [otherCosts, setOtherCosts] = useState("0");

  const [packaging, setPackaging] = useState("1");
  const [marketplace, setMarketplace] = useState("eBay");

  const [targetProfit, setTargetProfit] = useState("25");
  const [targetROI, setTargetROI] = useState("0");

  const result = useMemo(() => {
    const purchase = Math.max(0, Number(buy) || 0);
    const salePrice = Math.max(0, Number(sale) || 0);

    const inboundShipping = Math.max(
      0,
      Number(shippingToYou) || 0
    );

    const outboundShipping = Math.max(
      0,
      Number(sellerShipping) || 0
    );

    const repairCost = Math.max(
      0,
      Number(repairs) || 0
    );

    const gradingCost = Math.max(
      0,
      Number(grading) || 0
    );

    const otherCost = Math.max(
      0,
      Number(otherCosts) || 0
    );

    const packagingCost = Math.max(
      0,
      Number(packaging) || 0
    );

    const targetProfitAmount = Math.max(
      0,
      Number(targetProfit) || 0
    );

    const targetROIAmount = Math.max(
      0,
      Number(targetROI) || 0
    );

    const marketplaceFee = calculateFee(
      salePrice,
      marketplace
    );

    const totalCost =
      purchase +
      inboundShipping +
      outboundShipping +
      repairCost +
      gradingCost +
      otherCost +
      packagingCost +
      marketplaceFee;

    const netSaleProceeds =
      salePrice -
      outboundShipping -
      packagingCost -
      marketplaceFee;

    const profit = salePrice - totalCost;

    const margin =
      salePrice > 0
        ? (profit / salePrice) * 100
        : 0;

    const roi =
      purchase +
        inboundShipping +
        repairCost +
        gradingCost +
        otherCost >
      0
        ? (profit /
            (purchase +
              inboundShipping +
              repairCost +
              gradingCost +
              otherCost)) *
          100
        : 0;

    const breakEvenSale =
      purchase +
      inboundShipping +
      outboundShipping +
      repairCost +
      gradingCost +
      otherCost +
      packagingCost;

    let maxBuyPrice =
      salePrice -
      inboundShipping -
      outboundShipping -
      repairCost -
      gradingCost -
      otherCost -
      packagingCost -
      marketplaceFee -
      targetProfitAmount;

    if (marketplace === "CollX Gold" && salePrice > 0) {
      maxBuyPrice =
        salePrice -
        inboundShipping -
        outboundShipping -
        repairCost -
        gradingCost -
        otherCost -
        packagingCost -
        marketplaceFee -
        targetProfitAmount;
    }

    maxBuyPrice = Math.max(0, maxBuyPrice);

    let maxBuyForROI = 0;

    if (targetROIAmount > 0) {
      const saleAfterSellingCosts =
        salePrice -
        outboundShipping -
        packagingCost -
        marketplaceFee;

      const fixedCosts =
        inboundShipping +
        repairCost +
        gradingCost +
        otherCost;

      maxBuyForROI = Math.max(
        0,
        (saleAfterSellingCosts - fixedCosts) /
          (1 + targetROIAmount / 100)
      );
    }

    return {
      marketplaceFee,
      totalCost,
      netSaleProceeds,
      profit,
      margin,
      roi,
      breakEvenSale,
      maxBuyPrice,
      maxBuyForROI,
    };
  }, [
    buy,
    sale,
    shippingToYou,
    sellerShipping,
    repairs,
    grading,
    otherCosts,
    packaging,
    marketplace,
    targetProfit,
    targetROI,
  ]);

  const money = (n: number) =>
    `$${n.toFixed(2)}`;

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
          Flip Calculator
        </div>

        <p
          style={{
            margin: 0,
            color: "#53635c",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          Enter your costs and expected sale price to see
          your complete flip economics before you buy.
        </p>
      </div>

      <div
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#53635c",
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        Your Investment
      </div>

      <div className="inputs">
        <label>
          Purchase price
          <input
            value={buy}
            onChange={(e) =>
              setBuy(e.target.value)
            }
            inputMode="decimal"
          />
        </label>

        <label>
          Shipping to you
          <input
            value={shippingToYou}
            onChange={(e) =>
              setShippingToYou(e.target.value)
            }
            inputMode="decimal"
          />
        </label>

        <label>
          Repairs / cleaning
          <input
            value={repairs}
            onChange={(e) =>
              setRepairs(e.target.value)
            }
            inputMode="decimal"
          />
        </label>

        <label>
          Grading cost
          <input
            value={grading}
            onChange={(e) =>
              setGrading(e.target.value)
            }
            inputMode="decimal"
          />
        </label>

        <label>
          Other costs
          <input
            value={otherCosts}
            onChange={(e) =>
              setOtherCosts(e.target.value)
            }
            inputMode="decimal"
          />
        </label>
      </div>

      <div
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#53635c",
          marginTop: "28px",
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        Your Sale
      </div>

      <div className="inputs">
        <label>
          Expected sale price
          <input
            value={sale}
            onChange={(e) =>
              setSale(e.target.value)
            }
            inputMode="decimal"
          />
        </label>

        <label>
          Seller shipping
          <input
            value={sellerShipping}
            onChange={(e) =>
              setSellerShipping(e.target.value)
            }
            inputMode="decimal"
          />
        </label>

        <label>
          Packaging
          <input
            value={packaging}
            onChange={(e) =>
              setPackaging(e.target.value)
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
              <option
                key={name}
                value={name}
              >
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#53635c",
          marginTop: "28px",
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        Your Goal
      </div>

      <div className="inputs">
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
          Target ROI %
          <input
            value={targetROI}
            onChange={(e) =>
              setTargetROI(e.target.value)
            }
            inputMode="decimal"
          />
        </label>
      </div>

      <div
        className={
          "result " +
          (result.profit >= 0
            ? "positive"
            : "negative")
        }
        style={{
          marginTop: "28px",
        }}
      >
        <span>Estimated Profit</span>

        <strong>
          {result.profit >= 0 ? "+" : ""}
          {money(result.profit)}
        </strong>

        <div className="metrics">
          <div>
            <b>
              {result.margin.toFixed(1)}%
            </b>
            <small>Profit Margin</small>
          </div>

          <div>
            <b>
              {result.roi.toFixed(1)}%
            </b>
            <small>ROI</small>
          </div>

          <div>
            <b>
              {money(result.marketplaceFee)}
            </b>
            <small>Marketplace Fees</small>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          padding: "18px",
          border: "1px solid #d5ded9",
          borderRadius: "12px",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            marginBottom: "12px",
            color: "#53635c",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Flip Breakdown
        </div>

        <div
          style={{
            display: "grid",
            gap: "9px",
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
            <strong>
              {money(Number(buy) || 0)}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Shipping to you</span>
            <strong>
              {money(
                Number(shippingToYou) || 0
              )}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Repairs / cleaning</span>
            <strong>
              {money(Number(repairs) || 0)}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Grading</span>
            <strong>
              {money(Number(grading) || 0)}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Other costs</span>
            <strong>
              {money(Number(otherCosts) || 0)}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Seller shipping</span>
            <strong>
              {money(Number(sellerShipping) || 0)}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Packaging</span>
            <strong>
              {money(Number(packaging) || 0)}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Marketplace fees</span>
            <strong>
              {money(result.marketplaceFee)}
            </strong>
          </div>

          <div
            style={{
              borderTop: "1px solid #d5ded9",
              paddingTop: "12px",
              marginTop: "4px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Total costs</span>
            <strong>
              {money(result.totalCost)}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Net sale proceeds</span>
            <strong>
              {money(result.netSaleProceeds)}
            </strong>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "grid",
          gap: "12px",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "#f4f8f6",
          }}
        >
          <small
            style={{
              display: "block",
              color: "#53635c",
              marginBottom: "5px",
            }}
          >
            Break-Even Sale Price
          </small>

          <strong
            style={{
              fontSize: "22px",
              color: "#0b1813",
            }}
          >
            {money(result.breakEvenSale)}
          </strong>
        </div>

        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "#f4f8f6",
          }}
        >
          <small
            style={{
              display: "block",
              color: "#53635c",
              marginBottom: "5px",
            }}
          >
            Maximum Buy Price
          </small>

          <strong
            style={{
              fontSize: "22px",
              color: "#0b1813",
            }}
          >
            {money(result.maxBuyPrice)}
          </strong>

          <small
            style={{
              display: "block",
              marginTop: "5px",
              color: "#53635c",
            }}
          >
            Based on target profit
          </small>
        </div>

        {Number(targetROI) > 0 && (
          <div
            style={{
              padding: "16px",
              borderRadius: "12px",
              background: "#f4f8f6",
            }}
          >
            <small
              style={{
                display: "block",
                color: "#53635c",
                marginBottom: "5px",
              }}
            >
              Max Buy for Target ROI
            </small>

            <strong
              style={{
                fontSize: "22px",
                color: "#0b1813",
              }}
            >
              {money(result.maxBuyForROI)}
            </strong>
          </div>
        )}
      </div>

      <p className="disclaimer">
        Estimates only. Marketplace fees, shipping, taxes,
        grading costs, repairs, and selling prices can vary.
        Verify current marketplace rates and comparable sales
        before buying.
      </p>
    </div>
  );
}
