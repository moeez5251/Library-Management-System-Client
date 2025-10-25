import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT)

export async function middleware(request: any) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
        console.log(token)
        return NextResponse.redirect(new URL('/', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, SECRET)
        return NextResponse.next();
    } catch (e) {
        console.error("❌ Invalid token:");
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
  matcher: ['/dashboard/:path((?!$).*)'],
};
