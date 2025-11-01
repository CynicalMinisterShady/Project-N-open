"use client";
import { useEffect, useState } from 'react';
import api from '../../../utils/axios';
import "../../../styles/responsive.css";
import axios from 'axios';
import { useRouter } from "next/navigation";
import {
  Linkedin,
  Twitter,
  ArrowBigLeft,
  User,
  X,
  Pencil,
  SquareUser,
  ShieldUser,
  Mail,
  BookOpen,
  MapPin,
  Trash2,
  MoveUpRight,
} from "lucide-react";


const TeamCard = ({ data, onClick }) => {
  const categoryColors = {
    Leadership: "#1b547e46",
    Intern: "#6b1f8546",
    Employee: "#1f852e46",
  };


  return (
    <div className="col-lg-4 col-12 p-2 mb-4 cursor-pointer" onClick={onClick}>
      <div className="flex flex-col gap-1">
        <div className="card-image relative h-[20rem] overflow-hidden">
          <img
            src={data.avatar}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>


          <div className="absolute inset-0 flex justify-between items-end px-3 py-2 text-white z-10">
            {/* Left Part */}
            <div>
              <div className="text-[0.7rem] text-[#d0d0d061] flex gap-2">
                <span
                  className="px-3 rounded-[2rem]"
                  style={{ backgroundColor: categoryColors[data.category] }}
                >
                  {data.category}
                </span>


                <span className="px-3 bg-[#c5873c46] rounded-[2rem]">
                  {data.department}
                </span>
              </div>
              <h1 className="text-[0.9rem] py-1 text-[#ffffffa9]">
                {data.role}
              </h1>
            </div>


            {/* Right Part */}
            <div
              style={{
                backgroundColor: data.status === 1 ? "#39c465" : "#c13c3c",
              }}
              className="h-3 min-w-3 rounded-[50%] mb-3"
            ></div>
          </div>
        </div>


        <div className="card-title flex justify-between items-end text-[#ffffffa9]">
          <div>
            <h1 className="text-[1rem] font-[500]">{data.displayName}</h1>
            <h3 className="text-[0.8rem] max-w-[90%] text-[#909090]">
              {data.education}
            </h3>
          </div>
          <div className="flex gap-2">
            <Linkedin size={18} strokeWidth={1.25} />
            <Twitter size={18} strokeWidth={1.25} />
          </div>
        </div>
      </div>
    </div>
  );
};


const CompanyReview = ({ data }) => {
  const router = useRouter();
  return (
    <div 
    className="cursor-pointer company-review col-lg-6 col-12 p-2 px-10 mb-[5rem]"
    onClick={() => router.push(`/admin/update-companyReview/${data._id}`)}
    >
      <div className="flex justify-between">
        <img
          src={data.avatar}
          alt="nirveonx-teamMember"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div
          className="h-3 w-3 rounded-full mb-3"
          style={{
            backgroundColor: data.status === 1 ? "#39c465" : "#c13c3c",
          }}
        ></div>
      </div>
      <h1 className="mt-4 text-[1.2rem]">
        <span>{data.displayName}, </span>
        <span>{data.role}</span>
      </h1>
      <p className="mb-4 text-[#ffffffa9] text-[0.9rem] leading-[1.4]">
        {data.review}
      </p>
      <div className="flex gap-2">
        <Linkedin size={20} strokeWidth={1.25} />
        <Twitter size={20} strokeWidth={1.25} />
      </div>
    </div>
  );
};


const TeamModel = ({ isOpen, onClose, member, onDelete }) => {
  const router = useRouter();
  if (!isOpen || !member) return null;


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#000000af] z-[100] flex justify-center items-center">
      <div className="bg-[#141414] max-w-[90%] h-[75vh] lg:h-[80vh] w-[85%] md:w-[50%] lg:w-[30%] rounded-4xl flex flex-col">
        <div className="flex">
          {/* top */}
          <div className="flex p-6 w-full justify-between border-b-2 border-b-[#ffffff54]">
            {/* left */}
            <div className="flex gap-3 items-center">
              <h1 className="text-[1.3rem] font-[500]">{member.displayName || "Null"}</h1>
              <div
                className="w-3 h-3 rounded-[50%]"
                style={{
                  backgroundColor: member.status === 1 ? "#39c465" : "#c13c3c",
                }}
              ></div>
            </div>
            {/* right */}
            <div className="flex gap-6">
                <div className="cursor-pointer">
                <Pencil 
                onClick={() => router.push(`/admin/update-team/${member._id}`)}
                />
              </div>

              <div className="cursor-pointer" onClick={onClose}>
                <X />
              </div>
            </div>
          </div>
        </div>


        {/* middle section */}
        <div className="h-[75%] max-h-[75%] overflow-y-scroll">
          {/* Name */}
          <div className="px-6 overflow-hidden py-6 flex gap-3 items-start justify-start">
            <div className="icon-model mt-1">
              <SquareUser />
            </div>
            <div>
              <h1 className="text-[1.2rem]">{member.displayName || "Null"}</h1>
              <h2 className="text-[1rem] flex flex-col sm:flex-row text-[#ababab]">
                <div>{member.memberId ? member.memberId.slice(0, -7) : "Null"}</div>
                <span className="text-white">{member.memberId ? member.memberId.slice(-7) : ""}</span>
              </h2>
            </div>
          </div>


          {/* Role */}
          <div className="px-6 pb-5 flex gap-3 items-start justify-start">
            <div className="icon-model mt-1">
              <ShieldUser />
            </div>
            <div>
              <h1 className="text-[1.2rem]">Role</h1>
              <h2 className="text-[1rem] text-[#ababab]">
                {member.category && member.role ? `${member.category}, ${member.role}` : "Null"}
              </h2>
            </div>
          </div>


          {/* Email */}
          <div className="px-6 pb-5 flex gap-3 items-start justify-start">
            <div className="icon-model mt-1">
              <Mail />
            </div>
            <div>
              <h1 className="text-[1.2rem]">Email</h1>
              {member.email ? (
                <a href={`mailto:${member.email}`} className="text-[1rem] text-[#2b84c0] hover:underline">
                  {member.email}
                </a>
              ) : (
                <h2 className="text-[1rem] text-[#ababab]">Null</h2>
              )}
            </div>
          </div>


          {/* Education */}
          <div className="px-6 pb-5 flex gap-3 items-start justify-start">
            <div className="icon-model mt-1">
              <BookOpen />
            </div>
            <div>
              <h1 className="text-[1.2rem]">Education</h1>
              <h2 className="text-[1rem] text-[#ababab]">
                {member.education || "Null"}
              </h2>
            </div>
          </div>


          {/* LinkedIn */}
          <div className="px-6 pb-5 flex gap-3 items-start justify-start">
            <div className="icon-model mt-1">
              <Linkedin />
            </div>
            <div>
              <h1 className="text-[1.2rem]">LinkedIn</h1>
              {member.social?.linkedIn ? (
                <a
                  href={member.social.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[1rem] text-[#2b84c0] hover:underline break-all"
                >
                  {member.social.linkedIn}
                </a>
              ) : (
                <h2 className="text-[1rem] text-[#ababab]">Null</h2>
              )}
            </div>
          </div>


          {/* Twitter */}
          <div className="px-6 pb-5 flex gap-3 items-start justify-start">
            <div className="icon-model mt-1">
              <Twitter />
            </div>
            <div>
              <h1 className="text-[1.2rem]">Twitter</h1>
              {member.social?.twitter ? (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[1rem] text-[#2b84c0] hover:underline break-all"
                >
                  {member.social.twitter}
                </a>
              ) : (
                <h2 className="text-[1rem] text-[#ababab]">Null</h2>
              )}
            </div>
          </div>


          {/* Address */}
          <div className="px-6 pb-5 flex gap-3 items-start justify-start">
            <div className="icon-model mt-1">
              <MapPin />
            </div>
            <div>
              <h1 className="text-[1.2rem]">Address</h1>
              <h2 className="text-[1rem] text-[#ababab]">
                {member.address || "Null"}
              </h2>
            </div>
          </div>
        </div>


        <div className="px-6 flex gap-3 pt-3 justify-end text-[#b03232]">
          <Trash2 
          className="cursor-pointer"
          onClick={() => onDelete(member._id)} />
        </div>
      </div>
    </div>
  );
};


const Page = ({user}) => {
  const [team, setTeam] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All Team");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      const teamRes = await api.get('/team');
      const reviewRes = await api.get('/companyReview');
      setTeam(teamRes.data);
      setReviews(reviewRes.data);
    };
    fetchData();
  }, []);

  const filteredTeamMembers =
    activeCategory === "All Team"
      ? team
      : team.filter((member) => member.category === activeCategory);


  const handleCardClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'unset';
  };

  /*  Handle delete (reused from AdminTeam) */
  const handleDeleteTeam = async (memberId) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const headers = {
        "x-admin-id": user._id,
        "x-admin-email": user.username,
      };
      const base = process.env.NEXT_PUBLIC_API_URL;
      console.log(`${base}`);
      console.log(`${base}/admin/team/${memberId}`);

      await axios.delete(`${base}/admin/team/${memberId}`, { headers });
      
      const fetchData = async () => {
      const teamRes = await api.get('/team');
      const reviewRes = await api.get('/companyReview');
      setTeam(teamRes.data);
      setReviews(reviewRes.data);
    };
    fetchData();
      setIsModalOpen(false);
      alert("Team member deleted successfully.");
    } catch (err) {
      console.error("Error deleting team member:", err);
      alert("Failed to delete team member.");
    }
  };



  return (
    <div className="p-[2rem] text-white">
      {/* Top bar */}
      <div>
        <h1>Welcome, {user.firstName}</h1>


        <div className="row w-full justify-between">
          <div className="flex flex-col text-3xl mb-3">
            <span>Team Management & Control</span>
            <span>Dashboard</span>
          </div>


          <div className="flex gap-4 text-black">
            <div className="p-3 bg-white h-10 w-10 rounded-full flex justify-center items-center">
              <ArrowBigLeft size={20} strokeWidth={3} />
            </div>
            <div className="p-3 bg-white h-10 w-10 rounded-full flex justify-center items-center">
              <User size={20} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>


      {/* Main Section */}
      <div className="w-full row mt-9 h-[70vh]">
        {/* Left scrollable section */}
        <div className="col-lg-6 col-md-12">
          <div className="sticky top-0 bg-transparent">
            <ul className="w-fit flex flex-wrap gap-2 sm:gap-4 p-1 px-2 sm:px-5 text-[0.8rem] rounded-2xl bg-[#ffffff0a] backdrop-blur-2xl">
              {["All Team", "Leadership", "Employee", "Intern"].map(
                (category) => (
                  <li
                    key={category}
                    className={`cursor-pointer px-3 py-1 rounded-2xl transition-colors duration-200
        ${
          activeCategory === category
            ? "text-gray-300 bg-[#ffffff1a]"
            : "text-[#ffffff6c]"
        } hover:text-gray-300 hover:bg-[#ffffff1a]`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </li>
                )
              )}
            </ul>
          </div>


          {/* Scrollable cards */}
          <div className="mt-4 h-[70vh] overflow-y-scroll scrollbar-hide">
            <div className="row">
              {filteredTeamMembers.map((data, index) => (
                <TeamCard
                  data={data}
                  key={index}
                  onClick={() => handleCardClick(data)}
                />
              ))}
            </div>
          </div>
        </div>


        {/* Right section */}
        <div className="col-lg-6 col-md-12 h-[75vh] flex flex-col relative">
          {/* Scrollable reviews */}
          <div className="flex-1 overflow-y-scroll scrollbar-hide pr-2">
            <div className="review-wrapper row mt-10 pb-20">
              {reviews.map((data, index) => {
                return <CompanyReview data={data} key={index} />;
              })}
            </div>
          </div>


          {/* Fixed Certificate Button */}
          <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent">
            <div className="bg-white text-black p-2 w-fit flex rounded-3xl items-center">
              <div className="w-6 h-6 rounded-full bg-black text-white text-center flex justify-center items-center">
                <div>
                  <MoveUpRight size={11} strokeWidth={2.5} />
                </div>
              </div>
              <div className="px-2">Certificate</div>
            </div>
          </div>
        </div>
      </div>


      {/* Model */}
      <TeamModel
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
        onDelete={handleDeleteTeam}
      />
    </div>
  );
};


export default Page;

