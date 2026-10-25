import { NextRequest, NextResponse } from 'next/server';
import { getBlogList } from '@/lib/blog/api';
import { isCheckinApp } from '@/lib/app-mode';
export async function GET(request: NextRequest) {
  if (isCheckinApp()) return new NextResponse(null, { status: 404 });
  const query = request.nextUrl.searchParams;
  try {
    const data = await getBlogList({ page: Number(query.get('page') || 1), search: query.get('search') ?? '', category: query.get('category') ?? '' });
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return NextResponse.json({ message: 'Articles temporarily unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '30' } }); }
}
