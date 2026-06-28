import { getMarqueeData } from '@/lib/marquee';
import ActivityTicker from './ActiveTicker';

export default async function MarqueeSection({ items = [] }) {
  return <ActivityTicker items={items} />;
}
