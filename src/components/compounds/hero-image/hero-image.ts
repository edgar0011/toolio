class HeroImage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col min-h-dvh snap-start">
      <div class="relative flex-1 flex items-center justify-center px-6 overflow-hidden bg-t-bg">
        <div class="max-w-7xl w-full mx-auto">
          <div class="relative rounded-lg overflow-hidden border border-t-border">
            <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full block h-[70dvh] object-cover">
              <!-- Window frame -->
              <rect width="1440" height="900" rx="8" fill="#0a0a0a"/>

              <!-- Title bar -->
              <rect y="0" width="1440" height="48" rx="8" fill="#141414"/>
              <rect y="16" width="1440" height="32" fill="#141414"/>
              <circle cx="28" cy="24" r="5" fill="#3f3f3f"/>
              <circle cx="48" cy="24" r="5" fill="#3f3f3f"/>
              <circle cx="68" cy="24" r="5" fill="#3f3f3f"/>
              <text x="720" y="30" text-anchor="middle" fill="#767d88" font-family="Inter, system-ui" font-size="13" font-weight="400" letter-spacing="-0.16">Toolio Dashboard</text>

              <!-- Sidebar -->
              <rect x="0" y="48" width="260" height="852" fill="#0f0f0f"/>
              <rect x="24" y="72" width="212" height="40" rx="6" fill="rgba(255,255,255,0.03)"/>
              <circle cx="46" cy="92" r="10" fill="rgba(255,255,255,0.06)"/>
              <rect x="64" y="86" width="90" height="12" rx="4" fill="rgba(255,255,255,0.12)"/>
              <!-- Nav items -->
              <rect x="24" y="136" width="100" height="8" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="24" y="160" width="212" height="36" rx="6" fill="rgba(255,255,255,0.04)"/>
              <circle cx="44" cy="178" r="5" fill="rgba(255,255,255,0.12)"/>
              <rect x="60" y="174" width="72" height="8" rx="3" fill="rgba(255,255,255,0.15)"/>
              <rect x="24" y="208" width="212" height="36" rx="6" fill="transparent"/>
              <circle cx="44" cy="226" r="5" fill="rgba(255,255,255,0.06)"/>
              <rect x="60" y="222" width="84" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>
              <rect x="24" y="256" width="212" height="36" rx="6" fill="transparent"/>
              <circle cx="44" cy="274" r="5" fill="rgba(255,255,255,0.06)"/>
              <rect x="60" y="270" width="60" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>
              <rect x="24" y="304" width="212" height="36" rx="6" fill="transparent"/>
              <circle cx="44" cy="322" r="5" fill="rgba(255,255,255,0.06)"/>
              <rect x="60" y="318" width="76" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>
              <!-- Nav section 2 -->
              <rect x="24" y="368" width="80" height="8" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="24" y="392" width="212" height="36" rx="6" fill="transparent"/>
              <circle cx="44" cy="410" r="5" fill="rgba(255,255,255,0.06)"/>
              <rect x="60" y="406" width="68" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>
              <rect x="24" y="440" width="212" height="36" rx="6" fill="transparent"/>
              <circle cx="44" cy="458" r="5" fill="rgba(255,255,255,0.06)"/>
              <rect x="60" y="454" width="92" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>
              <!-- User -->
              <rect x="24" y="830" width="212" height="46" rx="6" fill="rgba(255,255,255,0.02)"/>
              <circle cx="50" cy="853" r="14" fill="rgba(255,255,255,0.04)"/>
              <rect x="72" y="845" width="80" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="72" y="858" width="52" height="6" rx="3" fill="rgba(255,255,255,0.05)"/>

              <!-- Main content area -->
              <rect x="260" y="48" width="1180" height="852" fill="#0a0a0a"/>

              <!-- Top bar -->
              <rect x="260" y="48" width="1180" height="56" fill="#0a0a0a"/>
              <rect x="292" y="64" width="280" height="32" rx="6" fill="#141414"/>
              <rect x="312" y="76" width="120" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>
              <rect x="1368" y="68" width="60" height="24" rx="4" fill="rgba(255,255,255,0.06)"/>
              <rect x="1380" y="76" width="36" height="8" rx="3" fill="rgba(255,255,255,0.15)"/>

              <!-- Stats row -->
              <rect x="292" y="124" width="252" height="110" rx="8" fill="#141414"/>
              <rect x="320" y="146" width="80" height="8" rx="3" fill="rgba(255,255,255,0.12)"/>
              <text x="320" y="186" fill="#ffffff" font-family="Inter, system-ui" font-size="32" font-weight="400" letter-spacing="-1px">2,847</text>
              <rect x="320" y="200" width="48" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>

              <rect x="564" y="124" width="252" height="110" rx="8" fill="#141414"/>
              <rect x="592" y="146" width="96" height="8" rx="3" fill="rgba(255,255,255,0.12)"/>
              <text x="592" y="186" fill="#ffffff" font-family="Inter, system-ui" font-size="32" font-weight="400" letter-spacing="-1px">94.2%</text>
              <rect x="592" y="200" width="56" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>

              <rect x="836" y="124" width="252" height="110" rx="8" fill="#141414"/>
              <rect x="864" y="146" width="72" height="8" rx="3" fill="rgba(255,255,255,0.12)"/>
              <text x="864" y="186" fill="#ffffff" font-family="Inter, system-ui" font-size="32" font-weight="400" letter-spacing="-1px">$48.5k</text>
              <rect x="864" y="200" width="44" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>

              <rect x="1108" y="124" width="252" height="110" rx="8" fill="#141414"/>
              <rect x="1136" y="146" width="88" height="8" rx="3" fill="rgba(255,255,255,0.12)"/>
              <text x="1136" y="186" fill="#ffffff" font-family="Inter, system-ui" font-size="32" font-weight="400" letter-spacing="-1px">12</text>
              <rect x="1136" y="200" width="52" height="8" rx="3" fill="rgba(255,255,255,0.08)"/>

              <!-- Chart area -->
              <rect x="292" y="258" width="780" height="360" rx="8" fill="#141414"/>
              <rect x="324" y="282" width="140" height="12" rx="4" fill="rgba(255,255,255,0.12)"/>
              <!-- Y axis -->
              <rect x="324" y="320" width="24" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="324" y="380" width="24" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="324" y="440" width="24" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="324" y="500" width="24" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="324" y="560" width="24" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
              <!-- Grid lines -->
              <line x1="360" y1="323" x2="1048" y2="323" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
              <line x1="360" y1="383" x2="1048" y2="383" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
              <line x1="360" y1="443" x2="1048" y2="443" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
              <line x1="360" y1="503" x2="1048" y2="503" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
              <line x1="360" y1="563" x2="1048" y2="563" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
              <!-- Chart line -->
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
                  <stop offset="100%" stop-color="#ffffff" stop-opacity="0.01"/>
                </linearGradient>
              </defs>
              <path d="M360 520 L420 490 L480 470 L540 430 L600 450 L660 400 L720 370 L780 380 L840 340 L900 350 L960 320 L1020 310 L1048 295 L1048 590 L360 590Z" fill="url(#chartGrad)"/>
              <path d="M360 520 L420 490 L480 470 L540 430 L600 450 L660 400 L720 370 L780 380 L840 340 L900 350 L960 320 L1020 310 L1048 295" stroke="#ffffff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
              <circle cx="660" cy="400" r="3" fill="#ffffff" opacity="0.6"/>
              <circle cx="840" cy="340" r="3" fill="#ffffff" opacity="0.6"/>
              <circle cx="1048" cy="295" r="3" fill="#ffffff" opacity="0.6"/>

              <!-- Activity panel -->
              <rect x="1092" y="258" width="268" height="360" rx="8" fill="#141414"/>
              <rect x="1120" y="282" width="100" height="12" rx="4" fill="rgba(255,255,255,0.12)"/>
              <rect x="1120" y="314" width="212" height="1" fill="rgba(255,255,255,0.04)"/>
              <circle cx="1136" cy="338" r="4" fill="rgba(255,255,255,0.15)"/>
              <rect x="1154" y="330" width="120" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="1154" y="344" width="80" height="6" rx="3" fill="rgba(255,255,255,0.05)"/>
              <circle cx="1136" cy="374" r="4" fill="rgba(255,255,255,0.15)"/>
              <rect x="1154" y="366" width="100" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="1154" y="380" width="140" height="6" rx="3" fill="rgba(255,255,255,0.05)"/>
              <circle cx="1136" cy="410" r="4" fill="rgba(255,255,255,0.15)"/>
              <rect x="1154" y="402" width="132" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="1154" y="416" width="96" height="6" rx="3" fill="rgba(255,255,255,0.05)"/>
              <circle cx="1136" cy="446" r="4" fill="rgba(255,255,255,0.15)"/>
              <rect x="1154" y="438" width="88" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="1154" y="452" width="112" height="6" rx="3" fill="rgba(255,255,255,0.05)"/>
              <circle cx="1136" cy="482" r="4" fill="rgba(255,255,255,0.15)"/>
              <rect x="1154" y="474" width="108" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="1154" y="488" width="72" height="6" rx="3" fill="rgba(255,255,255,0.05)"/>

              <!-- Bottom cards -->
              <rect x="292" y="642" width="350" height="130" rx="8" fill="#141414"/>
              <rect x="320" y="666" width="100" height="10" rx="4" fill="rgba(255,255,255,0.12)"/>
              <rect x="320" y="688" width="280" height="7" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="320" y="704" width="200" height="7" rx="3" fill="rgba(255,255,255,0.04)"/>
              <rect x="320" y="728" width="20" height="24" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="348" y="720" width="20" height="32" rx="3" fill="rgba(255,255,255,0.08)"/>
              <rect x="376" y="732" width="20" height="20" rx="3" fill="rgba(255,255,255,0.05)"/>
              <rect x="404" y="714" width="20" height="38" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="432" y="724" width="20" height="28" rx="3" fill="rgba(255,255,255,0.07)"/>

              <rect x="662" y="642" width="350" height="130" rx="8" fill="#141414"/>
              <rect x="690" y="666" width="120" height="10" rx="4" fill="rgba(255,255,255,0.12)"/>
              <rect x="690" y="688" width="260" height="7" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="690" y="704" width="180" height="7" rx="3" fill="rgba(255,255,255,0.04)"/>

              <rect x="1032" y="642" width="328" height="130" rx="8" fill="#141414"/>
              <rect x="1060" y="666" width="88" height="10" rx="4" fill="rgba(255,255,255,0.12)"/>
              <rect x="1060" y="688" width="240" height="7" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="1060" y="726" width="272" height="4" rx="2" fill="rgba(255,255,255,0.04)"/>
              <rect x="1060" y="726" width="204" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>
              <rect x="1060" y="742" width="272" height="4" rx="2" fill="rgba(255,255,255,0.04)"/>
              <rect x="1060" y="742" width="163" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>

              <!-- Status bar -->
              <rect x="292" y="796" width="1068" height="56" rx="8" fill="#141414"/>
              <circle cx="324" cy="824" r="4" fill="rgba(255,255,255,0.15)"/>
              <rect x="340" y="820" width="80" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="448" y="820" width="1" height="8" fill="rgba(255,255,255,0.04)"/>
              <rect x="472" y="820" width="120" height="8" rx="3" fill="rgba(255,255,255,0.06)"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Stats strip -->
      <div class="py-10 px-6 bg-t-surface border-t border-t-border">
        <div class="max-w-4xl mx-auto flex items-center justify-center gap-10 flex-wrap">
          <div class="text-center">
            <p class="text-2xl font-normal tracking-[-1px] text-t-text">200+</p>
            <p class="text-[0.69rem] text-t-text-secondary uppercase tracking-[0.35px] font-[450]">Integrations</p>
          </div>
          <div class="w-px h-8 bg-t-border"></div>
          <div class="text-center">
            <p class="text-2xl font-normal tracking-[-1px] text-t-text">4.9/5</p>
            <p class="text-[0.69rem] text-t-text-secondary uppercase tracking-[0.35px] font-[450]">User rating</p>
          </div>
          <div class="w-px h-8 bg-t-border"></div>
          <div class="text-center">
            <p class="text-2xl font-normal tracking-[-1px] text-t-text">24/7</p>
            <p class="text-[0.69rem] text-t-text-secondary uppercase tracking-[0.35px] font-[450]">Support</p>
          </div>
          <div class="w-px h-8 bg-t-border"></div>
          <div class="text-center">
            <p class="text-2xl font-normal tracking-[-1px] text-t-text">SOC 2</p>
            <p class="text-[0.69rem] text-t-text-secondary uppercase tracking-[0.35px] font-[450]">Certified</p>
          </div>
        </div>
      </div>
      </div>
    `
  }
}

customElements.define('hero-image', HeroImage)
