// app/admin/certificate/page.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminCertificatePage() {
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Fetch logged-in user
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

  // 2. Check admin access
  useEffect(() => {
    if (!user) return;

    const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID;
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (user._id !== ADMIN_ID || user.username !== ADMIN_EMAIL) {
      alert("Warning: Access Denied");
      router.push("/");
    }
  }, [user, router]);

  // 3. Fetch team members
  useEffect(() => {
    const fetchMembers = async () => {
      if (!user) return;

      try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID;
        const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

        const res = await axios.get(`${base}/certificate/admin/team`, {
          headers: {
            "x-admin-id": ADMIN_ID,
            "x-admin-email": ADMIN_EMAIL,
          },
        });


        setMembers(res.data.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [user]);


  const handleCardClick = (memberId) => {
    router.push(`/admin/certificate/${memberId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Admin - Manage Certificates
        </h1>

        {members.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No team members found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => {
              const certificateActive = member.certificate?.status === 1;
              
              return (
                <div
                  key={member._id}
                  onClick={() => handleCardClick(member._id)}
                  className="bg-gray-900 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:scale-105 border border-gray-800 relative"
                >
                  {/* Status Indicator */}
                  <div
                    className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                      certificateActive ? "bg-green-500" : "bg-red-500"
                    }`}
                    title={certificateActive ? "Certificate Active" : "Certificate Inactive"}
                  ></div>

                  {/* Avatar */}
                  {member.avatar && (
                    <div className="mb-4">
                      <Image
                        src={member.avatar}
                        alt={member.displayName}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    </div>
                  )}

                  <h2 className="text-xl font-semibold text-white mb-2">
                    {member.displayName}
                  </h2>
                  <p className="text-gray-400 text-sm mb-1">
                    <span className="font-medium">Category:</span> {member.category}
                  </p>
                  <p className="text-gray-400 text-sm mb-1">
                    <span className="font-medium">Role:</span> {member.role}
                  </p>
                  <p className="text-gray-400 text-sm">
                    <span className="font-medium">Department:</span> {member.department}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}