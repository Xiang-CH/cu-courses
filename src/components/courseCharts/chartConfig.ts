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
    color: "#00C577",
  },
  "a-": {
    label: "A-",
    color: "#B2F66E",
  },
  "b+": {
    label: "B+",
    color: "#F9DD47",
  },
  b: {
    label: "B",
    color: "#FCFF7C",
  },
  "b-": {
    label: "B-",
    color: "#FF8753",
  },
  "c+": {
    label: "C+",
    color: "#FF3C3C",
  },
  c: {
    label: "C",
    color: "#FF6915",
  },
  "c-": {
    label: "C-",
    color: "#FF623F",
  },
  "d+": {
    label: "D+",
    color: "#0038FF",
  },
  d: {
    label: "D",
    color: "#9E00FF",
  },
  pass: {
    label: "Pass",
    color: "#AC6ABD",
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
