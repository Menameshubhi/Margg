// Entrance animation props: fades and slides up when the element scrolls into view, and plays again on every return.
// Smaller travel and an earlier trigger on phones, where elements are tall relative to the screen.
export const reveal = (i = 0, y = 44) => {
  const small = typeof window !== "undefined" && window.innerWidth <= 720
  return {
    initial: { opacity: 0, y: small ? Math.round(y * 0.6) : y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { amount: small ? 0.12 : 0.25 },
    transition: { duration: small ? 0.55 : 0.7, delay: i * (small ? 0.06 : 0.09), ease: [0.22, 1, 0.36, 1] },
  }
}
