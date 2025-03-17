'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import DonationForm from '@/components/donation-form';

export default function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<string>('100');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center border-b ">
        <div className="flex items-center gap-2">
          <Image
            src="/mbgr.png"
            alt="Mohammed bin Rashid Al Maktoum Global Initiatives"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <img
            src="/fe-log.png"
            alt="Mohammed bin Rashid Al Maktoum Global Initiatives"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <button className="text-gray-500">
          <div className="flex flex-col gap-1">
            <div className="w-6 h-0.5 bg-gray-400"></div>
            <div className="w-6 h-0.5 bg-gray-400"></div>
            <div className="w-6 h-0.5 bg-gray-400"></div>
          </div>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1  max-w-md mx-auto w-full p-4">
        {/* Hero Section */}
        <DonationForm/>

    
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="text-xs">PRHCE-004026213 :رقم ترخيص</div>
          <Image
            src="/foot.webp"
            alt="License"
            width={100}
            height={30}
            className="h-6 w-auto"
          />
        </div>
        <div className="text-sm font-semibold">© FATHERS' ENDOWMENT</div>
      </footer>
    </div>
  );
}
