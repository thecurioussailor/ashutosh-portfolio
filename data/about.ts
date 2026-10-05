export type AboutPill = {
  label: string;
  color: string;
  /** position around the photo on desktop, in % of the orbit box */
  x: number;
  y: number;
  rotate: number;
};

// Keep these honest: each pill is a claim a client will hold you to.
export const aboutPills: AboutPill[] = [
  { label: "Ships end to end", color: "#F7D35E", x: 50, y: 6, rotate: -4 },
  { label: "Rust → React Native", color: "#6DE3EA", x: 86, y: 30, rotate: 5 },
  { label: "On-chain + off-chain", color: "#E851E3", x: 82, y: 82, rotate: -3 },
  { label: "Owns it in production", color: "#9886D8", x: 18, y: 82, rotate: 4 },
  { label: "Clear communicator", color: "#F0A33E", x: 15, y: 28, rotate: -6 },
];
