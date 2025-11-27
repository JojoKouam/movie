"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast"; 

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
     
      <Toaster position="bottom-center" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }}/>
    </SessionProvider>
  );
}