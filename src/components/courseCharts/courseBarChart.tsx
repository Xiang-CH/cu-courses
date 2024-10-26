import { chartConfigGrades } from "@/components/courseCharts/chartConfig";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

function CourseBarChart({
  data,
}: {
  data: {
    [key in
      | "a"
      | "a-"
      | "b+"
      | "b"
      | "b-"
      | "c+"
      | "c"
      | "c-"
      | "d+"
      | "d"
      | "pass"
      | "fail"]: number;
  };
}) {
  const chartData = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const typedKey = key as keyof typeof data;
      chartData.push({
        label: chartConfigGrades[typedKey].label,
        count: data[typedKey],
        fill: chartConfigGrades[typedKey].color,
      });
    }
  }

  return (
    <div className="flex w-full items-center justify-between md:justify-center px-4">
      <ChartContainer
        config={chartConfigGrades}
        className="mx-0 aspect-square max-h-[250px] h-[190px] py-0 w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" />
          <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            tickFormatter={(value) => value}
            width={25}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default CourseBarChart;
