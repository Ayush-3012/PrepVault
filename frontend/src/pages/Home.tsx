import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { userId } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen text-gray-800 px-4 py-10 md:py-16">
      <div className="bg-fuchsia-200 rounded-xl shadow-[0_0_10px] shadow-black p-6 md:p-12 space-y-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Prepare Smarter, Faster, Better.
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Welcome to{" "}
              <span className="font-semibold text-indigo-600">PrepVault</span> —
              your go-to platform for organized preparation, mock tests, notes,
              and performance tracking.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link to={userId ? "/create" : "/register"}>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-transform hover:scale-105 cursor-pointer font-semibold">
                  {userId ? "Create" : "Get Started"}
                </button>
              </Link>
              <Link to={userId ? "/posts" : "/login"}>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-xl shadow hover:bg-gray-800 transition-transform hover:scale-105 cursor-pointer font-semibold">
                  {userId ? "Get Posts" : "Login"}
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 max-w-sm mx-auto">
            <img
              src="https://cdn.prod.website-files.com/5dade5f251201f441cf71fcd/5e7532eb34e76c0a23ae9e72_Book%20Girl%20Zoomreverse.png"
              alt="PrepVault Illustration"
              className="rounded-xl w-full h-auto object-contain shadow-[0_0_10px] shadow-black hover:shadow-rose-500 hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Practice Sets",
              desc: "Practice with real-time mock exams to boost your confidence.",
              icon: "📝",
            },
            {
              title: "Notes Vault",
              desc: "Access & organize your notes for quick revisions.",
              icon: "📚",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-slate-100 rounded-xl p-6 shadow-[0_0_10px] shadow-black hover:shadow-rose-500 hover:scale-105 transition-transform duration-150"
            >
              <div className="text-5xl">{feature.icon}</div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
