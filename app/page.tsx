import Image from "next/image";

const doctorStories = [
  {
    name: "Dr. Lindi Chow",
    quote:
      "Finding a supportive network changed my practice. HealthFront made it easy to connect with trusted colleagues.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Michael Green",
    quote:
      "I shared my story and found real help. The platform is simple, friendly, and truly understands doctors.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Sofia Martinez",
    quote:
      "Collaboration is easier than ever. I feel heard and valued as a professional.",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans flex flex-col relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-4">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#06b6d4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          className="hero-section relative flex items-center justify-center overflow-hidden"
          style={{ padding: "3.5rem 1rem" }}>
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* Text Side */}
            <div className="flex-1 relative animate-fade-in px-4 md:px-0">
              {/* orange circle behind text */}
              <div className="absolute -left-6 -top-6 w-36 h-36 rounded-full bg-orange-400/20 -z-10 hidden md:block" />

              {/* small logo icon from header */}
              <div className="mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
              </div>

              <h1
                className="h1 mb-2 md:mb-4 text-left leading-tight"
                style={{
                  background: "none",
                  WebkitTextFillColor: "var(--color-cyan-500)",
                  color: "var(--color-cyan-500)",
                  textShadow: "none",
                }}>
                HealthFront
              </h1>
              <h2 className="hero-title text-xl md:text-2xl font-semibold text-gray-700 mb-2 md:mb-4">
                Helping doctors find the support they deserve
              </h2>
              <p className="hero-subtitle text-sm md:text-base text-gray-600 mb-4 max-w-md">
                Connecting medical professionals with trusted help, real
                stories, and a friendly face for healthcare collaboration.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="/join"
                  className="btn-primary text-base px-6 py-3 font-semibold">
                  Join the Waitlist
                </a>
              </div>
            </div>

            {/* Image Side */}
            <div className="flex-1 flex justify-center items-center animate-fade-in px-4 md:px-0">
              <div className="relative w-full max-w-sm">
                <Image
                  src="/images/hero.jpg"
                  alt="Doctor holding patient's hand"
                  width={420}
                  height={630}
                  className="rounded-3xl shadow-2xl object-cover doctor-photo"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        {/* Doctor Stories Section */}
        <section id="stories" className="section-stories">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="h2-stories">Doctor Stories</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Real experiences from healthcare professionals who believe in
                collaboration
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {doctorStories.map((doc, index) => (
                <div key={doc.name} className="card-story">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-28 h-28 rounded-full mb-6 shadow-xl doctor-photo"
                    loading="lazy"
                  />
                  <blockquote className="text-body italic mb-6 text-lg leading-relaxed">
                    &quot;{doc.quote}&quot;
                  </blockquote>
                  <div className="icon-primary font-bold text-base">
                    {doc.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* About / Mission Section */}
        <section id="about" className="section-mission">
          <div className="max-w-4xl lg:max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-subtitle">
                Why we exist — creating supportive connections and better
                collaboration across healthcare.
              </p>
            </div>
            <div className="card-mission">
              <Image
                src="/images/pexels-pixabay-40568.jpg"
                alt="Stethoscope on medical chart"
                className="w-full h-64 object-cover rounded-t-2xl"
                width={800}
                height={400}
              />
              <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="panel-box">
                  <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="material-icons text-white text-2xl">
                      people
                    </span>
                  </div>
                  <span className="font-semibold text-lg text-gray-900">
                    Collaboration
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Simplifying healthcare teamwork with a safe, modern
                    platform.
                  </p>
                </div>
                <div className="panel-box">
                  <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="material-icons text-white text-2xl">
                      favorite
                    </span>
                  </div>
                  <span className="font-semibold text-lg text-gray-900">
                    Empathy
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Building trust and empathy through authentic doctor
                    experiences.
                  </p>
                </div>
                <div className="panel-box">
                  <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="material-icons text-white text-2xl">
                      lightbulb
                    </span>
                  </div>
                  <span className="font-semibold text-lg text-gray-900">
                    Innovation
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Making healthcare collaboration simpler, kinder, and more
                    effective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>{" "}
        {/* Our Goals Section */}
        {/* Call to Action Section */}
        <section className="section-cta py-12">
          <div className="max-w-3xl mx-auto text-center px-4 cta-panel">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900">
              Ready to Join HealthFront?
            </h2>
            <p className="text-gray-700 mb-6">
              Sign up for early access and be part of a supportive network of
              doctors.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="/join" className="btn-primary px-6 py-3 text-lg">
                Join Waitlist
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
