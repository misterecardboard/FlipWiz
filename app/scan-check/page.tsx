"use client";

import { useState } from "react";

type Analysis = {
  card_information?: {
    title?: string;
    athlete_or_character?: string;
    sport?: string;
    year?: string;
    brand?: string;
    set?: string;
    card_number?: string;
    parallel_or_variant?: string;
    rookie_card?: string;
    serial_number?: string;
    autograph?: string;
    relic?: string;
    special_features?: string;
    condition_observations?: string;
  };
  history?: {
    card_history?: string;
    athlete_or_character_history?: string;
  };
  why_this_card_matters?: string;
  listing_description?: string;
  social_media_post_ideas?: string[];
  hashtags?: string[];
  content_ideas?: string[];
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.split(",")[1] || "");
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ScanCheckPage() {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState("");
  const [backPreview, setBackPreview] = useState("");
  const [sport, setSport] = useState("Auto Detect");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [marketplace, setMarketplace] = useState("eBay");

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFront = (file: File | undefined) => {
    if (!file) return;

    setFrontFile(file);
    setFrontPreview(URL.createObjectURL(file));
    setAnalysis(null);
    setError("");
  };

  const handleBack = (file: File | undefined) => {
    if (!file) return;

    setBackFile(file);
    setBackPreview(URL.createObjectURL(file));
    setAnalysis(null);
    setError("");
  };

  const analyzeCard = async () => {
    if (!frontFile) {
      setError("Please upload the front of the card first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const front = await fileToBase64(frontFile);
      const back = backFile ? await fileToBase64(backFile) : null;

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front,
          back,
          sport,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Mister E AI could not analyze the card.");
      }

      setAnalysis(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing the card."
      );
    } finally {
      setLoading(false);
    }
  };

  const buyPrice = Number(purchasePrice) || 0;

  const estimatedValue = buyPrice > 0 ? buyPrice * 2 : 0;
  const estimatedFees = estimatedValue * 0.1325;
  const estimatedProfit =
    estimatedValue > 0
      ? estimatedValue - buyPrice - estimatedFees
      : 0;

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
            maxWidth: "1100px",
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
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "60px 20px 90px",
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
              background: "#eef2ff",
              color: "#4f46e5",
              padding: "7px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            MISTER E AI × FLIPWIZ
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 58px)",
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
              maxWidth: "650px",
              margin: "15px auto",
            }}
          >
            Photograph a card and let Mister E AI identify it, research it,
            and help you decide whether the deal makes sense.
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
          <h2 style={{ marginTop: 0 }}>1. Scan the Card</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "18px",
            }}
          >
            <label
              style={{
                border: "2px dashed #cfd4e1",
                borderRadius: "16px",
                padding: "25px",
                textAlign: "center",
                cursor: "pointer",
                background: "#fafbfe",
              }}
            >
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFront(e.target.files?.[0])}
                style={{ display: "none" }}
              />

              {frontPreview ? (
                <img
                  src={frontPreview}
                  alt="Card front"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
              ) : (
                <>
                  <div style={{ fontSize: "42px" }}>📷</div>
                  <strong>Card Front</strong>
                  <div
                    style={{
                      color: "#9ca3af",
                      fontSize: "13px",
                      marginTop: "5px",
                    }}
                  >
                    Upload or take a photo
                  </div>
                </>
              )}
            </label>

            <label
              style={{
                border: "2px dashed #cfd4e1",
                borderRadius: "16px",
                padding: "25px",
                textAlign: "center",
                cursor: "pointer",
                background: "#fafbfe",
              }}
            >
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleBack(e.target.files?.[0])}
                style={{ display: "none" }}
              />

              {backPreview ? (
                <img
                  src={backPreview}
                  alt="Card back"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
              ) : (
                <>
                  <div style={{ fontSize: "42px" }}>🔄</div>
                  <strong>Card Back</strong>
                  <div
                    style={{
                      color: "#9ca3af",
                      fontSize: "13px",
                      marginTop: "5px",
                    }}
                  >
                    Optional but recommended
                  </div>
                </>
              )}
            </label>
          </div>

          <h2 style={{ marginTop: "30px" }}>2. Buying Information</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginBottom: "7px",
                }}
              >
                Sport / Category
              </label>

              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                  background: "#ffffff",
                }}
              >
                <option>Auto Detect</option>
                <option>Baseball</option>
                <option>Basketball</option>
                <option>Football</option>
                <option>Hockey</option>
                <option>Soccer</option>
                <option>Wrestling</option>
                <option>MMA</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
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
                placeholder="25.00"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginBottom: "7px",
                }}
              >
                Marketplace
              </label>

              <select
                value={marketplace}
                onChange={(e) => setMarketplace(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                  background: "#ffffff",
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
            onClick={analyzeCard}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "24px",
              padding: "16px",
              border: "none",
              borderRadius: "11px",
              background: loading ? "#9ca3af" : "#111827",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 800,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading
              ? "🤖 Mister E AI is researching..."
              : "🤖 Analyze with Mister E AI"}
          </button>

          {error && (
            <div
              style={{
                marginTop: "18px",
                padding: "14px",
                borderRadius: "10px",
                background: "#fef2f2",
                color: "#b91c1c",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}
        </div>

        {analysis && (
          <div
            style={{
              marginTop: "25px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 10px 30px rgba(0,0,0,.05)",
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
              MISTER E AI IDENTIFICATION
            </div>

            <h2 style={{ margin: "0 0 20px" }}>
              {analysis.card_information?.title ||
                analysis.card_information?.athlete_or_character ||
                "Card Analysis"}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
              }}
            >
              {[
                ["Year", analysis.card_information?.year],
                ["Brand", analysis.card_information?.brand],
                ["Set", analysis.card_information?.set],
                ["Card #", analysis.card_information?.card_number],
                ["Parallel", analysis.card_information?.parallel_or_variant],
                ["Rookie", analysis.card_information?.rookie_card],
                ["Serial", analysis.card_information?.serial_number],
                ["Autograph", analysis.card_information?.autograph],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "#f8f9fc",
                    borderRadius: "12px",
                    padding: "15px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {label}
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      fontWeight: 800,
                    }}
                  >
                    {value || "Not verified"}
                  </div>
                </div>
              ))}
            </div>

            {analysis.card_information?.special_features && (
              <div style={{ marginTop: "22px" }}>
                <h3>Special Features</h3>
                <p style={{ color: "#4b5563", lineHeight: 1.6 }}>
                  {analysis.card_information.special_features}
                </p>
              </div>
            )}

            {analysis.card_information?.condition_observations && (
              <div style={{ marginTop: "22px" }}>
                <h3>Condition Observations</h3>
                <p style={{ color: "#4b5563", lineHeight: 1.6 }}>
                  {analysis.card_information.condition_observations}
                </p>
              </div>
            )}

            {analysis.why_this_card_matters && (
              <div
                style={{
                  marginTop: "22px",
                  padding: "18px",
                  background: "#eef2ff",
                  borderRadius: "12px",
                  color: "#3730a3",
                  lineHeight: 1.6,
                }}
              >
                <strong>Why This Card Matters</strong>
                <p style={{ marginBottom: 0 }}>
                  {analysis.why_this_card_matters}
                </p>
              </div>
            )}

            {analysis.history?.card_history && (
              <div style={{ marginTop: "22px" }}>
                <h3>Card History</h3>
                <p style={{ color: "#4b5563", lineHeight: 1.6 }}>
                  {analysis.history.card_history}
                </p>
              </div>
            )}

            {analysis.history?.athlete_or_character_history && (
              <div style={{ marginTop: "22px" }}>
                <h3>Athlete / Character History</h3>
                <p style={{ color: "#4b5563", lineHeight: 1.6 }}>
                  {analysis.history.athlete_or_character_history}
                </p>
              </div>
            )}

            {purchasePrice && (
              <div
                style={{
                  marginTop: "25px",
                  paddingTop: "25px",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <h3>FlipWiz Deal Preview</h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      background: "#f8f9fc",
                      padding: "16px",
                      borderRadius: "12px",
                    }}
                  >
                    <small>Purchase Price</small>
                    <h2>${buyPrice.toFixed(2)}</h2>
                  </div>

                  <div
                    style={{
                      background: "#f8f9fc",
                      padding: "16px",
                      borderRadius: "12px",
                    }}
                  >
                    <small>Preview Resale</small>
                    <h2>${estimatedValue.toFixed(2)}</h2>
                  </div>

                  <div
                    style={{
                      background: "#f8f9fc",
                      padding: "16px",
                      borderRadius: "12px",
                    }}
                  >
                    <small>Preview Profit</small>
                    <h2>${estimatedProfit.toFixed(2)}</h2>
                  </div>
                </div>

                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "12px",
                    marginTop: "15px",
                  }}
                >
                  This is currently a preview calculation. Live comparable
                  sales and marketplace-specific fees will be connected next.
                </p>
              </div>
            )}

            {analysis.listing_description && (
              <div style={{ marginTop: "25px" }}>
                <h3>Listing Description</h3>

                <div
                  style={{
                    background: "#f8f9fc",
                    padding: "18px",
                    borderRadius: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  {analysis.listing_description}
                </div>
              </div>
            )}

            {analysis.social_media_post_ideas &&
              analysis.social_media_post_ideas.length > 0 && (
                <div style={{ marginTop: "25px" }}>
                  <h3>Social Media Ideas</h3>

                  <ul style={{ lineHeight: 1.8 }}>
                    {analysis.social_media_post_ideas.map(
                      (idea, index) => (
                        <li key={index}>{idea}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {analysis.hashtags &&
              analysis.hashtags.length > 0 && (
                <div style={{ marginTop: "25px" }}>
                  <h3>Hashtags</h3>

                  <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
                    {analysis.hashtags.map((tag) => `#${tag}`).join(" ")}
                  </p>
                </div>
              )}
          </div>
        )}
      </section>
    </main>
  );
}
