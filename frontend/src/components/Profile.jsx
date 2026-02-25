import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { authUser, updateProfile } = useAuthStore();
  const [fullname, setFullname] = useState(authUser?.fullname);
  const [bio, setBio] = useState(authUser?.bio);

  const updateProfileHandler = () => {
    const bioTrimmed = bio.trim();
    const fullnameTrimmed = fullname.trim();

    updateProfile(bioTrimmed, fullnameTrimmed);
  };

  return (
    <div className="w-full border h-full mt-5 flex flex-col items-center py-10 px-5 rounded-md border-blue-950 bg-slate-900/30">
      <div className="size-24 border rounded-full flex text-4xl justify-center items-center bg-green-800/70">
        {authUser?.username[0].toUpperCase()}
      </div>

      <div className="flex flex-col mt-5 items-center">
        <div className="flex gap-2">
          <span>Username:</span>
          <span className="text-gray-300 cursor-not-allowed">
            {authUser.username}
          </span>
        </div>

        <div className="flex gap-2">
          <span>Email:</span>
          <span className="text-gray-300 cursor-not-allowed">
            {authUser.email}
          </span>
        </div>
      </div>

      <div className="w-full mt-5 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">Name</h2>
          <input
            type="text"
            className="border-b"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl">Bio</h2>
          <textarea
            type="text"
            className="border p-1 rounded-md resize-none h-20"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button
          className="border border-gray-950 py-1 rounded-full cursor-pointer bg-green-800 text-lg"
          onClick={updateProfileHandler}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
