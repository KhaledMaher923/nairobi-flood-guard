export type RiskLevel = "very-low" | "low" | "moderate" | "high" | "critical";

export const RISK_META: Record<
  RiskLevel,
  { label: string; token: string; fill: string; text: string; ring: string }
> = {
  "very-low": {
    label: "Very Low",
    token: "risk-verylow",
    fill: "var(--risk-verylow)",
    text: "text-risk-verylow",
    ring: "bg-risk-verylow",
  },
  low: {
    label: "Low",
    token: "risk-low",
    fill: "var(--risk-low)",
    text: "text-risk-low",
    ring: "bg-risk-low",
  },
  moderate: {
    label: "Moderate",
    token: "risk-moderate",
    fill: "var(--risk-moderate)",
    text: "text-risk-moderate",
    ring: "bg-risk-moderate",
  },
  high: {
    label: "High",
    token: "risk-high",
    fill: "var(--risk-high)",
    text: "text-risk-high",
    ring: "bg-risk-high",
  },
  critical: {
    label: "Critical",
    token: "risk-critical",
    fill: "var(--risk-critical)",
    text: "text-risk-critical",
    ring: "bg-risk-critical",
  },
};

export type Ward = {
  id: string;
  name: string;
  subcounty: string;
  risk: RiskLevel;
  score: number;
  population: number;
  elevation: number;
  rainfall24h: number;
  /** SVG polygon points inside a 1000 x 700 viewBox */
  points: string;
  labelAt: [number, number];
  drivers: { factor: string; weight: number }[];
};

export const WARDS: Ward[] = [
  {
    id: "kibra",
    name: "Kibra",
    subcounty: "Kibra",
    risk: "high",
    score: 87,
    population: 18430,
    elevation: 1682,
    rainfall24h: 42,
    points: "300,380 400,360 452,410 430,486 330,500 280,440",
    labelAt: [364, 428],
    drivers: [
      { factor: "Elevation", weight: 62 },
      { factor: "Slope", weight: 21 },
      { factor: "Rainfall", weight: 11 },
      { factor: "Other factors", weight: 6 },
    ],
  },
  {
    id: "mukuru",
    name: "Mukuru kwa Njenga",
    subcounty: "Embakasi South",
    risk: "critical",
    score: 94,
    population: 26100,
    elevation: 1598,
    rainfall24h: 58,
    points: "560,430 664,412 720,470 690,548 586,556 540,494",
    labelAt: [624, 484],
    drivers: [
      { factor: "Elevation", weight: 55 },
      { factor: "Drainage density", weight: 24 },
      { factor: "Rainfall", weight: 14 },
      { factor: "Other factors", weight: 7 },
    ],
  },
  {
    id: "dandora",
    name: "Dandora Area II",
    subcounty: "Embakasi North",
    risk: "critical",
    score: 91,
    population: 21740,
    elevation: 1611,
    rainfall24h: 54,
    points: "660,220 764,206 812,262 790,334 686,344 640,286",
    labelAt: [724, 274],
    drivers: [
      { factor: "River proximity", weight: 48 },
      { factor: "Elevation", weight: 27 },
      { factor: "Rainfall", weight: 17 },
      { factor: "Other factors", weight: 8 },
    ],
  },
  {
    id: "embakasi-north",
    name: "Embakasi North",
    subcounty: "Embakasi",
    risk: "high",
    score: 78,
    population: 15980,
    elevation: 1629,
    rainfall24h: 46,
    points: "790,300 890,290 926,360 894,432 800,436 764,368",
    labelAt: [844, 362],
    drivers: [
      { factor: "Elevation", weight: 51 },
      { factor: "Slope", weight: 26 },
      { factor: "Rainfall", weight: 15 },
      { factor: "Other factors", weight: 8 },
    ],
  },
  {
    id: "cbd",
    name: "Nairobi Central",
    subcounty: "Starehe",
    risk: "moderate",
    score: 54,
    population: 9420,
    elevation: 1728,
    rainfall24h: 31,
    points: "440,270 534,254 580,312 552,378 460,388 416,326",
    labelAt: [498, 320],
    drivers: [
      { factor: "Impervious surface", weight: 44 },
      { factor: "Drainage capacity", weight: 30 },
      { factor: "Rainfall", weight: 18 },
      { factor: "Other factors", weight: 8 },
    ],
  },
  {
    id: "westlands",
    name: "Westlands",
    subcounty: "Westlands",
    risk: "low",
    score: 26,
    population: 4310,
    elevation: 1795,
    rainfall24h: 22,
    points: "290,180 386,166 430,224 402,290 310,298 268,238",
    labelAt: [348, 232],
    drivers: [
      { factor: "Elevation", weight: 66 },
      { factor: "Slope", weight: 20 },
      { factor: "Rainfall", weight: 9 },
      { factor: "Other factors", weight: 5 },
    ],
  },
  {
    id: "kilimani",
    name: "Kilimani",
    subcounty: "Dagoretti North",
    risk: "low",
    score: 31,
    population: 5120,
    elevation: 1772,
    rainfall24h: 25,
    points: "330,300 420,292 452,348 424,406 340,410 302,354",
    labelAt: [378, 350],
    drivers: [
      { factor: "Elevation", weight: 58 },
      { factor: "Slope", weight: 25 },
      { factor: "Rainfall", weight: 11 },
      { factor: "Other factors", weight: 6 },
    ],
  },
  {
    id: "karen",
    name: "Karen",
    subcounty: "Langata",
    risk: "very-low",
    score: 12,
    population: 1890,
    elevation: 1852,
    rainfall24h: 18,
    points: "170,430 268,420 308,478 280,552 186,560 142,492",
    labelAt: [224, 490],
    drivers: [
      { factor: "Elevation", weight: 71 },
      { factor: "Slope", weight: 18 },
      { factor: "Rainfall", weight: 7 },
      { factor: "Other factors", weight: 4 },
    ],
  },
  {
    id: "kasarani",
    name: "Kasarani",
    subcounty: "Kasarani",
    risk: "moderate",
    score: 49,
    population: 11220,
    elevation: 1701,
    rainfall24h: 34,
    points: "560,150 660,138 700,196 672,262 578,268 538,206",
    labelAt: [618, 202],
    drivers: [
      { factor: "Elevation", weight: 47 },
      { factor: "Slope", weight: 29 },
      { factor: "Rainfall", weight: 16 },
      { factor: "Other factors", weight: 8 },
    ],
  },
  {
    id: "ruaraka",
    name: "Ruaraka",
    subcounty: "Ruaraka",
    risk: "moderate",
    score: 58,
    population: 12760,
    elevation: 1668,
    rainfall24h: 37,
    points: "500,180 566,172 596,226 570,282 496,288 464,232",
    labelAt: [530, 230],
    drivers: [
      { factor: "River proximity", weight: 42 },
      { factor: "Elevation", weight: 31 },
      { factor: "Rainfall", weight: 19 },
      { factor: "Other factors", weight: 8 },
    ],
  },
  {
    id: "langata",
    name: "Lang'ata",
    subcounty: "Langata",
    risk: "low",
    score: 34,
    population: 6740,
    elevation: 1754,
    rainfall24h: 27,
    points: "280,470 372,462 412,520 384,590 292,596 250,530",
    labelAt: [330, 528],
    drivers: [
      { factor: "Elevation", weight: 60 },
      { factor: "Slope", weight: 23 },
      { factor: "Rainfall", weight: 11 },
      { factor: "Other factors", weight: 6 },
    ],
  },
  {
    id: "makadara",
    name: "Makadara",
    subcounty: "Makadara",
    risk: "high",
    score: 73,
    population: 14210,
    elevation: 1645,
    rainfall24h: 44,
    points: "460,392 552,384 588,440 560,504 470,508 432,446",
    labelAt: [508, 446],
    drivers: [
      { factor: "Elevation", weight: 53 },
      { factor: "Drainage capacity", weight: 25 },
      { factor: "Rainfall", weight: 15 },
      { factor: "Other factors", weight: 7 },
    ],
  },
  {
    id: "kamukunji",
    name: "Kamukunji",
    subcounty: "Kamukunji",
    risk: "high",
    score: 69,
    population: 13320,
    elevation: 1652,
    rainfall24h: 40,
    points: "556,296 640,288 674,344 646,404 562,408 528,352",
    labelAt: [600, 348],
    drivers: [
      { factor: "River proximity", weight: 45 },
      { factor: "Elevation", weight: 28 },
      { factor: "Rainfall", weight: 19 },
      { factor: "Other factors", weight: 8 },
    ],
  },
  {
    id: "roysambu",
    name: "Roysambu",
    subcounty: "Roysambu",
    risk: "low",
    score: 29,
    population: 5980,
    elevation: 1781,
    rainfall24h: 24,
    points: "420,120 508,110 542,164 516,220 434,226 398,172",
    labelAt: [468, 166],
    drivers: [
      { factor: "Elevation", weight: 64 },
      { factor: "Slope", weight: 21 },
      { factor: "Rainfall", weight: 10 },
      { factor: "Other factors", weight: 5 },
    ],
  },
];

export const RIVERS = [
  "M120,250 C260,300 340,240 430,300 C520,360 600,330 700,392 C780,442 860,430 960,470",
  "M300,120 C380,200 420,240 470,330 C520,420 560,470 600,560",
];

export const ROADS: { id: string; name: string; d: string; major?: boolean }[] = [
  { id: "mombasa", name: "Mombasa Road", d: "M470,330 L640,470 L820,560", major: true },
  { id: "thika", name: "Thika Superhighway", d: "M470,330 L560,200 L660,90", major: true },
  { id: "waiyaki", name: "Waiyaki Way", d: "M470,330 L340,250 L200,200", major: true },
  { id: "ngong", name: "Ngong Road", d: "M470,330 L340,410 L200,470", major: true },
  { id: "jogoo", name: "Jogoo Road", d: "M480,350 L620,380 L780,360" },
  { id: "outer", name: "Outer Ring Road", d: "M700,180 L760,330 L730,500" },
  { id: "langata-rd", name: "Lang'ata Road", d: "M460,370 L370,470 L250,540" },
];

export const MATATU_ROUTES = [
  { id: "r46", name: "Route 46", d: "M470,330 L400,270 L330,220" },
  { id: "r33", name: "Route 33", d: "M470,340 L620,430 L700,500" },
  { id: "r58", name: "Route 58", d: "M470,320 L600,300 L720,262" },
];

export type FloodPatch = { id: string; cx: number; cy: number; rx: number; ry: number; severity: RiskLevel };
export const FLOODED_AREAS: FloodPatch[] = [
  { id: "f1", cx: 640, cy: 486, rx: 46, ry: 30, severity: "critical" },
  { id: "f2", cx: 726, cy: 278, rx: 40, ry: 26, severity: "critical" },
  { id: "f3", cx: 366, cy: 432, rx: 34, ry: 22, severity: "high" },
  { id: "f4", cx: 512, cy: 452, rx: 28, ry: 18, severity: "high" },
];

export type MapPin = {
  id: string;
  name: string;
  x: number;
  y: number;
  kind: "evacuation" | "emergency" | "blocked";
  detail?: string;
};

export const MAP_PINS: MapPin[] = [
  { id: "e1", name: "Nairobi Emergency Center", x: 492, y: 300, kind: "evacuation", detail: "62% occupied" },
  { id: "e2", name: "Kasarani Stadium Shelter", x: 618, y: 176, kind: "evacuation", detail: "38% occupied" },
  { id: "e3", name: "Langata Community Hall", x: 322, y: 512, kind: "evacuation", detail: "81% occupied" },
  { id: "s1", name: "Kenyatta National Hospital", x: 418, y: 386, kind: "emergency", detail: "Trauma centre" },
  { id: "s2", name: "Embakasi Fire Station", x: 836, y: 366, kind: "emergency", detail: "4 units ready" },
  { id: "b1", name: "Jogoo Rd / Rabai Jn", x: 604, y: 384, kind: "blocked", detail: "Impassable" },
  { id: "b2", name: "Dandora Bridge", x: 700, y: 300, kind: "blocked", detail: "Water 0.8 m" },
];

export const SUMMARY = [
  {
    id: "critical",
    risk: "critical" as RiskLevel,
    value: 12,
    label: "Critical Areas",
    description: "Immediate action required",
    trend: "+3 in last 6h",
    bars: [30, 42, 38, 55, 62, 74, 88],
  },
  {
    id: "high",
    risk: "high" as RiskLevel,
    value: 24,
    label: "High Risk Areas",
    description: "Avoid non-essential travel",
    trend: "+5 in last 6h",
    bars: [40, 46, 44, 52, 58, 64, 70],
  },
  {
    id: "moderate",
    risk: "moderate" as RiskLevel,
    value: 38,
    label: "Moderate Areas",
    description: "Monitor conditions closely",
    trend: "stable",
    bars: [52, 50, 55, 51, 54, 53, 56],
  },
  {
    id: "low",
    risk: "low" as RiskLevel,
    value: 71,
    label: "Low Risk Areas",
    description: "Normal movement expected",
    trend: "-4 in last 6h",
    bars: [70, 68, 66, 64, 60, 58, 55],
  },
];

export type Alert = {
  id: string;
  severity: RiskLevel;
  category: "Critical" | "High" | "Weather" | "Roads" | "System";
  title: string;
  body: string;
  location: string;
  time: string;
};

export const ALERTS: Alert[] = [
  {
    id: "a1",
    severity: "critical",
    category: "Critical",
    title: "Critical Flood Risk",
    body: "Flood risk increased significantly in Embakasi North. Model confidence 0.93.",
    location: "Embakasi North",
    time: "10:21 AM",
  },
  {
    id: "a2",
    severity: "high",
    category: "Roads",
    title: "Road Risk Alert",
    body: "Major flooding detected near Dandora. Dandora Bridge is impassable to matatus.",
    location: "Dandora Area II",
    time: "10:04 AM",
  },
  {
    id: "a3",
    severity: "moderate",
    category: "Weather",
    title: "Weather Alert",
    body: "Heavy rainfall expected within the next 6 hours — up to 48 mm accumulation.",
    location: "Nairobi County",
    time: "09:47 AM",
  },
  {
    id: "a4",
    severity: "critical",
    category: "Critical",
    title: "Evacuation Advisory",
    body: "Mukuru kwa Njenga riverine settlements advised to move to designated shelters.",
    location: "Mukuru kwa Njenga",
    time: "09:32 AM",
  },
  {
    id: "a5",
    severity: "high",
    category: "Roads",
    title: "Matatu Route Disruption",
    body: "Route 33 diverted via Outer Ring Road; expect 15–20 minute delays.",
    location: "Jogoo Road",
    time: "09:10 AM",
  },
  {
    id: "a6",
    severity: "low",
    category: "System",
    title: "Model Refresh Complete",
    body: "Susceptibility model retrained on latest rainfall and gauge readings.",
    location: "System",
    time: "08:55 AM",
  },
];

export type EvacCenter = {
  id: string;
  name: string;
  area: string;
  distanceKm: number;
  capacity: number;
  occupancy: number;
  status: "Available" | "Filling Up" | "Full";
};

export const EVAC_CENTERS: EvacCenter[] = [
  { id: "c1", name: "Nairobi Emergency Center", area: "Starehe", distanceKm: 1.8, capacity: 500, occupancy: 62, status: "Available" },
  { id: "c2", name: "Kasarani Stadium Shelter", area: "Kasarani", distanceKm: 6.4, capacity: 1200, occupancy: 38, status: "Available" },
  { id: "c3", name: "Langata Community Hall", area: "Lang'ata", distanceKm: 4.2, capacity: 320, occupancy: 81, status: "Filling Up" },
  { id: "c4", name: "Makadara Social Hall", area: "Makadara", distanceKm: 3.1, capacity: 260, occupancy: 96, status: "Full" },
  { id: "c5", name: "Dagoretti Youth Centre", area: "Dagoretti", distanceKm: 7.9, capacity: 400, occupancy: 44, status: "Available" },
];

export const ROUTE_OPTIONS = [
  {
    id: "recommended",
    name: "Recommended Route",
    verdict: "SAFE" as const,
    risk: "low" as RiskLevel,
    eta: 32,
    distance: 18.7,
    riskScore: 18,
    safer: 82,
    delta: "+7 min compared to current route",
    d: "M470,330 C420,270 380,240 340,232 C320,228 306,230 300,232",
    hazards: ["1 moderate-risk segment on Waiyaki Way"],
  },
  {
    id: "current",
    name: "Current Route",
    verdict: "AVOID" as const,
    risk: "critical" as RiskLevel,
    eta: 25,
    distance: 15.2,
    riskScore: 84,
    safer: 0,
    delta: "Fastest, but crosses 2 critical flood zones",
    d: "M470,330 C440,360 400,400 366,432 C340,456 320,300 300,232",
    hazards: ["Kibra underpass flooded (0.6 m)", "Ngong Road drainage overflow"],
  },
];

export const RAINFALL_TRENDS = [
  { day: "Mon", rainfall: 12, risk: 34 },
  { day: "Tue", rainfall: 18, risk: 41 },
  { day: "Wed", rainfall: 9, risk: 30 },
  { day: "Thu", rainfall: 27, risk: 52 },
  { day: "Fri", rainfall: 38, risk: 66 },
  { day: "Sat", rainfall: 44, risk: 74 },
  { day: "Sun", rainfall: 42, risk: 71 },
];

export const VULNERABLE_WARDS = WARDS.slice()
  .sort((a, b) => b.score - a.score)
  .slice(0, 6);

export const AFFECTED_ROADS = [
  { road: "Jogoo Road", incidents: 14, status: "Blocked" },
  { road: "Outer Ring Road", incidents: 11, status: "Partially flooded" },
  { road: "Mombasa Road", incidents: 9, status: "Passable — caution" },
  { road: "Ngong Road", incidents: 7, status: "Partially flooded" },
  { road: "Lang'ata Road", incidents: 4, status: "Passable" },
];

export function scenarioFor(rainfall: number) {
  const t = rainfall / 100;
  return {
    wardsAtRisk: Math.round(14 + t * 47),
    routesAffected: Math.round(2 + t * 16),
    populationExposed: Math.round(38 + t * 190),
    roadsAffected: Math.round(5 + t * 34),
    escalation: t < 0.25 ? "low" : t < 0.5 ? "moderate" : t < 0.75 ? "high" : "critical",
  } as const;
}

/** Deterministic per-ward risk shift as rainfall rises. */
export function wardRiskAt(ward: Ward, rainfall: number): RiskLevel {
  const shifted = ward.score + (rainfall - 40) * 0.75;
  if (shifted >= 82) return "critical";
  if (shifted >= 64) return "high";
  if (shifted >= 45) return "moderate";
  if (shifted >= 25) return "low";
  return "very-low";
}
