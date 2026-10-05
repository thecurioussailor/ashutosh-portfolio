// One place for contact details used across the site (footer, buttons).

export const site = {
  name: "Ashutosh Sagar",
  email: "ashu.sagar111@gmail.com",
  timeZone: "Asia/Kolkata",
  city: "Gurgaon",
  /** Cal.com / Calendly link — leave empty to hide the "Book a call" button */
  bookingUrl: "https://calendly.com/ashu-sagar111",
  /** short availability line with a green dot — leave empty to hide it */
  availability: "Open to freelance & full-time roles",
  // icons pop out of the footer avatar, in this order (left → right)
  socials: [
    { label: "GitHub", icon: "github", href: "https://github.com/thecurioussailor" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/ashutosh-sagar-4b2612185/" },
    { label: "X", icon: "x", href: "https://x.com/sagar11ashutosh" },
  ] as { label: string; icon: "github" | "linkedin" | "x"; href: string }[],
};
