'use client';

import { signIn } from 'next-auth/react';

export default function LandingPage() {
  return (
    <button onClick={() => signIn()}>
      Login
    </button>
  );
}