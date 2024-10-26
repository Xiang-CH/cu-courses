import { ChartConfig } from "@/components/ui/chart.tsx";

const chartConfigWL: { [key: string]: { label: string; color: string } } = {
  very_light: {
    label: "Visitors",
    color: "#00C577",
  },
  light: {
    label: "Chrome",
    color: "#B2F66E",
  },
  average: {
    label: "Safari",
    color: "#F9DD47",
  },
  heavy: {
    label: "Firefox",
    color: "#FFB44F",
  },
  very_heavy: {
    label: "Edge",
    color: "#FF3C3C",
  },
  null: {
    label: "N/A",
    color: "#858484",
  },
} satisfies ChartConfig;

const chartConfigRC: { [key: string]: { label: string; color: string } } = {
  very_recommend: {
    label: "Visitors",
    color: "#00C577",
  },
  recommend: {
    label: "Chrome",
    color: "#B2F66E",
  },
  average: {
    label: "Safari",
    color: "#F9DD47",
  },
  unrecommend: {
    label: "Firefox",
    color: "#FFB44F",
  },
  very_unrecommend: {
    label: "Edge",
    color: "#FF3C3C",
  },
  null: {
    label: "N/A",
    color: "#858484",
  },
} satisfies ChartConfig;

const chartConfigGrades: { [key: string]: { label: string; color: string } } = {
  a: {
    label: "A",
    color: "#006400",
  },
  "a-": {
    label: "A-",
    color: "#228B22",
  },
  "b+": {
    label: "B+",
    color: "#32CD32",
  },
  b: {
    label: "B",
    color: "#7CFC00",
  },
  "b-": {
    label: "B-",
    color: "#ADFF2F",
  },
  "c+": {
    label: "C+",
    color: "#FFFF00",
  },
  c: {
    label: "C",
    color: "#FFD700",
  },
  "c-": {
    label: "C-",
    color: "#FFA500",
  },
  "d+": {
    label: "D+",
    color: "#FF4500",
  },
  d: {
    label: "D",
    color: "#FF0000",
  },
  pass: {
    label: "Pass",
    color: "#D3D3D3",
  },
  fail: {
    label: "Fail",
    color: "#000000",
  },
  count: {
    label: " ",
    color: "#FF3C3C",
  },
} satisfies ChartConfig;

export { chartConfigWL, chartConfigRC, chartConfigGrades };
