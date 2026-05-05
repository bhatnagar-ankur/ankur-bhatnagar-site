import { useEffect } from 'react';

export function useFavicon(emoji: string) {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, 32, 32);
    }
    
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL();
    document.getElementsByTagName('head')[0].appendChild(link);

    // Update page title
    document.title = 'Ankur Bhatnagar - Technical Architect & UI/UX Practice Head';
    
    // Add meta tags for social sharing
    const metaTags = [
      { property: 'og:title', content: 'Ankur Bhatnagar - Technical Architect & UI/UX Practice Head' },
      { property: 'og:description', content: '13+ years of experience in frontend technology and team leadership. Specialized in Angular, React, and modern web architectures.' },
      { property: 'og:type', content: 'website' },
      { name: 'description', content: 'Interactive resume of Ankur Bhatnagar - Technical Architect and UI/UX Practice Head with 13+ years of experience in frontend technologies.' },
      { name: 'author', content: 'Ankur Bhatnagar' }
    ];

    metaTags.forEach(({ property, name, content }) => {
      let meta = document.querySelector(
        property ? `meta[property="${property}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) meta.setAttribute('property', property);
        if (name) meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }, [emoji]);
}
