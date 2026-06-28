import { getUserSession } from "@/lib/core/session";
import PublicRequestsClient from "./PublicRequestsClient";

export async function generateMetadata() {
  return {
    title: "Blood Donation Requests | BloodSync",
    description: "Browse pending blood donation requests and help save lives.",
  };
}

export default async function PublicRequestsPage() {
  // Fetch the user on the server (to know if they are logged in)
  const user = await getUserSession();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="mt-5 md:mt-10 text-3xl md:text-4xl font-bold text-gray-900">
          Blood <span className="text-red-600">Donation Requests</span>
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Browse Blood requests and be the hero who saves a life today.
        </p>
      </div>

      <PublicRequestsClient isLoggedIn={!!user} />
    </div>
  );
}
