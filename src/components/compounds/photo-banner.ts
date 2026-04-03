class PhotoBanner extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col min-h-dvh snap-start">
        <!-- Image area -->
        <div class="relative flex-1 flex items-center justify-center px-6 overflow-hidden bg-[linear-gradient(180deg,#dbe2e9_0%,#003366_100%)]">
          <!-- Decorative blurred circles -->
          <div class="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-3xl bg-[rgba(109,176,224,0.2)]"></div>
          <div class="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl bg-[rgba(0,51,102,0.3)]"></div>

          <div class="max-w-7xl w-full mx-auto relative py-10">
            <p class="text-center text-white text-sm font-medium tracking-widest uppercase mb-6 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">Trusted by forward-thinking teams worldwide</p>

            <div class="relative rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,51,102,0.15),0_2px_6px_rgba(0,0,0,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop&crop=center&q=80"
                alt="Business team collaborating around computer screens in a modern office"
                class="w-full block object-cover h-[70dvh]"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,51,102,0.3)_0%,transparent_40%,transparent_60%,rgba(0,51,102,0.3)_100%)]"></div>
              <div class="absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(to_top,rgba(0,20,40,0.85)_0%,rgba(0,20,40,0.4)_50%,transparent_100%)]"></div>

              <div class="absolute bottom-6 left-8 right-8 flex items-end justify-between">
                <div>
                  <p class="text-white font-semibold text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Real teams. Real results.</p>
                  <p class="text-white/80 text-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">Join 10,000+ professionals using Toolio daily</p>
                </div>
                <div class="flex gap-6 text-white text-center">
                  <div>
                    <p class="text-2xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">98%</p>
                    <p class="text-xs text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">Satisfaction</p>
                  </div>
                  <div>
                    <p class="text-2xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">4.9</p>
                    <p class="text-xs text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-3xl bg-[rgba(109,176,224,0.15)]"></div>
        </div>

        <!-- Light breather strip -->
        <div class="py-10 px-6 bg-[linear-gradient(180deg,#e4eaf1_0%,#f0f4f8_100%)]">
          <div class="max-w-4xl mx-auto flex items-center justify-center gap-10 flex-wrap">
            <div class="text-center">
              <p class="text-2xl font-bold text-toolio-dark">10,000+</p>
              <p class="text-xs text-toolio-400 uppercase tracking-wide">Teams</p>
            </div>
            <div class="w-px h-8 bg-toolio-dark/15"></div>
            <div class="text-center">
              <p class="text-2xl font-bold text-toolio-dark">50M+</p>
              <p class="text-xs text-toolio-400 uppercase tracking-wide">Tasks completed</p>
            </div>
            <div class="w-px h-8 bg-toolio-dark/15"></div>
            <div class="text-center">
              <p class="text-2xl font-bold text-toolio-dark">99.9%</p>
              <p class="text-xs text-toolio-400 uppercase tracking-wide">Uptime</p>
            </div>
            <div class="w-px h-8 bg-toolio-dark/15"></div>
            <div class="text-center">
              <p class="text-2xl font-bold text-toolio-dark">142</p>
              <p class="text-xs text-toolio-400 uppercase tracking-wide">Countries</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("photo-banner", PhotoBanner);
