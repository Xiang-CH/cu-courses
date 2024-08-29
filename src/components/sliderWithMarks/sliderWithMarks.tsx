import { Slider } from "@/components/ui/slider";

function SliderWithMarks({
  maxMarks,
  setValue,
}: {
  maxMarks: number;
  setValue: any;
}) {
  const max = maxMarks - 1;
  const marks = [];
  for (let i = 0; i < maxMarks; i++) {
    marks.push({ value: (i / max) * 100 });
  }

  return (
    <div className="w-[98%] flex flex-col items-center relative my-4">
      <Slider
        onValueChange={(value) => {
          setValue(value[0] + 1);
        }}
        defaultValue={[Math.floor(max / 2)]}
        max={max}
        step={1}
        className="w-full bg-muted"
      />
      <div className="relative mt-2 w-[calc(100%-4px-0.5rem)] flex justify-between">
        {marks.map(() => (
          <div className="w-1 h-2 bg-gray-400 mb-1" />
        ))}
      </div>
    </div>
  );
}

export default SliderWithMarks;
