import { useTranslation } from "react-i18next";

function LoadIndicator({ rate, type }: { rate: number; type: "wl" | "rc" }) {
  const { t } = useTranslation();
  const recommendLevels = t("courseReview.recommend-levels", {
    returnObjects: true,
  }) as Array<string>;
  const workloadLevel = t("courseReview.workload-levels", {
    returnObjects: true,
  }) as Array<string>;

  let description;
  let color = "bg-green-500";
  if (type == "wl") {
    if (rate == 1) color = "bg-[#FF3C3C]";
    else if (rate == 2) color = "bg-[#FFB44F]";
    else if (rate == 3) color = "bg-[#F9DD47]";
    else if (rate == 4) color = "bg-[#B2F66E]";
    description = workloadLevel[rate - 1];
  } else {
    if (rate == 1) color = "bg-[#FF3C3C]";
    else if (rate == 2) color = "bg-[#FFB44F]";
    else if (rate == 3) color = "bg-[#F9DD47]";
    else if (rate == 4) color = "bg-[#B2F66E]";
    description = recommendLevels[rate - 1];
  }

  return (
    <div className="flex h-fit items-center justify-start w-full">
      <div className={`rounded-full h-2 w-2 ${color}`}></div>
      <span className="text-xs text-secondary ml-1">{description}</span>
    </div>
  );
}

export default LoadIndicator;
