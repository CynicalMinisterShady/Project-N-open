"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function UpdateTeamWrapper() {
  const [user, setUser] = useState(null);
  const router = useRouter();

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

function UpdateTeamPage({ user }) {
  const router = useRouter();
  const params = useParams();
  const memberId = params?.memberId;

  const [form, setForm] = useState({
    displayName: "",
    category: "",
    role: "",
    department: "",
    education: "",
    avatar: "",
    email: "",
    address: "",
    social: { linkedIn: "", twitter: "" },
    status: 1,
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [existingAvatar, setExistingAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch member data
  useEffect(() => {
    if (!memberId || !user) return;

    const fetchMember = async () => {
      try {
        setIsLoading(true);
        const base = process.env.NEXT_PUBLIC_API_URL;
        const headers = {
          "x-admin-id": user._id,
          "x-admin-email": user.username,
        };
        
        const res = await axios.get(`${base}/admin/team`, { headers });
        const member = res.data.find((m) => m._id === memberId);
        
        if (member) {
          setForm({
            displayName: member.displayName || "",
            category: member.category || "",
            role: member.role || "",
            department: member.department || "",
            education: member.education || "",
            avatar: member.avatar || "",
            email: member.email || "",
            address: member.address || "",
            social: {
              linkedIn: member.social?.linkedIn || "",
              twitter: member.social?.twitter || "",
            },
            status: member.status ?? 1,
          });
          setExistingAvatar(member.avatar || "");
        } else {
          alert("Team member not found");
          router.push("/admin/team");
        }
      } catch (err) {
        console.error("Failed to fetch member:", err);
        alert("Failed to fetch team member data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [memberId, user, router]);

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

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove new selected image (revert to existing)
  const removeNewImage = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
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
      
      const formData = new FormData();
      formData.append('displayName', form.displayName);
      formData.append('category', form.category);
      formData.append('role', form.role);
      formData.append('department', form.department);
      formData.append('education', form.education);
      formData.append('email', form.email);
      formData.append('address', form.address);
      formData.append('social', JSON.stringify(form.social));
      formData.append('status', form.status);
      
      // Only append new avatar if one was selected
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      
      const res = await axios.put(`${base}/admin/team/${memberId}`, formData, { 
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        }
      });
      
      if (res.status === 200 || res.status === 201) {
        alert("Team member updated successfully!");
        router.push("/admin/team");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert(err.response?.data?.error || "Failed to update team member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    "Web",
    "AI ML",
    "Board",
    "DevOps",
    "Management",
    "Design",
    "Research",
    "Analytic",
    "Finance",
  ];

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
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                name="displayName"
                placeholder="Enter full name"
                onChange={handleChange}
                value={form.displayName}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-white/10"
                required
              />
            </div>

            {/* Role */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role / Position <span className="text-red-400">*</span>
              </label>
              <input
                name="role"
                placeholder="e.g., Frontend Developer, AI Engineer"
                onChange={handleChange}
                value={form.role}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-white/10"
                required
              />
            </div>

            {/* Department */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Department <span className="text-red-400">*</span>
              </label>
              <select
                name="department"
                onChange={handleChange}
                value={form.department}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all hover:bg-white/10 cursor-pointer"
                required
              >
                <option value="" disabled className="bg-gray-900">
                  Select Department
                </option>
                {departments.map((dep) => (
                  <option key={dep} value={dep} className="bg-gray-900">
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                onChange={handleChange}
                value={form.category}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all hover:bg-white/10 cursor-pointer"
                required
              >
                <option value="" disabled className="bg-gray-900">
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Education */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Education <span className="text-red-400">*</span>
              </label>
              <input
                name="education"
                placeholder="e.g., B.Tech in Computer Science"
                onChange={handleChange}
                value={form.education}
                required
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-white/10"
              />
            </div>

            {/* Profile Picture Upload */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profile Picture <span className="text-red-400">*</span>
              </label>
              
              {avatarPreview ? (
                // Show new uploaded image
                <div className="relative w-full">
                  <div className="flex items-center gap-4 p-4 border border-white/10 bg-white/5 rounded-lg">
                    <img 
                      src={avatarPreview} 
                      alt="New preview" 
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{avatarFile?.name}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {(avatarFile?.size / 1024).toFixed(2)} KB
                      </p>
                      <p className="text-green-400 text-xs mt-1">New image selected</p>
                    </div>
                    <button
                      type="button"
                      onClick={removeNewImage}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : existingAvatar ? (
                // Show existing image with option to change
                <div className="relative w-full">
                  <div className="flex items-center gap-4 p-4 border border-white/10 bg-white/5 rounded-lg">
                    <img 
                      src={existingAvatar} 
                      alt="Current avatar" 
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Current profile picture</p>
                      <p className="text-gray-400 text-xs mt-1">Click button to change</p>
                    </div>
                    <label 
                      htmlFor="avatar-upload"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg cursor-pointer transition-all"
                    >
                      Change
                    </label>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                </div>
              ) : (
                // No image - show upload interface
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="flex flex-col items-center justify-center w-full py-8 px-4 border-2 border-dashed border-white/10 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-300 mb-1">Click to upload profile picture</p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                  </label>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                placeholder="email@example.com"
                type="email"
                onChange={handleChange}
                value={form.email}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-white/10"
                required
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address
              </label>
              <input
                name="address"
                placeholder="City, Country"
                onChange={handleChange}
                value={form.address}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-white/10"
              />
            </div>

            {/* LinkedIn */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                LinkedIn Profile
              </label>
              <input
                name="linkedIn"
                placeholder="https://linkedin.com/in/username"
                onChange={handleChange}
                value={form.social.linkedIn}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-white/10"
              />
            </div>

            {/* Twitter */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Twitter Profile
              </label>
              <input
                name="twitter"
                placeholder="https://twitter.com/username"
                onChange={handleChange}
                value={form.social.twitter}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-white/10"
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