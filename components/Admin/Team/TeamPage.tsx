"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Page from "./Page";

const TeamPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // 1️. Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${base}/auth/user`, { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        router.push("/signup");
      }
    };

    fetchUser();
  }, [router]);

  // 2️. Check admin access once user is set
  useEffect(() => {
    if (!user) return;

    const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID;
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (user._id !== ADMIN_ID && user.username !== ADMIN_EMAIL) {
      alert("Warning: Access Denied");
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      {user ? (
        <Page user={user}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TeamPage;
