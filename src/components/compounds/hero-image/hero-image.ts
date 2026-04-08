class HeroImage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col min-h-dvh snap-start">
      <div class="relative flex-1 flex items-center justify-center px-6 overflow-hidden bg-[linear-gradient(180deg,#d3dfeb_0%,#003366_100%)]">
        <div class="max-w-7xl w-full mx-auto">
          <div class="relative rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,51,102,0.15),0_2px_6px_rgba(0,0,0,0.08)]">
            <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full block h-[70dvh] object-cover">
              <!-- Window frame -->
              <rect width="1440" height="900" rx="16" fill="#0d1b2a"/>

              <!-- Title bar -->
              <rect y="0" width="1440" height="48" rx="16" fill="#14263a"/>
              <rect y="16" width="1440" height="32" fill="#14263a"/>
              <circle cx="28" cy="24" r="7" fill="#ff5f57"/>
              <circle cx="52" cy="24" r="7" fill="#febc2e"/>
              <circle cx="76" cy="24" r="7" fill="#28c840"/>
              <text x="720" y="30" text-anchor="middle" fill="#6db0e0" font-family="Plus Jakarta Sans, system-ui" font-size="14" font-weight="600">Toolio Dashboard</text>

              <!-- Sidebar -->
              <rect x="0" y="48" width="260" height="852" fill="#0f2440"/>
              <!-- Logo area -->
              <rect x="24" y="72" width="212" height="40" rx="10" fill="rgba(109,176,224,0.12)"/>
              <circle cx="46" cy="92" r="10" fill="rgba(109,176,224,0.25)"/>
              <rect x="64" y="86" width="90" height="12" rx="5" fill="#6db0e0"/>
              <!-- Nav section 1 -->
              <rect x="24" y="136" width="100" height="8" rx="4" fill="rgba(255,255,255,0.12)"/>
              <rect x="24" y="160" width="212" height="36" rx="8" fill="rgba(109,176,224,0.08)"/>
              <circle cx="44" cy="178" r="6" fill="rgba(109,176,224,0.4)"/>
              <rect x="60" y="174" width="72" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
              <rect x="24" y="208" width="212" height="36" rx="8" fill="transparent"/>
              <circle cx="44" cy="226" r="6" fill="rgba(255,255,255,0.15)"/>
              <rect x="60" y="222" width="84" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="24" y="256" width="212" height="36" rx="8" fill="transparent"/>
              <circle cx="44" cy="274" r="6" fill="rgba(255,255,255,0.15)"/>
              <rect x="60" y="270" width="60" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="24" y="304" width="212" height="36" rx="8" fill="transparent"/>
              <circle cx="44" cy="322" r="6" fill="rgba(255,255,255,0.15)"/>
              <rect x="60" y="318" width="76" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <!-- Nav section 2 -->
              <rect x="24" y="368" width="80" height="8" rx="4" fill="rgba(255,255,255,0.12)"/>
              <rect x="24" y="392" width="212" height="36" rx="8" fill="transparent"/>
              <circle cx="44" cy="410" r="6" fill="rgba(255,255,255,0.15)"/>
              <rect x="60" y="406" width="68" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="24" y="440" width="212" height="36" rx="8" fill="transparent"/>
              <circle cx="44" cy="458" r="6" fill="rgba(255,255,255,0.15)"/>
              <rect x="60" y="454" width="92" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="24" y="488" width="212" height="36" rx="8" fill="transparent"/>
              <circle cx="44" cy="506" r="6" fill="rgba(255,255,255,0.15)"/>
              <rect x="60" y="502" width="56" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <!-- Sidebar bottom user -->
              <rect x="24" y="830" width="212" height="46" rx="10" fill="rgba(255,255,255,0.04)"/>
              <circle cx="50" cy="853" r="14" fill="rgba(109,176,224,0.2)"/>
              <rect x="72" y="845" width="80" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <rect x="72" y="858" width="52" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>

              <!-- Main content area -->
              <rect x="260" y="48" width="1180" height="852" fill="#0d1b2a"/>

              <!-- Top bar with search and actions -->
              <rect x="260" y="48" width="1180" height="56" fill="#0d1b2a"/>
              <rect x="292" y="64" width="280" height="32" rx="8" fill="#14263a"/>
              <rect x="312" y="76" width="120" height="8" rx="4" fill="rgba(255,255,255,0.15)"/>
              <rect x="1280" y="68" width="32" height="24" rx="6" fill="rgba(255,255,255,0.06)"/>
              <rect x="1324" y="68" width="32" height="24" rx="6" fill="rgba(255,255,255,0.06)"/>
              <rect x="1368" y="68" width="60" height="24" rx="6" fill="rgba(109,176,224,0.15)"/>
              <rect x="1380" y="76" width="36" height="8" rx="4" fill="#6db0e0"/>

              <!-- Top stats row -->
              <rect x="292" y="124" width="252" height="110" rx="14" fill="#14263a"/>
              <rect x="320" y="146" width="80" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <text x="320" y="186" fill="#6db0e0" font-family="Plus Jakarta Sans, system-ui" font-size="32" font-weight="700">2,847</text>
              <rect x="320" y="200" width="48" height="8" rx="4" fill="#28c840" opacity="0.6"/>
              <rect x="376" y="200" width="32" height="8" rx="4" fill="rgba(255,255,255,0.1)"/>

              <rect x="564" y="124" width="252" height="110" rx="14" fill="#14263a"/>
              <rect x="592" y="146" width="96" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <text x="592" y="186" fill="#febc2e" font-family="Plus Jakarta Sans, system-ui" font-size="32" font-weight="700">94.2%</text>
              <rect x="592" y="200" width="56" height="8" rx="4" fill="#febc2e" opacity="0.4"/>
              <rect x="656" y="200" width="40" height="8" rx="4" fill="rgba(255,255,255,0.1)"/>

              <rect x="836" y="124" width="252" height="110" rx="14" fill="#14263a"/>
              <rect x="864" y="146" width="72" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <text x="864" y="186" fill="#28c840" font-family="Plus Jakarta Sans, system-ui" font-size="32" font-weight="700">$48.5k</text>
              <rect x="864" y="200" width="44" height="8" rx="4" fill="#28c840" opacity="0.6"/>
              <rect x="916" y="200" width="28" height="8" rx="4" fill="rgba(255,255,255,0.1)"/>

              <rect x="1108" y="124" width="252" height="110" rx="14" fill="#14263a"/>
              <rect x="1136" y="146" width="88" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
              <text x="1136" y="186" fill="#ff5f57" font-family="Plus Jakarta Sans, system-ui" font-size="32" font-weight="700">12</text>
              <rect x="1136" y="200" width="52" height="8" rx="4" fill="#ff5f57" opacity="0.4"/>
              <rect x="1196" y="200" width="36" height="8" rx="4" fill="rgba(255,255,255,0.1)"/>

              <!-- Chart area -->
              <rect x="292" y="258" width="780" height="360" rx="14" fill="#14263a"/>
              <rect x="324" y="282" width="140" height="12" rx="5" fill="rgba(255,255,255,0.25)"/>
              <!-- Period tabs -->
              <rect x="860" y="280" width="48" height="20" rx="6" fill="rgba(109,176,224,0.15)"/>
              <rect x="870" y="286" width="28" height="8" rx="4" fill="#6db0e0"/>
              <rect x="916" y="280" width="48" height="20" rx="6" fill="transparent"/>
              <rect x="926" y="286" width="28" height="8" rx="4" fill="rgba(255,255,255,0.15)"/>
              <rect x="972" y="280" width="48" height="20" rx="6" fill="transparent"/>
              <rect x="982" y="286" width="28" height="8" rx="4" fill="rgba(255,255,255,0.15)"/>

              <!-- Y axis labels -->
              <rect x="324" y="320" width="24" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="324" y="380" width="24" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="324" y="440" width="24" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="324" y="500" width="24" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="324" y="560" width="24" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>

              <!-- Grid lines -->
              <line x1="360" y1="323" x2="1048" y2="323" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
              <line x1="360" y1="383" x2="1048" y2="383" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
              <line x1="360" y1="443" x2="1048" y2="443" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
              <line x1="360" y1="503" x2="1048" y2="503" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
              <line x1="360" y1="563" x2="1048" y2="563" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

              <!-- Area chart - primary -->
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#6db0e0" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#6db0e0" stop-opacity="0.01"/>
                </linearGradient>
                <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#28c840" stop-opacity="0.15"/>
                  <stop offset="100%" stop-color="#28c840" stop-opacity="0.01"/>
                </linearGradient>
              </defs>
              <!-- Secondary line fill -->
              <path d="M360 540 L420 530 L480 510 L540 520 L600 490 L660 480 L720 470 L780 460 L840 450 L900 440 L960 445 L1020 430 L1048 425 L1048 590 L360 590Z" fill="url(#chartGrad2)"/>
              <path d="M360 540 L420 530 L480 510 L540 520 L600 490 L660 480 L720 470 L780 460 L840 450 L900 440 L960 445 L1020 430 L1048 425" stroke="#28c840" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
              <!-- Primary line fill -->
              <path d="M360 520 L420 490 L480 470 L540 430 L600 450 L660 400 L720 370 L780 380 L840 340 L900 350 L960 320 L1020 310 L1048 295 L1048 590 L360 590Z" fill="url(#chartGrad)"/>
              <path d="M360 520 L420 490 L480 470 L540 430 L600 450 L660 400 L720 370 L780 380 L840 340 L900 350 L960 320 L1020 310 L1048 295" stroke="#6db0e0" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

              <!-- Chart dots -->
              <circle cx="660" cy="400" r="5" fill="#6db0e0"/>
              <circle cx="840" cy="340" r="5" fill="#6db0e0"/>
              <circle cx="1048" cy="295" r="5" fill="#6db0e0"/>

              <!-- X axis labels -->
              <rect x="380" y="580" width="28" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="500" y="580" width="28" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="620" y="580" width="28" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="740" y="580" width="28" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="860" y="580" width="28" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="980" y="580" width="28" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>

              <!-- Right panel - Activity feed -->
              <rect x="1092" y="258" width="268" height="360" rx="14" fill="#14263a"/>
              <rect x="1120" y="282" width="100" height="12" rx="5" fill="rgba(255,255,255,0.25)"/>
              <rect x="1296" y="282" width="36" height="12" rx="5" fill="rgba(255,255,255,0.08)"/>

              <!-- Activity items -->
              <rect x="1120" y="314" width="212" height="1" fill="rgba(255,255,255,0.04)"/>
              <circle cx="1136" cy="338" r="5" fill="#28c840"/>
              <rect x="1154" y="330" width="120" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="1154" y="344" width="80" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
              <circle cx="1136" cy="374" r="5" fill="#6db0e0"/>
              <rect x="1154" y="366" width="100" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="1154" y="380" width="140" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
              <circle cx="1136" cy="410" r="5" fill="#febc2e"/>
              <rect x="1154" y="402" width="132" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="1154" y="416" width="96" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
              <circle cx="1136" cy="446" r="5" fill="#28c840"/>
              <rect x="1154" y="438" width="88" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="1154" y="452" width="112" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
              <circle cx="1136" cy="482" r="5" fill="#ff5f57"/>
              <rect x="1154" y="474" width="108" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="1154" y="488" width="72" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
              <circle cx="1136" cy="518" r="5" fill="#6db0e0"/>
              <rect x="1154" y="510" width="96" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="1154" y="524" width="128" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
              <circle cx="1136" cy="554" r="5" fill="#febc2e"/>
              <rect x="1154" y="546" width="116" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="1154" y="560" width="84" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
              <circle cx="1136" cy="590" r="5" fill="#28c840"/>
              <rect x="1154" y="582" width="76" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="1154" y="596" width="104" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>

              <!-- Bottom row - expanded cards -->
              <rect x="292" y="642" width="350" height="130" rx="14" fill="#14263a"/>
              <rect x="320" y="666" width="100" height="10" rx="5" fill="rgba(255,255,255,0.25)"/>
              <rect x="320" y="688" width="280" height="7" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="320" y="704" width="200" height="7" rx="3" fill="rgba(255,255,255,0.07)"/>
              <!-- Mini bar chart -->
              <rect x="320" y="728" width="20" height="24" rx="4" fill="rgba(109,176,224,0.3)"/>
              <rect x="348" y="720" width="20" height="32" rx="4" fill="rgba(109,176,224,0.4)"/>
              <rect x="376" y="732" width="20" height="20" rx="4" fill="rgba(109,176,224,0.25)"/>
              <rect x="404" y="714" width="20" height="38" rx="4" fill="#6db0e0" opacity="0.6"/>
              <rect x="432" y="724" width="20" height="28" rx="4" fill="rgba(109,176,224,0.35)"/>

              <rect x="662" y="642" width="350" height="130" rx="14" fill="#14263a"/>
              <rect x="690" y="666" width="120" height="10" rx="5" fill="rgba(255,255,255,0.25)"/>
              <rect x="690" y="688" width="260" height="7" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="690" y="704" width="180" height="7" rx="3" fill="rgba(255,255,255,0.07)"/>
              <!-- Donut chart -->
              <circle cx="730" cy="742" r="18" fill="none" stroke="rgba(109,176,224,0.2)" stroke-width="6"/>
              <circle cx="730" cy="742" r="18" fill="none" stroke="#6db0e0" stroke-width="6" stroke-dasharray="75 113" stroke-dashoffset="0" opacity="0.7"/>
              <circle cx="730" cy="742" r="18" fill="none" stroke="#28c840" stroke-width="6" stroke-dasharray="28 113" stroke-dashoffset="-75" opacity="0.7"/>
              <rect x="764" y="730" width="60" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
              <rect x="764" y="744" width="44" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>

              <rect x="1032" y="642" width="328" height="130" rx="14" fill="#14263a"/>
              <rect x="1060" y="666" width="88" height="10" rx="5" fill="rgba(255,255,255,0.25)"/>
              <rect x="1060" y="688" width="240" height="7" rx="3" fill="rgba(255,255,255,0.1)"/>
              <rect x="1060" y="704" width="160" height="7" rx="3" fill="rgba(255,255,255,0.07)"/>
              <!-- Progress bars -->
              <rect x="1060" y="726" width="272" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="1060" y="726" width="204" height="6" rx="3" fill="#28c840" opacity="0.5"/>
              <rect x="1060" y="742" width="272" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="1060" y="742" width="163" height="6" rx="3" fill="#febc2e" opacity="0.5"/>
              <rect x="1060" y="758" width="272" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
              <rect x="1060" y="758" width="122" height="6" rx="3" fill="#6db0e0" opacity="0.5"/>

              <!-- Bottom status bar -->
              <rect x="292" y="796" width="1068" height="56" rx="14" fill="#14263a"/>
              <circle cx="324" cy="824" r="6" fill="#28c840" opacity="0.8"/>
              <rect x="340" y="820" width="80" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
              <rect x="448" y="820" width="1" height="8" fill="rgba(255,255,255,0.08)"/>
              <rect x="472" y="820" width="120" height="8" rx="4" fill="rgba(255,255,255,0.12)"/>
              <rect x="1240" y="816" width="88" height="16" rx="6" fill="rgba(109,176,224,0.1)"/>
              <rect x="1256" y="820" width="56" height="8" rx="4" fill="#6db0e0" opacity="0.6"/>
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
    `
  }
}

customElements.define('hero-image', HeroImage)
