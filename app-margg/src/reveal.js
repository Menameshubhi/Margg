// Entrance animation props: fades and slides up when the element scrolls into view, and plays again on every return.
export const reveal = (i = 0, y = 44) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.25 },
  transition: { duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
})
