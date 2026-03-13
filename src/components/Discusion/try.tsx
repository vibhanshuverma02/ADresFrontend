"use client";

export default function TrendingPostsCarousel() {
  const posts = [
    {
      name: "John Doe",
      username: "@johnnydoe123",
      time: "09:04 PM · 26/11/2022",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque convallis vestibulum enim, eget convallis mauris.",
      hashtag: "#loremipsum",
    },
    {
      name: "Emma Watson",
      username: "@emma_w",
      time: "11:21 AM · 10/12/2022",
      content:
        "Sed faucibus finibus dui, ut viverra mauris porttitor sed. Nulla facilisi. Integer nec massa erat.",
      hashtag: "#trending",
    },
    {
      name: "Mark Wilson",
      username: "@markwilson",
      time: "07:15 PM · 19/01/2023",
      content:
        "Etiam eget ligula ut arcu viverra tempus. Aliquam erat volutpat. Mauris sed justo augue.",
      hashtag: "#updates",
    },
    // Add unlimited posts
  ];

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <h2 className="text-3xl font-bold text-center mb-12">New Trending Posts</h2>

      <div className="relative w-[650px] h-[450px] perspective-1000">
        <div className="carousel3d w-full h-full relative animate-rotate360">
          {posts.map((post, i) => {
            const angle = (360 / posts.length) * i;

            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-[330px] h-[420px] -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(420px)`,
                }}
              >
                {/* --- TWITTER POST CARD TEMPLATE --- */}
                <div className="bg-[#0f1419] border border-gray-700 text-white rounded-2xl p-5 w-full h-full shadow-xl flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                    <div>
                      <p className="font-bold">{post.name}</p>
                      <p className="text-gray-400 text-sm">{post.username}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="mt-3 text-gray-200 text-sm">{post.content}</p>
                  <p className="text-blue-400 text-sm mt-1">{post.hashtag}</p>

                  {/* Gray image area */}
                  <div className="w-full h-[180px] bg-gray-700 rounded-xl mt-4"></div>

                  {/* Footer */}
                  <p className="text-gray-500 text-sm mt-4">{post.time} · Twitter for Phone</p>

                  <div className="flex justify-between text-sm text-gray-400 mt-3">
                    <span>3,854 Retweets</span>
                    <span>1,098 Quotes</span>
                    <span>21.4k Likes</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes rotate360 {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-360deg); }
        }
        .animate-rotate360 {
          animation: rotate360 28s linear infinite;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
