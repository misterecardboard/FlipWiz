 "use client";
import { useMemo, useState } from "react";

const fees: Record<string, number> = { eBay: 0.1325, Whatnot: 0.11, Mercari: 0.10, "Facebook Marketplace": 0, Other: 0.10 };

export function ProfitCalculator() {
  const [buy, setBuy] = useState("25");
  const [sale, setSale] = useState("100");
  const [shipping, setShipping] = useState("6");
  const [packaging, setPackaging] = useState("1");
  const [marketplace, setMarketplace] = useState("eBay");

  const result = useMemo(() => {
    const b = Math.max(0, Number(buy) || 0), s = Math.max(0, Number(sale) || 0);
    const ship = Math.max(0, Number(shipping) || 0), pack = Math.max(0, Number(packaging) || 0);
    const fee = s * (fees[marketplace] ?? 0.10);
    const total = b + ship + pack + fee;
    const profit = s - total;
    return { fee, total, profit, margin: s ? profit / s * 100 : 0, roi: b ? profit / b * 100 : 0 };
  }, [buy, sale, shipping, packaging, marketplace]);

  const money = (n: number) => `$${n.toFixed(2)}`;

  return <div className="calcbox">
    <div className="inputs">
      <label>Purchase price<input value={buy} onChange={e=>setBuy(e.target.value)} inputMode="decimal"/></label>
      <label>Expected sale price<input value={sale} onChange={e=>setSale(e.target.value)} inputMode="decimal"/></label>
      <label>Seller shipping<input value={shipping} onChange={e=>setShipping(e.target.value)} inputMode="decimal"/></label>
      <label>Packaging<input value={packaging} onChange={e=>setPackaging(e.target.value)} inputMode="decimal"/></label>
      <label>Marketplace<select value={marketplace} onChange={e=>setMarketplace(e.target.value)}>{Object.keys(fees).map(x=><option key={x}>{x}</option>)}</select></label>
    </div>
    <div className={"result " + (result.profit >= 0 ? "positive" : "negative")}>
      <span>Estimated profit</span><strong>{money(result.profit)}</strong>
      <div className="metrics"><div><b>{result.margin.toFixed(1)}%</b><small>Margin</small></div><div><b>{result.roi.toFixed(1)}%</b><small>ROI</small></div><div><b>{money(result.fee)}</b><small>Est. fees</small></div></div>
    </div>
    <p className="disclaimer">Estimates only. Marketplace fees, shipping, taxes, and policies can vary. Verify current rates before buying.</p>
  </div>;
}
