"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

// Main wrapper component
export default function UpdateTeamWrapper() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        console.log("🔐 Fetching user from:", `${base}/auth/user`);
        const res = await axios.get(`${base}/auth/user`, {
          withCredentials: true,
        });
        console.log("✅ User fetched:", res.data.user);
        setUser(res.data.user);
      } catch (err) {
        console.error("❌ User fetch failed:", err);
        setUser(null);
        router.push("/signup");
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID;
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    console.log("🔍 Checking admin access...");
    console.log("User ID:", user._id, "vs Admin ID:", ADMIN_ID);
    console.log("User Email:", user.username, "vs Admin Email:", ADMIN_EMAIL);

    if (user._id !== ADMIN_ID && user.username !== ADMIN_EMAIL) {
      console.warn("⚠️ Access Denied");
      alert("Warning: Access Denied");
      router.push("/");
    } else {
      console.log("✅ Admin access granted");
    }
  }, [user, router]);

  return (
    <div className="cursor-auto">
      {user ? (
        <UpdateTeamPage user={user} />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <p className="text-white text-xl">Loading...</p>
        </div>
      )}
    </div>
  );
}

// Actual update page component
function UpdateTeamPage({ user }) {
  const router = useRouter();
  const params = useParams();
  const reviewId = params?.reviewId; // FIXED: Changed from memberId to reviewId

  console.log("🎯 UpdateTeamPage mounted");
  console.log("📍 Params:", params);
  console.log("🆔 Review ID from params:", reviewId);

  const [form, setForm] = useState({
    memberId: "",
    displayName: "",
    category: "",
    role: "",
    avatar: "",
    social: { linkedIn: "", twitter: "" },
    review: "",
    status: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID;
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Fetch member data and auto-fill form
  useEffect(() => {
    if (!reviewId || !user) return;

    const fetchMember = async () => {
      try {
        setIsLoading(true);
        const base = process.env.NEXT_PUBLIC_API_URL;
        const headers = {
          "x-admin-id": user._id,
          "x-admin-email": user.username,
        };

        console.log("Fetching data for reviewId:", reviewId);
        console.log("API URL:", `${base}/admin/companyReview`);

        const res = await axios.get(`${base}/admin/companyReview`, { headers });
        
        console.log("Full API Response:", res);
        console.log("Response data:", res.data);
        console.log("Response data type:", typeof res.data);
        console.log("Is Array?", Array.isArray(res.data));
        
        // Handle different response structures
        let reviews = res.data;
        
        // If data is wrapped in a data property
        if (res.data.data) {
          reviews = res.data.data;
          console.log("Using nested data:", reviews);
        }
        
        // Ensure we have an array
        if (!Array.isArray(reviews)) {
          console.error("Response is not an array:", reviews);
          alert("Invalid response format from server");
          setIsLoading(false);
          return;
        }

        console.log("Total reviews found:", reviews.length);
        console.log("Looking for _id:", reviewId);
        
        // Log all _id values to help debug
        reviews.forEach((item, index) => {
          console.log(`Review ${index} _id:`, item._id, "Type:", typeof item._id);
        });
        
        // FIXED: Find by _id instead of memberId
        const member = reviews.find((m) => m._id === reviewId);

        if (member) {
          console.log("✅ Found member:", member);
          // Auto-fill the form with existing data
          setForm({
            memberId: member.memberId || "",
            displayName: member.displayName || "",
            category: member.category || "",
            role: member.role || "",
            avatar: member.avatar || "",
            social: {
              linkedIn: member.social?.linkedIn || "",
              twitter: member.social?.twitter || "",
            },
            review: member.review || "",
            status: member.status ?? 1,
          });
        } else {
          console.error("❌ Team member not found with _id:", reviewId);
          console.error("Available IDs:", reviews.map(m => m._id));
          alert(`Team member not found. Looking for ID: ${reviewId}`);
          // Don't redirect, let user see the error
        }
      } catch (err) {
        console.error("❌ Failed to fetch member:", err);
        console.error("Error details:", err.response || err);
        alert(`Failed to fetch team member data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [reviewId, user, router]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "linkedIn" || name === "twitter") {
      setForm((prev) => ({
        ...prev,
        social: { ...prev.social, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle status toggle
  const handleStatusToggle = () => {
    setForm((prev) => ({ ...prev, status: prev.status === 1 ? 0 : 1 }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL;
      const headers = {
        "x-admin-id": user._id,
        "x-admin-email": user.username,
      };

      // FIXED: Use reviewId (which is the _id) in the URL
      const res = await axios.put(`${base}/admin/companyReview/${reviewId}`, form, {
        headers,
      });

      if (res.status === 200 || res.status === 201) {
        alert("Team member updated successfully!");
        router.push("/admin/team");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update team member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["Leadership", "Intern", "Employee"];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-white mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-white text-xl">Loading member data...</p>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gray-900">
      <div className="flex min-h-screen justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col p-6 sm:p-8 lg:p-10 justify-center items-center bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 w-full max-w-4xl">
          {/* Title Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
              Update Team Member
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
              Modify team member details and status
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full"
          >
            {/* Member ID - Read Only */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Member ID
              </label>
              <input
                type="text"
                name="memberId"
                value={form.memberId}
                readOnly
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Display Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="displayName"
                value={form.displayName}
                required
                placeholder="Enter display name"
                readOnly
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={form.category}
               
          
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 focus:outline-none cursor-not-allowed"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                placeholder="e.g., Web Developer Intern"
                readOnly
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Avatar URL */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                placeholder="https://cloudinary.com/..."
                readOnly
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedIn"
                value={form.social.linkedIn}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                readOnly
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Twitter URL
              </label>
              <input
                type="url"
                name="twitter"
                value={form.social.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
                readOnly
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Review */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Review Message
              </label>
              <textarea
                name="review"
                value={form.review}
                onChange={handleChange}
                rows="4"
                placeholder="Enter review message..."
               readOnly
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Status Toggle */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Member Status
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleStatusToggle}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    form.status === 1 ? "bg-green-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                      form.status === 1 ? "translate-x-9" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-white font-medium">
                  {form.status === 1 ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {form.status === 1
                  ? "This member is currently active and visible"
                  : "This member is currently inactive and hidden"}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="sm:col-span-2 cursor-pointer bg-gradient-to-r from-white to-gray-200 text-black font-semibold text-base rounded-lg py-3.5 mt-4 hover:from-gray-100 hover:to-gray-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Team Member"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs sm:text-sm text-gray-400 mt-6 text-center">
            or go back to{" "}
            <a
              href="/admin/team"
              className="underline hover:text-white transition-colors font-medium"
            >
              admin team page
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}