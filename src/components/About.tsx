import { Link } from "react-router-dom";

const About = () => {
  // Static admin list (you can later replace this with data from backend)
  const admins = [
    {
      name: "	Dr. Nabajyoti Medhi",
      email: "nmedhi@tezu.ernet.in",
      photo: "/admins/nabo.jpg",
      role: "Head, Alumni Relations",
    },
    {
      name: "	Dr. Nityananda Sarma",
      email: "nitya@tezu.ernet.in",
      photo: "/admins/ns.jpg",
      role: "System Administrator",
    },
    {
      name: "Dr. Jyotismita Talukdar",
      email: " jyoti4@tezu.ernet.in",
      photo: "/admins/jyotismita.jpg",
      role: "Event Coordinator",
    },
  ];

  return (
    <div className="px-4 md:px-12 lg:px-20 py-14 transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="inline-block px-6 py-2 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-gray-100 text-2xl font-semibold rounded-full shadow-md">
          WHO ARE WE?
        </h2>
      </div>

      {/* Section 1 */}
      <section className="max-w-5xl mx-auto text-center">
        <div className="text-black rounded-2xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-center mb-4">
            TU ALUMNI CONNECT PORTAL
          </h3>
          <p className="text-base font-medium leading-relaxed">
            Welcome to our Alumni Portal — a dynamic platform designed to foster
            lifelong connections, celebrate achievements, and encourage
            meaningful contributions to the institution that shaped your
            journey. We take pride in building a bridge between the past and the
            present, empowering alumni to stay engaged and inspired. Our mission
            is to create a vibrant and engaged community of alumni who
            contribute to the growth and success of our alma mater. We envision
            a thriving platform where knowledge is shared, mentorship is
            celebrated, and each graduate plays a vital role in shaping the
            university’s legacy.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="my-16 border-t border-gray-300 dark:border-gray-700 w-3/4 mx-auto"></div>

      {/* Section 2 */}
      <section className="max-w-5xl mx-auto text-center">
        <div className="text-black rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-center mb-6">KEY FEATURES</h3>
          <ul className="list-none pl-6 text-base space-y-3 leading-relaxed">
            <li>
              <strong>Alumni Registration:</strong> Obtain a unique Alumni ID by
              registering on our portal.
            </li>
            <li>
              <strong>Achievement Sharing:</strong> Share your milestones and
              inspire the next generation.
            </li>
            <li>
              <strong>Opportunity Exchange:</strong> Post and explore jobs,
              internships, and collaborations.
            </li>
            <li>
              <strong>Mentorship & Support:</strong> Provide guidance and advice
              to current students.
            </li>
            <li>
              <strong>Event Updates:</strong> Stay informed about alumni meets,
              reunions, and college celebrations.
            </li>
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="my-16 border-t border-gray-300 dark:border-gray-700 w-3/4 mx-auto"></div>

      {/* Section 3 */}
      <section className="max-w-5xl mx-auto text-center">
        <div className="text-black rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">WHY JOIN OUR ALUMNI PORTAL?</h3>
          <p className="text-base mb-6">
            Joining our Alumni Portal offers a wealth of opportunities and
            lifelong benefits:
          </p>
          <ul className="list-none text-left pl-6 text-base space-y-3 leading-relaxed mx-auto w-fit">
            <li>
              <strong>Networking:</strong> Connect with fellow alumni and expand
              your professional network.
            </li>
            <li>
              <strong>Mentorship:</strong> Receive or offer valuable guidance to
              others.
            </li>
            <li>
              <strong>Stay Updated:</strong> Get the latest news, events, and
              announcements from your alma mater.
            </li>
            <li>
              <strong>Contribution:</strong> Share your experiences and help
              shape future generations.
            </li>
            <li>
              <strong>Reconnect:</strong> Rediscover friendships and relive
              college memories.
            </li>
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="my-16 border-t border-gray-300 dark:border-gray-700 w-3/4 mx-auto"></div>

      {/* 🧑‍💼 Admin Section */}
      <section className="max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-6">MEET OUR ADMIN TEAM</h3>
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 justify-items-center">
          {admins.map((admin, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-72 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={admin.photo}
                alt={admin.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-navy mb-4"
              />
              <h4 className="text-lg font-semibold text-navy mb-1">
                {admin.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {admin.role}
              </p>
              <a
                href={`mailto:${admin.email}`}
                className="text-navy-light font-medium hover:underline"
              >
                {admin.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="my-16 border-t border-gray-300 dark:border-gray-700 w-3/4 mx-auto"></div>

      {/* Call to Action */}
      <section className="text-center">
        <h3 className="text-2xl font-bold mb-3">
          Ready to embark on this journey?
        </h3>
        <p className="font-medium mb-2">
          Register now and become a proud member of our alumni community.
        </p>
        <p className="text-sm mb-6">Your unique Alumni ID awaits!</p>

        <Link
          to="/service/digital-card"
          className="inline-block bg-gradient-to-r from-navy-dark via-navy to-navy-light text-gray-100 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Register Now
        </Link>

        <p className="text-sm font-medium mt-6 text-gray-700 dark:text-gray-300">
          Are you an admin?
          <Link
            to="/about/login"
            className="text-navy-light font-semibold ml-1 hover:underline "
          >
            Login here
          </Link>
        </p>
      </section>
    </div>
  );
};

export default About;
