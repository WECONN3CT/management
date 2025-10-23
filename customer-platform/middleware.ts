import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For Phase 1, we don't enforce auth
  // This is just structure for Phase 2
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/customers/:path*', '/projects/:path*'],
};
