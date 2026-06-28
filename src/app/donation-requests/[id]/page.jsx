import { protectedFetch, serverFetch } from "@/lib/core/server";
import { redirect } from "next/navigation";
import DonationRequestDetailsClient from "./DonationRequestDetailsClient";
import { getUserSession } from "@/lib/core/session";

export async function generateMetadata({ params }) {
  // ✅ Wait for params to be fully resolved
  const { id } = await params;

  try {
    const data = await serverFetch(`/api/donation-requests/${id}`);
    return {
      title: `Blood Request: ${data.recipientName}`,
      description: `View details for blood donation request for ${data.recipientName}.`,
    };
  } catch {
    return {
      title: "Donation Request Details",
    };
  }
}

export default async function DonationRequestDetailsPage({ params }) {
  // ✅ CORRECT: Destructure params inside the function
  const { id } = await params;

  // 1. Get logged-in user
  const user = await getUserSession();

  // 2. If not logged in, redirect to login page
  if (!user) {
    redirect("/auth/signin");
  }

  // 3. Fetch the request data
  let requestData = null;
  try {
    requestData = await protectedFetch(`/api/donation-requests/${id}`);
  } catch (error) {
    // If request not found, redirect to home or list
    console.error("Failed to fetch request:", error);
    redirect("/donation-requests");
  }

  // 4. Prevent the requester from donating to their own request
  const isMyOwnRequest = requestData.requesterId === user.id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Donation <span className="text-red-600">Request Details</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Review the details below and donate if you are able to help.
        </p>
      </div>

      <DonationRequestDetailsClient
        request={requestData}
        currentUser={user}
        isMyOwnRequest={isMyOwnRequest}
      />
    </div>
  );
}
