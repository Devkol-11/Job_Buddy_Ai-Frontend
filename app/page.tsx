import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center border border-[#d1d5db] rounded-lg p-12 max-w-md">
        <h1 className="text-3xl font-bold text-black mb-4">JobFeed</h1>
        <p className="text-gray-600 mb-8">
          Your job search companion. Find opportunities that match your skills.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center gap-2 border border-[#d1d5db] text-black px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
