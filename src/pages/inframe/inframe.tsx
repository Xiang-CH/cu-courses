import { useParams } from "react-router-dom";

function InFrame() {
  const { path } = useParams();
  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-full relative"
        src={`http://localhost:5173/${path}`}
      ></iframe>
    </div>
  );
}

export default InFrame;
