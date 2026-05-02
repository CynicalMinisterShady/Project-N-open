// app/certificate/[userId]/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import ParticlesBackground from "@/components/shared/particle-background";
import NoiseTexture from "@/components/shared/noise-texture";
import CustomCursor from "@/components/shared/custom-cursor";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Award,
  Calendar,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export default function CertificateUserPage() {
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef(null);

  // states from your original logic
  const [user, setUser] = useState(null);
  const [currMember, setCurrMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  const userId = params.userId;

  // 1. Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${base}/auth/user`, { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        // User not logged in - block access
        alert("Please login to view certificates");
        router.push("/certificate");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  // 2. Fetch member data (only if user is logged in)
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${base}/certificate/${userId}`);
        setCurrMember(res.data.data);
      } catch (error) {
        console.error("Error fetching member:", error);
        router.push("/certificate");
      } finally {
        setLoading(false);
      }
    };

    if (userId && user) {
      fetchMember();
    }
  }, [userId, user, router]);

  // 3. Check access once both user and currMember are loaded
  useEffect(() => {
    if (!user || !currMember) return;

    const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID;
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const isAdmin = user._id === ADMIN_ID && user.username === ADMIN_EMAIL;
    const isOwner = user._id === currMember._id && user.username === currMember.email;

    if (!isAdmin && !isOwner) {
      setAccessDenied(true);
      alert("Access Denied: You don't have permission to view this page.");
      router.push("/certificate");
    }
  }, [user, currMember, router]);

  // Helper: convert your currMember.certificate structure into certificate array expected by UI
  const buildCertificatesArray = (member) => {
    if (!member || !member.certificate) return [];

    const certs = [];

    const { offerLetter, experienceLetter } = member.certificate;

    if (offerLetter && offerLetter.status === "1") {
      certs.push({
        id: `offer_${member._id || "unknown"}`,
        type: "offer_letter",
        name: offerLetter.displayName || "Offer Letter",
        description: offerLetter.description || "",
        issueDate: offerLetter.issueDate || (offerLetter.createdAt || new Date().toISOString()),
        driveUrl: offerLetter.driveUrl || offerLetter.imageURL || "#", // fallback to imageURL if no drive link
      });
    }

    if (experienceLetter && experienceLetter.status === "1") {
      certs.push({
        id: `exp_${member._id || "unknown"}`,
        type: "experience_letter",
        name: experienceLetter.displayName || "Experience Letter",
        description: experienceLetter.description || "",
        issueDate: experienceLetter.issueDate || (experienceLetter.createdAt || new Date().toISOString()),
        driveUrl: experienceLetter.driveUrl || experienceLetter.imageURL || "#",
      });
    }

    return certs;
  };

  // UI helper functions from sample UI
  const getDocumentIcon = (type) => {
    switch (type) {
      case "offer_letter":
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case "completion_certificate":
        return <Award className="w-5 h-5 text-green-400" />;
      case "experience_letter":
        return <FileText className="w-5 h-5 text-purple-400" />;
      case "recommendation_letter":
        return <GraduationCap className="w-5 h-5 text-yellow-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getDocumentTypeColor = (type) => {
    switch (type) {
      case "offer_letter":
        return "from-blue-500/20 to-blue-600/20 border-blue-500/30";
      case "completion_certificate":
        return "from-green-500/20 to-green-600/20 border-green-500/30";
      case "experience_letter":
        return "from-purple-500/20 to-purple-600/20 border-purple-500/30";
      case "recommendation_letter":
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-500/30";
    }
  };

  // Loading states
  if (loading || userLoading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </ThemeProvider>
    );
  }

  if (accessDenied || !currMember) {
    return null;
  }

  // Build certificates array for rendering
  const certificates = buildCertificatesArray(currMember);

  // Render
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden"
      >
        {/* Visual components from sample UI */}
        <CustomCursor containerRef={containerRef} />
        <NoiseTexture />
        <ParticlesBackground />

        <div className="relative z-10 min-h-screen">
          <div className="flex items-center justify-between p-6 md:p-8">
            <Link
              href="/certificate"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Certificates</span>
            </Link>
          </div>

          {/* Profile / member header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="px-6 md:px-8 mb-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                      {/* Use the avatar provided by currMember; fallback placeholder */}
                      <img
                        src={currMember.avatar || "/placeholder-avatar.png"}
                        alt={currMember.displayName || currMember.name || "Member"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-avatar.png";
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      {currMember.displayName || currMember.name || "Unknown"}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{currMember.role}</span>
                      </div>
                      {currMember.education && (
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{currMember.education}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center md:justify-start">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          currMember.category === "leadership"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : currMember.category === "employee"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {currMember.category === "leadership"
                          ? "Leadership"
                          : currMember.category === "employee"
                          ? "Employee"
                          : "Intern"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Extra member details (mapping from your original UI) */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-sm">Category</p>
                    <p className="text-white">{currMember.category || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Department</p>
                    <p className="text-white">{currMember.department || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Education</p>
                    <p className="text-white">{currMember.education || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certificates section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-6 md:px-8 pb-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl md:text-3xl font-bold">Available Certificates</h2>
              </div>

              <div className="grid gap-6">
                {certificates.map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${getDocumentTypeColor(certificate.type)} backdrop-blur-sm border rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-gray-800/50">
                          {getDocumentIcon(certificate.type)}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{certificate.name}</h3>
                          {certificate.description && (
                            <p className="text-gray-300 mb-3">{certificate.description}</p>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Issued:{" "}
                              {certificate.issueDate
                                ? new Date(certificate.issueDate).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <a
                          href={certificate.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </a>
                        <a
                          href={
                            typeof certificate.driveUrl === "string"
                              ? certificate.driveUrl.replace("/view", "/export?format=pdf")
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">Download</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {certificates.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No certificates available</h3>
                  <p className="text-gray-400">Certificates will be available once they are issued.</p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="px-6 md:px-8 pb-12 max-w-4xl mx-auto">
            <button
              onClick={() => router.push("/certificate")}
              className="mt-8 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            >
              ← Back to Certificates
            </button>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
