import { ChartConfig } from "@/components/ui/chart.tsx";

const chartConfigWL: { [key: string]: { label: string; color: string } } = {
  very_light: {
    label: "Visitors",
    color: "#FF3C3C",
  },
  light: {
    label: "Chrome",
    color: "#FFB44F",
  },
  average: {
    label: "Safari",
    color: "#F9DD47",
  },
  heavy: {
    label: "Firefox",
    color: "#B2F66E",
  },
  very_heavy: {
    label: "Edge",
    color: "#00C577",
  },
} satisfies ChartConfig;

const chartConfigRC: { [key: string]: { label: string; color: string } } = {
  very_recommend: {
    label: "Visitors",
    color: "#FF3C3C",
  },
  recommend: {
    label: "Chrome",
    color: "#FFB44F",
  },
  unrecommend: {
    label: "Firefox",
    color: "#B2F66E",
  },
  very_unrecommend: {
    label: "Edge",
    color: "#00C577",
  },
} satisfies ChartConfig;

export { chartConfigWL, chartConfigRC };
