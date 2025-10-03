"use client";
import React from "react";
import { ShieldHalf } from "lucide-react";
import { Flame } from "lucide-react";

const UserProfile = ({user}) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <div className="image relative w-10 h-10 rounded-full bg-green-900 flex justify-center items-center">
        <span className="text-center relative bottom-0.5">{user.firstName[0]}</span>
      </div>
      <div>
        <h1 className="text-[0.9rem]">{user.firstName}</h1>
        <p className="text-[0.7rem] text-gray-500">{user.username}</p>
      </div>
    </div>
  )
};

const LevelComponenet = ({user}) => {
  return (
    <div className="flex items-center h-full gap-5 text-[500] text-[0.8rem]">
      <div className="badge flex gap-2 items-center">
        <Flame className="text-blue-800" />
        <span>LVL</span>
        <span>{user.games.bubble.level}</span>
      </div>

      <div className="badge flex gap-2 items-center">
        <ShieldHalf size={22} className="text-blue-800" />
        <span>MAX SCORE</span>
        <span>{user.games.bubble.highestScore}</span>
      </div>
    </div>
  )
}

const GameProfile = ({user}) => {
  return (
    <div className="cursor-auto relative z-[200] flex justify-between bg-[#00000084] px-[1.5rem] pr-[2rem] py-[0.8rem]">
      <div className="left"><UserProfile user={user} /></div>
      <div className="right hidden sm:flex"><LevelComponenet user={user} /></div>
    </div>
  );
};

export default GameProfile;
