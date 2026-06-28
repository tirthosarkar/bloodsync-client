import { getMarqueeData } from '@/lib/marquee';
import ActivityTicker from './ActiveTicker';

export default async function MarqueeSection() {
  const items = await getMarqueeData();

  return <ActivityTicker items={items} />;
}
