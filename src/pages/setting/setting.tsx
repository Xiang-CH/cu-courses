import NavBar from "@/components/navbar/navbar";

function Setting() {
  return (
    <div className="flex">
      <NavBar currentPath="/settings" />
      <div className="flex w-full h-full py-10 pl-14 text-left">
        <span>setting</span>
      </div>
    </div>
  );
}

export default Setting;
