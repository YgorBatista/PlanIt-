import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protege apenas a rota /todos e suas subrotas
  if (pathname.startsWith('/todos')) {
    // Verifica sessão NextAuth
    const token = await getToken({ req: request });
    const hasSession =
      token ||
      request.cookies.get('next-auth.session-token') ||
      request.cookies.get('__Secure-next-auth.session-token');

    // Verifica login manual (cookies criados no seu form)
    const manualName = request.cookies.get('manualName');
    const manualEmail = request.cookies.get('userEmail');

    // caso nao tenha os efetuados manda retorna para a pagina de login 
    if (!hasSession && (!manualName || !manualEmail)) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Aplica o middleware somente nas rotas que você quer proteger
export const config = {
  matcher: ['/todos/:path*'],
};
