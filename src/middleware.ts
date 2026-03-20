import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  response = await updateSession(request, response)

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const supabase = await import('./lib/supabase/server').then(m => m.createClient())
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
