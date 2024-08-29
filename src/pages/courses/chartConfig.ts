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

export { chartConfigWL, chartConfigRC };
