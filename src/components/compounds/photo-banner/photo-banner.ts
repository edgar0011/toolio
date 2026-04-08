class PhotoBanner extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col min-h-dvh snap-start">
        <!-- Cinematic image area -->
        <div class="relative flex-1 flex items-center justify-center px-6 overflow-hidden bg-runway-black">
          <div class="max-w-7xl w-full mx-auto relative py-10">
            <p class="text-center text-runway-slate text-[0.69rem] font-[450] tracking-[0.35px] uppercase mb-6">Trusted by forward-thinking teams worldwide</p>

            <div class="relative rounded-lg overflow-hidden border border-runway-border">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop&crop=center&q=80"
                alt="Business team collaborating around computer screens in a modern office"
                class="w-full block object-cover h-[70dvh]"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.4)_0%,transparent_40%,transparent_60%,rgba(0,0,0,0.4)_100%)]"></div>
              <div class="absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.4)_50%,transparent_100%)]"></div>

              <div class="absolute bottom-6 left-8 right-8 flex items-end justify-between">
                <div>
                  <p class="text-runway-white font-normal text-lg tracking-[-0.5px]">Real teams. Real results.</p>
                  <p class="text-runway-slate text-[0.81rem] tracking-[-0.16px]">Join 10,000+ professionals using Toolio daily</p>
                </div>
                <div class="flex gap-6 text-runway-white text-center">
                  <div>
                    <p class="text-2xl font-normal tracking-[-1px]">98%</p>
                    <p class="text-[0.69rem] text-runway-slate uppercase tracking-[0.35px] font-[450]">Satisfaction</p>
                  </div>
                  <div>
                    <p class="text-2xl font-normal tracking-[-1px]">4.9</p>
                    <p class="text-[0.69rem] text-runway-slate uppercase tracking-[0.35px] font-[450]">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats strip -->
        <div class="py-10 px-6 bg-runway-surface border-t border-runway-border">
          <div class="max-w-4xl mx-auto flex items-center justify-center gap-10 flex-wrap">
            <div class="text-center">
              <p class="text-2xl font-normal tracking-[-1px] text-runway-white">10,000+</p>
              <p class="text-[0.69rem] text-runway-slate uppercase tracking-[0.35px] font-[450]">Teams</p>
            </div>
            <div class="w-px h-8 bg-runway-border"></div>
            <div class="text-center">
              <p class="text-2xl font-normal tracking-[-1px] text-runway-white">50M+</p>
              <p class="text-[0.69rem] text-runway-slate uppercase tracking-[0.35px] font-[450]">Tasks completed</p>
            </div>
            <div class="w-px h-8 bg-runway-border"></div>
            <div class="text-center">
              <p class="text-2xl font-normal tracking-[-1px] text-runway-white">99.9%</p>
              <p class="text-[0.69rem] text-runway-slate uppercase tracking-[0.35px] font-[450]">Uptime</p>
            </div>
            <div class="w-px h-8 bg-runway-border"></div>
            <div class="text-center">
              <p class="text-2xl font-normal tracking-[-1px] text-runway-white">142</p>
              <p class="text-[0.69rem] text-runway-slate uppercase tracking-[0.35px] font-[450]">Countries</p>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('photo-banner', PhotoBanner)
