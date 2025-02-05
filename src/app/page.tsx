import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/CsLogo.png"
          alt="CS Logo"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <Image
            src="/CsLogo.png"
            alt="CS Logo"
            width={200}
            height={200}
            className="mx-auto"
            priority
          />
          <h1 className="mt-8 text-4xl font-bold text-red-600">
            Athlete Tracker
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Track and manage your athletes' progress
          </p>
        </div>

        <Link 
          href="/dashboard"
          className="inline-block px-8 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
