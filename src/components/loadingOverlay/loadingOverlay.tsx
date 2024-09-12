import DotLoader from "react-spinners/BounceLoader";

export default function LoadingOverlay() {
  return (
    <div className="w-full h-full absolute flex justify-center items-center z-40">
      <div className="w-full h-full bg-muted opacity-60 absolute"></div>
      <DotLoader color="var(--secondary)" />
    </div>
  );
}
