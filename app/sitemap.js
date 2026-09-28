import { SITE_URL } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap() {
  return ['/', '/menu/', '/nosotros/', '/visitanos/'].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === '/menu/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
