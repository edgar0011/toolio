class HeroImage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col min-h-dvh snap-start">
      <div class="relative flex-1 flex items-center justify-center px-6 overflow-hidden bg-[linear-gradient(180deg,#d3dfeb_0%,#003366_100%)]">
        <div class="max-w-7xl w-full mx-auto">
          <div class="relative rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,51,102,0.15),0_2px_6px_rgba(0,0,0,0.08)]">
            <svg viewBox="0 0 960 520" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full block h-[70dvh]">
              <!-- Window frame -->
              <rect width="960" height="520" rx="12" fill="#0d1b2a"/>

              <!-- Title bar -->
              <rect y="0" width="960" height="40" rx="12" fill="#14263a"/>
              <rect y="12" width="960" height="28" fill="#14263a"/>
              <circle cx="24" cy="20" r="6" fill="#ff5f57"/>
              <circle cx="44" cy="20" r="6" fill="#febc2e"/>
              <circle cx="64" cy="20" r="6" fill="#28c840"/>
              <text x="480" y="25" text-anchor="middle" fill="#6db0e0" font-family="Plus Jakarta Sans, system-ui" font-size="13" font-weight="600">Toolio Dashboard</text>

              <!-- Sidebar -->
              <rect x="0" y="40" width="200" height="480" fill="#0f2440"/>
              <rect x="16" y="60" width="168" height="36" rx="8" fill="rgba(109,176,224,0.12)"/>
              <rect x="36" y="72" width="80" height="10" rx="4" fill="#6db0e0"/>
              <rect x="36" y="112" width="60" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <rect x="36" y="140" width="72" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <rect x="36" y="168" width="54" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <rect x="36" y="196" width="66" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <rect x="36" y="236" width="48" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="36" y="258" width="60" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <rect x="36" y="286" width="72" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>

              <!-- Main content area -->
              <rect x="200" y="40" width="760" height="480" fill="#0d1b2a"/>

              <!-- Top stats row -->
              <rect x="224" y="64" width="168" height="90" rx="12" fill="#14263a"/>
              <rect x="244" y="82" width="60" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
              <text x="244" y="118" fill="#6db0e0" font-family="Plus Jakarta Sans, system-ui" font-size="26" font-weight="700">2,847</text>
              <rect x="244" y="132" width="40" height="6" rx="3" fill="#28c840" opacity="0.7"/>

              <rect x="408" y="64" width="168" height="90" rx="12" fill="#14263a"/>
              <rect x="428" y="82" width="72" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
              <text x="428" y="118" fill="#febc2e" font-family="Plus Jakarta Sans, system-ui" font-size="26" font-weight="700">94.2%</text>
              <rect x="428" y="132" width="48" height="6" rx="3" fill="#febc2e" opacity="0.5"/>

              <rect x="592" y="64" width="168" height="90" rx="12" fill="#14263a"/>
              <rect x="612" y="82" width="56" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
              <text x="612" y="118" fill="#28c840" font-family="Plus Jakarta Sans, system-ui" font-size="26" font-weight="700">$48.5k</text>
              <rect x="612" y="132" width="36" height="6" rx="3" fill="#28c840" opacity="0.7"/>

              <rect x="776" y="64" width="160" height="90" rx="12" fill="#14263a"/>
              <rect x="796" y="82" width="64" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
              <text x="796" y="118" fill="#ff5f57" font-family="Plus Jakarta Sans, system-ui" font-size="26" font-weight="700">12</text>
              <rect x="796" y="132" width="44" height="6" rx="3" fill="#ff5f57" opacity="0.5"/>

              <!-- Chart area -->
              <rect x="224" y="174" width="520" height="240" rx="12" fill="#14263a"/>
              <rect x="248" y="194" width="100" height="10" rx="4" fill="rgba(255,255,255,0.3)"/>

              <!-- Grid lines -->
              <line x1="248" y1="230" x2="720" y2="230" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <line x1="248" y1="270" x2="720" y2="270" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <line x1="248" y1="310" x2="720" y2="310" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <line x1="248" y1="350" x2="720" y2="350" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

              <!-- Area chart -->
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#6db0e0" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#6db0e0" stop-opacity="0.02"/>
                </linearGradient>
              </defs>
              <path d="M248 360 L300 340 L360 320 L420 290 L460 310 L500 270 L540 250 L580 260 L620 230 L660 240 L700 220 L720 210 L720 390 L248 390Z" fill="url(#chartGrad)"/>
              <path d="M248 360 L300 340 L360 320 L420 290 L460 310 L500 270 L540 250 L580 260 L620 230 L660 240 L700 220 L720 210" stroke="#6db0e0" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

              <!-- Chart dots -->
              <circle cx="500" cy="270" r="4" fill="#6db0e0"/>
              <circle cx="620" cy="230" r="4" fill="#6db0e0"/>
              <circle cx="720" cy="210" r="4" fill="#6db0e0"/>

              <!-- Right panel - Activity -->
              <rect x="760" y="174" width="176" height="240" rx="12" fill="#14263a"/>
              <rect x="780" y="194" width="72" height="10" rx="4" fill="rgba(255,255,255,0.3)"/>

              <!-- Activity items -->
              <circle cx="792" cy="230" r="4" fill="#28c840"/>
              <rect x="806" y="226" width="100" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
              <circle cx="792" cy="256" r="4" fill="#6db0e0"/>
              <rect x="806" y="252" width="80" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
              <circle cx="792" cy="282" r="4" fill="#febc2e"/>
              <rect x="806" y="278" width="110" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
              <circle cx="792" cy="308" r="4" fill="#28c840"/>
              <rect x="806" y="304" width="70" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
              <circle cx="792" cy="334" r="4" fill="#ff5f57"/>
              <rect x="806" y="330" width="90" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
              <circle cx="792" cy="360" r="4" fill="#6db0e0"/>
              <rect x="806" y="356" width="76" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
              <circle cx="792" cy="386" r="4" fill="#febc2e"/>
              <rect x="806" y="382" width="96" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>

              <!-- Bottom row - Task cards -->
              <rect x="224" y="430" width="236" height="72" rx="12" fill="#14263a"/>
              <rect x="244" y="448" width="80" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
              <rect x="244" y="466" width="180" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="244" y="480" width="120" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>

              <rect x="476" y="430" width="236" height="72" rx="12" fill="#14263a"/>
              <rect x="496" y="448" width="90" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
              <rect x="496" y="466" width="160" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="496" y="480" width="140" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>

              <rect x="728" y="430" width="208" height="72" rx="12" fill="#14263a"/>
              <rect x="748" y="448" width="70" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
              <rect x="748" y="466" width="150" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="748" y="480" width="100" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
            </svg>
          </div>

          <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 rounded-full blur-3xl bg-[rgba(109,176,224,0.15)]"></div>
        </div>
      </div>

      <!-- Light breather strip -->
      <div class="py-10 px-6 bg-[linear-gradient(180deg,#e4eaf1_0%,#f0f4f8_100%)]">
        <div class="max-w-4xl mx-auto flex items-center justify-center gap-10 flex-wrap">
          <div class="text-center">
            <p class="text-2xl font-bold text-toolio-dark">200+</p>
            <p class="text-xs text-toolio-400 uppercase tracking-wide">Integrations</p>
          </div>
          <div class="w-px h-8 bg-toolio-dark/15"></div>
          <div class="text-center">
            <p class="text-2xl font-bold text-toolio-dark">4.9/5</p>
            <p class="text-xs text-toolio-400 uppercase tracking-wide">User rating</p>
          </div>
          <div class="w-px h-8 bg-toolio-dark/15"></div>
          <div class="text-center">
            <p class="text-2xl font-bold text-toolio-dark">24/7</p>
            <p class="text-xs text-toolio-400 uppercase tracking-wide">Support</p>
          </div>
          <div class="w-px h-8 bg-toolio-dark/15"></div>
          <div class="text-center">
            <p class="text-2xl font-bold text-toolio-dark">SOC 2</p>
            <p class="text-xs text-toolio-400 uppercase tracking-wide">Certified</p>
          </div>
        </div>
      </div>
      </div>
    `;
  }
}

customElements.define("hero-image", HeroImage);
