// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  if (!token && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}