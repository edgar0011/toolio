class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-toolio-100/40 text-toolio-500 px-6 text-center text-sm border-t border-toolio-200/50 flex flex-col items-center justify-end min-h-dvh snap-end pt-12 pb-12">
        <div class="mt-auto">
          <p>&copy; 2026 Toolio. All rights reserved.</p>
          <p class="mt-1">Built with love for makers everywhere.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);
