import NavBar from "@/components/navbar/navbar";

function Profile() {
  return (
    <div className="flex">
      <NavBar currentPath="/profile" />
      <div className="flex w-full h-full py-10 pl-14 text-left">
        <span>my profile</span>
      </div>
    </div>
  );
}

export default Profile;
