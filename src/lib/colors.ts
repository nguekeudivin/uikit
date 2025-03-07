// Associate any value to a particular.
// It's like text => color translation.

import { hexToRGBA } from "./utils";

export const colors: Record<string | number, string> = {
  success: "",
  Paid: "#059669",
  "Out of date": "#DC2626",
  Progress: "#F59E0B",
  "In Progress": "#F59E0B",
  Completed: "#059669",
  Failed: "#DC2626",
  Pending: "#F59E0B",
  Cancelled: "#DC2626",
  Active: "#059669",
  Rejected: "#94A3B8",
  Banned: "#DC2626",
  Publish: "#06B6D4",
  Draft: "#64748B",
  publish: "#06B6D4",
  draft: "#64748B",
  failed: "#DC2626",
  pending: "#F59E0B",
  cancelled: "#DC2626",
  active: "#059669",
  rejected: "#94A3B8",
  banned: "#DC2626",
  All: "white",
  0: "#CA8A04",
  1: "#059669",
  2: "#0891B2",
  3: "#C026D3",
  4: "#F43F5E",
  /////////////
  "Application Received": "#D0ED5A",
  "HR Screening": "#e4f5a3",
  "Technical Interview": "#bde619",
  Hire: "#e6eafe",
  Declined: "#F87171",
  score_perfect: "#D0ED5A",
  score_good: "#CAD2FE",
  score_medium: "#6B7280",
  score_bad: "#EF4444",
  succeed_step: "#cad2fe",
  current_step: "#D0ED5A",
  upcomming_step: "#e6eafe",
  sent: "#CAD2FE",
  accepted: "#D0ED5A",
  declined: "#F87171",

  "Salary/Benefits": "#e4f5a3",
  "Career Growth": "#f2fad1",
  "Counter Offer": "#bde619",
  "Personal Reasons": "#CAD2FE",
  Others: "#e6eafe",
  "Process Issues": "#9baafd",
  Reviewed: "#cdd4fe",
  Overdue: "#D1D5DB",
  Engineering: "#9A3412",
  Marketing: "#4D7C0F",
  Sales: "#0891B2",
  "Customer Support": "#1D4ED8",
  Finance: "#1D4ED8",
  "Human Resources": "#DB2777",
  Legal: "#E11D48",
  Administration: "#15803D",

  facebook: "#1877F2", // Facebook blue
  twitter: "#1DA1F2", // Twitter blue
  x: "#000000", // X (formerly Twitter) black
  instagram: "#E4405F", // Instagram pink
  linkedin: "#0A66C2", // LinkedIn blue
  youtube: "#FF0000", // YouTube red
  github: "#181717", // GitHub black
  discord: "#5865F2", // Discord blurple
  slack: "#4A154B", // Slack purple
  reddit: "#FF4500", // Reddit orange
  tiktok: "#000000", // TikTok black
  whatsapp: "#25D366", // WhatsApp green
  snapchat: "#FFFC00", // Snapchat yellow
  pinterest: "#BD081C", // Pinterest red
  twitch: "#9146FF", // Twitch purple
  medium: "#000000", // Medium black
  dribbble: "#EA4C89", // Dribbble pink
  behance: "#1769FF", // Behance blue
  vimeo: "#1AB7EA", // Vimeo blue
  spotify: "#1DB954", // Spotify green
  soundcloud: "#FF3300", // SoundCloud orange
  telegram: "#0088CC", // Telegram blue
  skype: "#00AFF0", // Skype blue
  zoom: "#2D8CFF", // Zoom blue
  windows: "#0078D4", // Windows blue
  apple: "#000000", // Apple black
  android: "#3DDC84", // Android green
  google: "#4285F4", // Google blue
};

export const backgrounds: Record<string | number, string> = {
  All: "#020617",
};

export const getColor = (name: string) => {
  const color = colors[name];

  return color == undefined ? "#64748B" : color;
};

export const getBackground = (name: string, opacity = 0.1) => {
  const bg = backgrounds[name];
  if (bg == undefined) {
    const color = colors[name];
    return color == undefined ? "#CBD5E1" : hexToRGBA(color, opacity);
  } else {
    return bg;
  }
};
