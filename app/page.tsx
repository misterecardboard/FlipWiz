import { ProfitCalculator } from "./profit-calculator";

const tools = [
  [
    "💰",
    "Flip Calculator",
    "Calculate profit, ROI, break-even price, and maximum buy price.",
  ],
  [
    "🎯",
    "Break-Even Calculator",
    "Find the minimum sale price needed to cover your complete costs.",
  ],
  [
    "🛒",
    "Maximum Buy Price",
    "See the most you should pay to reach your target profit.",
  ],
  [
    "⚖️",
    "Marketplace Comparison",
    "Compare estimated fees and take-home profit across marketplaces.",
  ],
];

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <div className="brand">
          <span className="wand">✦</span> Flip<span>Wiz</span>
        </div>

        <div className="navlinks">
          <a href="#tools">Tools</a>
          <a href="#how">How It Works</a>
          <a href="#coming">Coming Soon</a>
        </div>

        <a className="navbtn" href="#calculator">
          Get Started
        </a>
      </nav>

      <section className="hero">
        <div className="badge">
          ✨ Built for resellers &amp; flippers
        </div>

        <h1>
          Know <em>before</em>
          <br />
          you buy.
        </h1>

        <p>
          FlipWiz helps you calculate real resale profit,
          break-even prices, maximum buy prices, and total
          flip costs before you put your money on the line.
        </p>

        <div className="heroBtns">
          <a className="primary" href="#calculator">
            Calculate My Flip →
          </a>

          <a className="secondary" href="#tools">
            Explore Tools
          </a>
        </div>

        <div className="heroStats">
          <div>
            <strong>1</strong>
            <span>Powerful calculator</span>
          </div>

          <div>
            <strong>5</strong>
            <span>marketplace options</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>ways to flip</span>
          </div>
        </div>
      </section>

      <section id="tools" className="section">
        <div className="eyebrow">THE TOOLBOX</div>

        <h2>Make the numbers work for you.</h2>

        <p className="sectionIntro">
          Whether you sell cards, collectibles, thrift finds,
          or everyday products, FlipWiz helps you check the
          deal before you buy.
        </p>

        <div className="toolgrid">
          {tools.map(([icon, title, desc]) => (
            <a
              className="toolcard"
              href="#calculator"
              key={title}
            >
              <div className="icon">{icon}</div>

              <h3>{title}</h3>

              <p>{desc}</p>

              <span>Use tool →</span>
            </a>
          ))}
        </div>
      </section>

      <section
        id="calculator"
        className="calculatorSection"
      >
        <div className="eyebrow">START HERE</div>

        <h2>Check your next flip.</h2>

        <p className="sectionIntro">
          Enter your costs, expected sale price, marketplace,
          and goals. FlipWiz will calculate the numbers that
          matter before you buy.
        </p>

        <ProfitCalculator />
      </section>

      <section id="how" className="section how">
        <div className="eyebrow">HOW IT WORKS</div>

        <h2>Three steps. Better flips.</h2>

        <div className="steps">
          <div>
            <b>01</b>

            <h3>Enter your numbers</h3>

            <p>
              Add your purchase price, shipping, repairs,
              grading, packaging, and other costs.
            </p>
          </div>

          <div>
            <b>02</b>

            <h3>FlipWiz does the math</h3>

            <p>
              See profit, margin, ROI, marketplace fees,
              break-even price, and maximum buy price.
            </p>
          </div>

          <div>
            <b>03</b>

            <h3>Make the call</h3>

            <p>
              Know your numbers before you commit your
              money.
            </p>
          </div>
        </div>
      </section>

      <section id="coming" className="aiSection">
        <div className="aiGlow">✦</div>

        <div className="eyebrow">COMING SOON</div>

        <h2>
          Meet <span>FlipWiz AI.</span>
        </h2>

        <p>
          Take a photo of an item. FlipWiz will identify it,
          research its resale potential, estimate fees, and
          help you determine what you should pay.
        </p>

        <div className="aiFlow">
          <span>📸 Snap</span>
          <i>→</i>
          <span>🔎 Identify</span>
          <i>→</i>
          <span>📈 Research</span>
          <i>→</i>
          <span>💰 Profit</span>
        </div>

        <div className="signup">
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Email address"
          />

          <button type="button">
            Join the waitlist
          </button>
        </div>

        <small>
          We'll only use your email for FlipWiz updates.
        </small>
      </section>

      <footer>
        <div className="brand">
          <span className="wand">✦</span> Flip<span>Wiz</span>
        </div>

        <p>Know before you buy.</p>

        <div className="footlinks">
          <a href="#tools">Tools</a>
          <a href="#how">How It Works</a>
          <a href="#coming">AI</a>
        </div>

        <small>
          © 2026 FlipWiz. Estimates are for informational
          purposes only.
        </small>
      </footer>
    </main>
  );
}
