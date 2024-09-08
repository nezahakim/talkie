import React, { useState, useEffect } from "react";
import {
  FaMicrophone,
  FaHeadphones,
  FaCog,
  FaEnvelope,
  FaCalendarAlt,
  FaStar,
  FaUserCircle,
  FaChartLine,
  FaPlay,
  FaPause,
  FaWaveSquare,
  FaUsers,
  FaHashtag,
  FaBell,
  FaEllipsisH,
  FaGlobe,
  FaLock,
} from "react-icons/fa";

const AudioWaveform = () => (
  <div className="flex items-center space-x-1 h-8">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="w-1 bg-purple-400 rounded-full animate-pulse"
        style={{
          height: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.1}s`,
        }}
      ></div>
    ))}
  </div>
);

export default function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Fetch user data from your API
    setUser({
      username: "johndoe",
      displayName: "John Doe",
      bio: "Voice enthusiast | Tech lover | Always curious | Podcaster",
      profilePicture: "https://via.placeholder.com/150",
      coverPicture: "https://via.placeholder.com/1200x400",
      joinDate: "January 2021",
      totalTalks: 42,
      listeningHours: 128,
      followers: 1500,
      following: 350,
      topicsOfExpertise: ["Technology", "Science", "Music", "Podcasting"],
      upcomingTalks: [
        {
          id: 1,
          title: "The Future of AI",
          date: "2023-06-15",
          attendees: 120,
        },
        {
          id: 2,
          title: "Blockchain Basics",
          date: "2023-06-22",
          attendees: 85,
        },
      ],
      achievements: [
        { id: 1, title: "Top Speaker", icon: "🏆" },
        { id: 2, title: "Knowledge Sharer", icon: "📚" },
        { id: 3, title: "Community Builder", icon: "🌟" },
      ],
      recentEpisodes: [
        { id: 1, title: "The Impact of 5G", duration: "45:30", likes: 230 },
        {
          id: 2,
          title: "Exploring Quantum Computing",
          duration: "38:15",
          likes: 185,
        },
      ],
      communities: [
        { id: 1, name: "Tech Enthusiasts", members: 5000, isPrivate: false },
        { id: 2, name: "Science Geeks", members: 3500, isPrivate: true },
      ],
    });
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              icon={<FaMicrophone className="h-6 w-6 text-purple-500" />}
              title="Total Talks"
              value={user.totalTalks}
            />
            <StatCard
              icon={<FaHeadphones className="h-6 w-6 text-green-500" />}
              title="Listening Hours"
              value={user.listeningHours}
            />
            <StatCard
              icon={<FaUsers className="h-6 w-6 text-blue-500" />}
              title="Followers"
              value={user.followers}
            />
            <ExpertiseCard topics={user.topicsOfExpertise} />
            <AchievementsCard achievements={user.achievements} />
            <RecentEpisodesCard
              episodes={user.recentEpisodes}
              setIsPlaying={setIsPlaying}
            />
          </div>
        );
      case "upcoming":
        return (
          <div className="bg-white rounded-lg">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Upcoming Talks
              </h3>
              {user.upcomingTalks.map((talk) => (
                <div
                  key={talk.id}
                  className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
                >
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {talk.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      <FaCalendarAlt className="inline-block mr-2" />
                      {talk.date}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <FaUsers className="inline-block mr-2" />
                      {talk.attendees} attendees
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors duration-300">
                    Join Talk
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "communities":
        return (
          <div className="bg-white rounded-lg">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                My Communities
              </h3>
              {user.communities.map((community) => (
                <div
                  key={community.id}
                  className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                      {community.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {community.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        <FaUsers className="inline-block mr-2" />
                        {community.members} members
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {community.isPrivate ? (
                      <FaLock className="text-gray-400 mr-2" />
                    ) : (
                      <FaGlobe className="text-gray-400 mr-2" />
                    )}
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Cover Photo */}
        <div
          className="relative h-44 sm:h-60 bg-cover bg-center"
          style={{ backgroundImage: `url(${user.coverPicture})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Profile Info */}
        <div className="relative bg-white px-4 py-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
            <img
              src={user.profilePicture}
              alt={user.displayName}
              className="h-24 w-24 rounded-full border-4 border-white absolute -top-12 left-4"
            />
            <div className="mt-12 pt-1 sm:pt-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {user.displayName}
              </h1>
              <p className="text-sm text-gray-500 mb-2">@{user.username}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <ActionButton icon={<FaUserCircle />} text="Follow" primary />
            <ActionButton icon={<FaEnvelope />} text="Message" />
            <ActionButton icon={<FaBell />} text="Notify" />
          </div>
          <div className="mt-4 flex space-x-6 text-sm text-gray-500">
            <span>
              <strong className="text-gray-900">{user.followers}</strong>{" "}
              Followers
            </span>
            <span>
              <strong className="text-gray-900">{user.following}</strong>{" "}
              Following
            </span>
            <span>
              <FaCalendarAlt className="inline mr-1" />
              Joined {user.joinDate}
            </span>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white px-4 py-5 sm:px-6 border-t border-gray-200">
          <p className="text-gray-700">{user.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.topicsOfExpertise.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                #{topic}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-t border-gray-200">
          <nav className="flex">
            {["overview", "upcoming", "communities"].map((tab) => (
              <button
                key={tab}
                className={`${
                  activeTab === tab
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white px-4 py-5 sm:px-6">{renderTabContent()}</div>
      </div>

      {/* Floating Audio Player */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center focus:outline-none hover:bg-purple-700 transition-colors duration-300"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">
                  Currently Playing
                </h4>
                <p className="text-xs text-gray-500">
                  John Doe - The Future of AI
                </p>
              </div>
            </div>
            <AudioWaveform />
            <div className="text-sm text-gray-500">24:30 / 45:00</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-4 rounded-lg">
    <div className="flex items-center">
      <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">{icon}</div>
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">
            {title}
          </dt>
          <dd className="text-3xl font-semibold text-gray-900">{value}</dd>
        </dl>
      </div>
    </div>
  </div>
);

const AchievementsCard = ({ achievements }) => (
  <div className="bg-white p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
    <div className="space-y-3">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className="flex items-center bg-gray-50 rounded-lg p-3"
        >
          <span className="text-2xl mr-3">{achievement.icon}</span>
          <span className="text-sm font-medium text-gray-700">
            {achievement.title}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ExpertiseCard = ({ topics }) => (
  <div className="bg-white p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Topics of Expertise
    </h3>
    <div className="flex flex-wrap gap-2">
      {topics.map((topic, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
        >
          {topic}
        </span>
      ))}
    </div>
  </div>
);
const RecentEpisodesCard = ({ episodes, setIsPlaying }) => (
  <div className="bg-white p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Recent Episodes
    </h3>
    <div className="space-y-4">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
        >
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              {episode.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Duration: {episode.duration}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="text-purple-600 hover:text-purple-700 transition-colors duration-300"
              onClick={() => setIsPlaying(true)}
            >
              <FaPlay />
            </button>
            <div className="flex items-center text-gray-500">
              <FaStar className="mr-1" />
              <span>{episode.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
const ActionButton = ({ icon, text, primary = false }) => (
  <button
    className={`inline-flex justify-center items-center px-4 py-2 ${
      primary
        ? "bg-purple-600 text-white hover:bg-purple-700"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    } text-sm font-medium rounded-full transition-colors duration-300`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </button>
);

// import React, { useState, useEffect } from "react";
// import {
//   FaMicrophone,
//   FaHeadphones,
//   FaCog,
//   FaEnvelope,
//   FaCalendarAlt,
//   FaStar,
//   FaUserCircle,
//   FaChartLine,
//   FaPlay,
//   FaPause,
//   FaWaveSquare,
//   FaUsers,
//   FaHashtag,
//   FaBell,
//   FaEllipsisH,
//   FaGlobe,
//   FaLock,
// } from "react-icons/fa";
// import Api from "../services/Api"; // Assuming you have an Api file with the necessary methods

// const AudioWaveform = () => (
//   <div className="flex items-center space-x-1 h-8">
//     {[...Array(20)].map((_, i) => (
//       <div
//         key={i}
//         className="w-1 bg-purple-400 rounded-full animate-pulse"
//         style={{
//           height: `${Math.random() * 100}%`,
//           animationDelay: `${i * 0.1}s`,
//         }}
//       ></div>
//     ))}
//   </div>
// );

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const UserId = localStorage.getItem("user_id");
//         const userData = await Api.getUserProfile(UserId); // Assuming this method exists in your Api file
//         setUser(userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         // Handle error (e.g., show error message to user)
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
//       </div>
//     );
//   }

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <StatCard
//               icon={<FaMicrophone className="h-6 w-6 text-purple-500" />}
//               title="Total Talks"
//               value={user.totalTalks}
//             />
//             <StatCard
//               icon={<FaHeadphones className="h-6 w-6 text-green-500" />}
//               title="Listening Hours"
//               value={user.listeningHours}
//             />
//             <StatCard
//               icon={<FaUsers className="h-6 w-6 text-blue-500" />}
//               title="Followers"
//               value={user.followers}
//             />
//             <ExpertiseCard topics={user.topicsOfExpertise} />
//             <AchievementsCard achievements={user.achievements} />
//             <RecentEpisodesCard
//               episodes={user.recentEpisodes}
//               setIsPlaying={setIsPlaying}
//             />
//           </div>
//         );
//       case "upcoming":
//         return (
//           <div className="bg-white rounded-lg">
//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                 Upcoming Talks
//               </h3>
//               {user.upcomingTalks.map((talk) => (
//                 <div
//                   key={talk.id}
//                   className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
//                 >
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-900">
//                       {talk.title}
//                     </h4>
//                     <p className="text-sm text-gray-500 mt-1">
//                       <FaCalendarAlt className="inline-block mr-2" />
//                       {talk.date}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       <FaUsers className="inline-block mr-2" />
//                       {talk.attendees} attendees
//                     </p>
//                   </div>
//                   <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors duration-300">
//                     Join Talk
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       case "communities":
//         return (
//           <div className="bg-white rounded-lg">
//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                 My Communities
//               </h3>
//               {user.communities.map((community) => (
//                 <div
//                   key={community.id}
//                   className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
//                 >
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
//                       {community.name.charAt(0)}
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="text-lg font-medium text-gray-900">
//                         {community.name}
//                       </h4>
//                       <p className="text-sm text-gray-500 mt-1">
//                         <FaUsers className="inline-block mr-2" />
//                         {community.members} members
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     {community.isPrivate ? (
//                       <FaLock className="text-gray-400 mr-2" />
//                     ) : (
//                       <FaGlobe className="text-gray-400 mr-2" />
//                     )}
//                     <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300">
//                       View
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-3xl mx-auto">
//         {/* Cover Photo */}
//         <div
//           className="relative h-44 sm:h-60 bg-cover bg-center"
//           style={{ backgroundImage: `url(${user.coverPicture})` }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         </div>

//         {/* Profile Info */}
//         <div className="relative bg-white px-4 py-5 sm:px-6">
//           <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
//             <img
//               src={user.profilePicture}
//               alt={user.displayName}
//               className="h-24 w-24 rounded-full border-4 border-white absolute -top-12 left-4"
//             />
//             <div className="mt-12 pt-1 sm:pt-1">
//               <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//                 {user.displayName}
//               </h1>
//               <p className="text-sm text-gray-500 mb-2">@{user.username}</p>
//             </div>
//           </div>
//           <div className="mt-4 flex flex-wrap gap-4">
//             <ActionButton icon={<FaUserCircle />} text="Follow" primary />
//             <ActionButton icon={<FaEnvelope />} text="Message" />
//             <ActionButton icon={<FaBell />} text="Notify" />
//           </div>
//           <div className="mt-4 flex space-x-6 text-sm text-gray-500">
//             <span>
//               <strong className="text-gray-900">{user.followers}</strong>{" "}
//               Followers
//             </span>
//             <span>
//               <strong className="text-gray-900">{user.following}</strong>{" "}
//               Following
//             </span>
//             <span>
//               <FaCalendarAlt className="inline mr-1" />
//               Joined {user.joinDate}
//             </span>
//           </div>
//         </div>

//         {/* Bio */}
//         <div className="bg-white px-4 py-5 sm:px-6 border-t border-gray-200">
//           <p className="text-gray-700">{user.bio}</p>
//           <div className="mt-4 flex flex-wrap gap-2">
//             {/* {user.topicsOfExpertise.map((topic, index) => ( */}
//             <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
//               #{user.language}
//             </span>
//             {/* ))} */}
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white border-t border-gray-200">
//           <nav className="flex">
//             {["overview", "upcoming", "communities"].map((tab) => (
//               <button
//                 key={tab}
//                 className={`${
//                   activeTab === tab
//                     ? "border-purple-500 text-purple-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Tab Content */}
//         <div className="bg-white px-4 py-5 sm:px-6">{renderTabContent()}</div>
//       </div>

//       {/* Floating Audio Player */}
//       {/* Commented out as per the original code */}
//       {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
//         <div className="max-w-3xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <button
//                 className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center focus:outline-none hover:bg-purple-700 transition-colors duration-300"
//                 onClick={() => setIsPlaying(!isPlaying)}
//               >
//                 {isPlaying ? <FaPause /> : <FaPlay />}
//               </button>
//               <div className="ml-4">
//                 <h4 className="text-sm font-medium text-gray-900">
//                   Currently Playing
//                 </h4>
//                 <p className="text-xs text-gray-500">
//                   John Doe - The Future of AI
//                 </p>
//               </div>
//             </div>
//             <AudioWaveform />
//             <div className="text-sm text-gray-500">24:30 / 45:00</div>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }

// const StatCard = ({ icon, title, value }) => (
//   <div className="bg-white p-4 rounded-lg">
//     <div className="flex items-center">
//       <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">{icon}</div>
//       <div className="ml-5 w-0 flex-1">
//         <dl>
//           <dt className="text-sm font-medium text-gray-500 truncate">
//             {title}
//           </dt>
//           <dd className="text-3xl font-semibold text-gray-900">{value}</dd>
//         </dl>
//       </div>
//     </div>
//   </div>
// );

// const AchievementsCard = ({ achievements }) => (
//   <div className="bg-white p-4 rounded-lg">
//     <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
//     <div className="space-y-3">
//       {/* {achievements.map((achievement) => (
//         <div
//           key={achievement.id}
//           className="flex items-center bg-gray-50 rounded-lg p-3"
//         >
//           <span className="text-2xl mr-3">{achievement.icon}</span>
//           <span className="text-sm font-medium text-gray-700">
//             {achievement.title}
//           </span>
//         </div>
//       ))} */}
//     </div>
//   </div>
// );

// const ExpertiseCard = ({ topics }) => (
//   <div className="bg-white p-4 rounded-lg">
//     <h3 className="text-lg font-semibold text-gray-900 mb-4">
//       Topics of Expertise
//     </h3>
//     <div className="flex flex-wrap gap-2">
//       {/* {topics.map((topic, index) => (
//         <span
//           key={index}
//           className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
//         >
//           {topic}
//         </span>
//       ))} */}
//     </div>
//   </div>
// );

// const RecentEpisodesCard = ({ episodes, setIsPlaying }) => (
//   <div className="bg-white p-4 rounded-lg">
//     <h3 className="text-lg font-semibold text-gray-900 mb-4">
//       Recent Episodes
//     </h3>
//     {/*
//     <div className="space-y-4">
//       {episodes.map((episode) => (
//         <div
//           key={episode.id}
//           className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
//         >
//           <div>
//             <h4 className="text-sm font-medium text-gray-900">
//               {episode.title}
//             </h4>
//             <p className="text-xs text-gray-500 mt-1">
//               Duration: {episode.duration}
//             </p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button
//               className="text-purple-600 hover:text-purple-700 transition-colors duration-300"
//               onClick={() => setIsPlaying(true)}
//             >
//               <FaPlay />
//             </button>
//             <div className="flex items-center text-gray-500">
//               <FaStar className="mr-1" />
//               <span>{episode.likes}</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div> */}
//   </div>
// );

// const ActionButton = ({ icon, text, primary = false }) => (
//   <button
//     className={`inline-flex justify-center items-center px-4 py-2 ${
//       primary
//         ? "bg-purple-600 text-white hover:bg-purple-700"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     } text-sm font-medium rounded-full transition-colors duration-300`}
//   >
//     {icon && <span className="mr-2">{icon}</span>}
//     {text}
//   </button>
// );
