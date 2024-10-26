import { useTranslation } from "react-i18next";
import {
  chartConfigRC,
  chartConfigWL,
} from "@/components/courseCharts/chartConfig";
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
  const noData = data.every((item) => item === 0);
  let configKey: string[];

  const chartData = [];
  let total = 0;
  if (chat_type == "wl") {
    labels = t("courseReview.workload-levels", {
      returnObjects: true,
    }) as Array<string>;
    configKey = [
      "very_heavy",
      "heavy",
      "average",
      "light",
      "very_light",
      "null",
    ];
  } else {
    labels = t("courseReview.recommend-levels", {
      returnObjects: true,
    }) as Array<string>;
    configKey = [
      "very_unrecommend",
      "unrecommend",
      "average",
      "recommend",
      "very_recommend",
      "null",
    ];
  }
  for (let i = 0; i < data.length; i++) {
    chartConfig[configKey[i]].label = labels[i];
    chartData.push({
      label: configKey[i],
      count: data[i],
      fill: chartConfig[configKey[i]].color,
    });
    total += data[i];
  }
  if (noData) {
    chartData.push({
      label: "N/A",
      count: 1,
      fill: chartConfig.null.color,
    });
    total += 0;
  }

  return (
    <div className="flex md:w-fit w-full items-center justify-between md:justify-center px-4 max-w-[26em]">
      <ChartContainer
        config={chartConfig}
        className="mx-0 aspect-square max-h-[250px] h-[190px] py-0"
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
            animationDuration={500}
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
                      {noData ? (
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy || 0}
                          className="fill-foreground text-lg font-bold"
                        >
                          {t("courseReview.no-data")}
                        </tspan>
                      ) : (
                        <>
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
                        </>
                      )}
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      {!noData && (
        <div className="flex flex-col gap-3 ml-1.5 mr-4 md:mr-0 h-full justify-center">
          {chartData.map((item, index) => {
            if (item.count === 0) return;
            return (
              <LoadIndicator key={index} rate={index + 1} type={chat_type} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CoursePieChart;
