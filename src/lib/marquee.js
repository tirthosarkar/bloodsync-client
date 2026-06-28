import { formatDistanceToNow } from 'date-fns';

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const FALLBACK_ITEMS = [
  {
    id: 'fallback-1',
    type: 'blood',
    title: 'A+ Blood Needed',
    subtitle: 'Dhaka',
    time: 'just now',
  },
  {
    id: 'fallback-2',
    type: 'fund',
    title: '$50 Donated',
    subtitle: 'Anonymous',
    time: '2 minutes ago',
  },
  {
    id: 'fallback-3',
    type: 'blood',
    title: 'O− Blood Needed',
    subtitle: 'Bogura',
    time: '5 minutes ago',
  },
  {
    id: 'fallback-4',
    type: 'fund',
    title: '$20 Donated',
    subtitle: 'Karim',
    time: '10 minutes ago',
  },
  {
    id: 'fallback-5',
    type: 'blood',
    title: 'B+ Blood Needed',
    subtitle: 'Comilla',
    time: '15 minutes ago',
  },
];

export async function getMarqueeData() {
  try {
    const [requestRes, fundingRes] = await Promise.all([
      fetch(`${API}/api/donation-requests`, { next: { revalidate: 60 } }),
      fetch(`${API}/api/funding`, { next: { revalidate: 60 } }),
    ]);

    if (!requestRes.ok || !fundingRes.ok) throw new Error('Fetch failed');

    const requests = await requestRes.json();
    const funding = await fundingRes.json();

    // FIX 3: safe access with ??
    const requestList = Array.isArray(requests) ? requests.slice(0, 6) : [];
    const fundingList = funding?.data?.slice(0, 4) ?? [];

    const bloodItems = requestList.map(item => ({
      // FIX 1: prefixed id — no key conflict
      id: `blood-${item._id}`,
      type: 'blood',
      title: `${item.bloodGroup} Blood Needed`,
      subtitle: item.recipientDistrictName,
      time: formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }),
    }));

    const fundItems = fundingList.map(item => ({
      // FIX 1: prefixed id
      id: `fund-${item._id}`,
      type: 'fund',
      title: `$${item.amount} Donated`,
      subtitle: item.donorName?.split(' ')[0] || 'Anonymous',
      time: formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }),
    }));

    const merged = [...bloodItems, ...fundItems];

    // FIX 4: fallback if both APIs returned empty
    if (merged.length === 0) return FALLBACK_ITEMS;

    // FIX 2: shuffle so blood + fund are mixed naturally
    return merged.sort(() => Math.random() - 0.5);
  } catch {
    // FIX 4: fallback on any error
    return FALLBACK_ITEMS;
  }
}
