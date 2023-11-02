This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<!-- MIDDLEWARE -->

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
const path = request.nextUrl.pathname;
const token = request.cookies.get('token')?.value || '';

// if (path === '/update-prompt') {
// }

const isPublicRoute =
path === '/signup' ||
path === '/login' ||
path === '/verifyEmail' ||
path === '/forgot-password' ||
path === '/reset-password';

if (isPublicRoute && token)
return NextResponse.redirect(new URL('/', request.nextUrl));

if (!isPublicRoute && !token)
return NextResponse.redirect(new URL('/login', request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
runtime: 'experimental-edge',
matcher: [
'/signup',
'/login',
'/verifyEmail',
'/forgot-password',
'/reset-password',
'/',
'/profile/:path*',
'/update-prompt',
],
};
