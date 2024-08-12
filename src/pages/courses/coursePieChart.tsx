import { useTranslation } from "react-i18next";
import { chartConfigRC, chartConfigWL } from "@/pages/courses/chartConfig.ts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import { Label as PieLabel, Pie, PieChart } from "recharts";
import LoadIndicator from "@/components/courseReviewCard/loadIndicator.tsx";

function CoursePieChart({
  data,
  chat_type,
}: {
  data: number[];
  chat_type: "wl" | "rc";
}) {
  const { t } = useTranslation();

  let labels;
  const chartConfig = chat_type === "wl" ? chartConfigWL : chartConfigRC;
  let configKey: string[] = [];

  if (chat_type == "wl") {
    labels = t("courseReview.workload-levels", {
      returnObjects: true,
    }) as Array<string>;
    configKey = ["very_light", "light", "average", "heavy", "very_heavy"];
  } else {
    labels = t("courseReview.recommend-levels", {
      returnObjects: true,
    }) as Array<string>;
    configKey = [
      "very_recommend",
      "recommend",
      "unrecommend",
      "very_unrecommend",
    ];
  }

  const chartData = [];
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    chartConfig[configKey[i]].label = labels[i];
    chartData.push({
      label: configKey[i],
      count: data[i],
      fill: chartConfig[configKey[i]].color,
    });
    total += data[i];
  }

  return (
    <div className="flex">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] h-[190px] py-0"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="label"
            innerRadius={45}
            strokeWidth={5}
          >
            <PieLabel
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 7}
                        className="fill-foreground text-lg font-bold"
                      >
                        {t("courseDetail.course-chart-total")}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 18}
                        className="fill-muted-foreground text-sm"
                      >
                        {total}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col ml-5 gap-3 h-full justify-center">
        {chartData.map((item, index) => {
          if (item.count === 0) return;
          return <LoadIndicator rate={index} type={chat_type} />;
        })}
      </div>
    </div>
  );
}

export default CoursePieChart;
