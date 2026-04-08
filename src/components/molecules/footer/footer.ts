class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-runway-black text-runway-footer px-6 text-center text-sm border-t border-runway-border flex flex-col items-center justify-end min-h-dvh snap-end pt-12 pb-12">
        <div class="mt-auto">
          <p class="text-runway-footer">&copy; 2026 Toolio. All rights reserved.</p>
          <p class="mt-1 text-runway-muted">Built with love for makers everywhere.</p>
        </div>
      </footer>
    `
  }
}

customElements.define('site-footer', SiteFooter)
