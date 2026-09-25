import ProfitCalculator from "./profit-calculator";
import MarketplaceComparison from "./marketplace-comparison";

const tools = [
  {
    title: "Flip Calculator",
    description:
      "Calculate profit, ROI, fees, break-even price, and maximum buy price before you purchase.",
    active: true,
  },
  {
    title: "Break-Even Calculator",
    description:
      "See the minimum sale price you need to cover your complete flip.",
    active: true,
  },
  {
    title: "Maximum Buy Price",
    description:
      "Work backward from your expected sale price and target return.",
    active: true,
  },
  {
    title: "Marketplace Comparison",
    description:
      "Compare the impact of marketplace fees on your potential profit.",
    active: true,
  },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7f9fc 0%, #ffffff 45%, #f7f9fc 100%)",
        color: "#111827",
      }}
    >
      {/* HEADER */}

      <header
        style={{
          borderBottom: "1px solid #e5e7eb",
          background: "rgba(255,255,255,0.9)",
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
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

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <a
              href="#tools"
              style={{
                color: "#4b5563",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Tools
            </a>

            <a
              href="#calculator"
              style={{
                color: "#4b5563",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Calculator
            </a>

            <a
              href="#comparison"
              style={{
                color: "#4b5563",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Compare
            </a>

            <a
              href="#ai"
              style={{
                color: "#4b5563",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              AI
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}

      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "80px 20px 65px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "7px 12px",
            borderRadius: "999px",
            background: "#eef2ff",
            color: "#4f46e5",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.8px",
            marginBottom: "18px",
          }}
        >
          BUILT FOR RESELLERS
        </div>

        <h1
          style={{
            margin: "0 auto",
            maxWidth: "850px",
            fontSize: "clamp(42px, 7vw, 72px)",
            lineHeight: 1.02,
            letterSpacing: "-3px",
            fontWeight: 900,
          }}
        >
          Know before
          <br />
          <span style={{ color: "#6366f1" }}>you buy.</span>
        </h1>

        <p
          style={{
            maxWidth: "680px",
            margin: "24px auto 0",
            fontSize: "19px",
            lineHeight: 1.6,
            color: "#6b7280",
          }}
        >
          FlipWiz helps online resellers figure out the numbers
          before they spend their money. Calculate profit, fees,
          ROI, break-even prices, and maximum buy prices in seconds.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#calculator"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 22px",
              borderRadius: "11px",
              background: "#111827",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "14px",
            }}
          >
            Check a Flip
          </a>

          <a
            href="#comparison"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 22px",
              borderRadius: "11px",
              background: "#ffffff",
              color: "#111827",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "14px",
              border: "1px solid #dfe3ea",
            }}
          >
            Compare Marketplaces
          </a>
        </div>
      </section>

      {/* TOOLS */}

      <section
        id="tools"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "30px 20px 75px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1px",
              color: "#6366f1",
              marginBottom: "8px",
            }}
          >
            THE FLIPWIZ TOOLBOX
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "34px",
              letterSpacing: "-1px",
            }}
          >
            Everything starts with the numbers.
          </h2>

          <p
            style={{
              maxWidth: "650px",
              margin: "12px auto 0",
              color: "#6b7280",
              lineHeight: 1.6,
            }}
          >
            One calculator handles the core questions every reseller
            should answer before buying an item.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "16px",
          }}
        >
          {tools.map((tool) => (
            <div
              key={tool.title}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "22px",
                boxShadow:
                  "0 6px 20px rgba(17,24,39,0.04)",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "#eef2ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6366f1",
                  fontWeight: 900,
                  marginBottom: "16px",
                }}
              >
                ✓
              </div>

              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: "18px",
                }}
              >
                {tool.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "14px",
                  lineHeight: 1.55,
                }}
              >
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}

      <section
        id="calculator"
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "20px 20px 85px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1px",
              color: "#6366f1",
              marginBottom: "8px",
            }}
          >
            START HERE
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "36px",
              letterSpacing: "-1px",
            }}
          >
            Check your next flip.
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "12px auto 0",
              color: "#6b7280",
              lineHeight: 1.6,
            }}
          >
            Enter your costs, expected sale price, marketplace,
            and goals. FlipWiz will calculate the numbers that
            matter before you buy.
          </p>
        </div>

        <ProfitCalculator />
      </section>

      {/* MARKETPLACE COMPARISON */}

      <section
        id="comparison"
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "0 20px 90px",
        }}
      >
        <MarketplaceComparison />
      </section>

      {/* HOW IT WORKS */}

      <section
        style={{
          background: "#111827",
          color: "#ffffff",
          padding: "75px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1050px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "42px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "1px",
                color: "#a5b4fc",
                marginBottom: "8px",
              }}
            >
              HOW IT WORKS
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "36px",
                letterSpacing: "-1px",
              }}
            >
              Three numbers can change the deal.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                number: "01",
                title: "Know your cost",
                text:
                  "Enter what you're actually going to spend getting the item ready to sell.",
              },
              {
                number: "02",
                title: "Know your sale",
                text:
                  "Estimate your selling price and choose the marketplace you're planning to use.",
              },
              {
                number: "03",
                title: "Know your limit",
                text:
                  "See your expected profit, break-even point, and maximum price you should pay.",
              },
            ].map((item) => (
              <div
                key={item.number}
                style={{
                  border:
                    "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  padding: "24px",
                  background:
                    "rgba(255,255,255,0.04)",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#a5b4fc",
                    marginBottom: "16px",
                  }}
                >
                  {item.number}
                </div>

                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "20px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#cbd5e1",
                    lineHeight: 1.6,
                    fontSize: "14px",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI */}

      <section
        id="ai"
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            borderRadius: "22px",
            border: "1px solid #e5e7eb",
            background:
              "linear-gradient(135deg, #f8faff 0%, #eef2ff 100%)",
            padding: "45px 30px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "#ffffff",
              color: "#6366f1",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.8px",
              marginBottom: "15px",
            }}
          >
            COMING SOON
          </div>

          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "34px",
              letterSpacing: "-1px",
            }}
          >
            FlipWiz AI
          </h2>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#6b7280",
              lineHeight: 1.65,
            }}
          >
            Take a photo of an item and let FlipWiz help identify
            it, research potential resale value, estimate fees,
            calculate profit, and build your listing.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {[
              "Identify",
              "Research",
              "Estimate",
              "Calculate",
              "List",
            ].map((item) => (
              <span
                key={item}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "#ffffff",
                  border: "1px solid #e0e7ff",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#4b5563",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          borderTop: "1px solid #e5e7eb",
          background: "#ffffff",
          padding: "28px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              Flip<span style={{ color: "#6366f1" }}>Wiz</span>
            </div>

            <div
              style={{
                marginTop: "4px",
                color: "#9ca3af",
                fontSize: "12px",
              }}
            >
              Know before you buy.
            </div>
          </div>

          <div
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              textAlign: "right",
            }}
          >
            © {new Date().getFullYear()} FlipWiz.
            <br />
            Estimates are for informational purposes only.
          </div>
        </div>
      </footer>
    </main>
  );
}
