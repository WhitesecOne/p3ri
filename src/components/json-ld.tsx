export function JsonLd({ data }: { data: object }) {
  // Escape '<' supaya aman disisipkan ke HTML (mencegah penutupan tag script).
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
