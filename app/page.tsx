'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<string>('100');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center border-b">
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
      <main className="flex-1  max-w-md mx-auto w-full">
        {/* Hero Section */}
        <div className="relative mb-6 bg-[#ede7dd] w-full">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/bg.png"
              alt="Father's Endowment"
              width={500}
              height={300}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-4xl font-bold text-teal-600 mb-2 rtl:font-semibold">
              وقف الأب
            </h1>
            <p className="text-blue-900 text-xl rtl:font-semibold">
              تبرعك صدقة جارية عن جميع الآباء
            </p>
          </div>
        </div>

        {/* Donation Methods */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Card className="bg-teal-400 text-white p-3 text-center rounded-lg">
            <div className="text-sm font-medium leading-tight text-right">
              تصدق عبر حوالة مصرفية
            </div>
          </Card>
          <Card className="bg-slate-500 text-white p-3 text-center rounded-lg">
            <div className="text-sm font-medium leading-tight text-right">
              تصدق عبر الرسائل النصية
            </div>
          </Card>
          <Card className="bg-blue-900 text-white p-3 text-center rounded-lg">
            <div className="text-sm font-medium leading-tight text-right">
              تصدق عن أبيك
            </div>
          </Card>
        </div>

        {/* Donation Amounts */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            variant={selectedAmount === '100' ? 'default' : 'outline'}
            className={`h-16 text-xl ${
              selectedAmount === '100' ? 'border-blue-900 border-2' : 'border'
            }`}
            onClick={() => setSelectedAmount('100')}
          >
            <span className="text-sm mr-1">AED</span>{' '}
            <span className="text-3xl font-bold">100</span>
          </Button>
          <Button
            variant={selectedAmount === '10' ? 'default' : 'outline'}
            className={`h-16 text-xl ${
              selectedAmount === '10'
                ? 'border-blue-900 border-2 bg-white text-black'
                : 'border bg-blue-900 text-white'
            }`}
            onClick={() => setSelectedAmount('10')}
          >
            <span className="text-sm mr-1">AED</span>{' '}
            <span className="text-3xl font-bold">10</span>
          </Button>
          <Button
            variant={selectedAmount === '1000' ? 'default' : 'outline'}
            className={`h-16 text-xl ${
              selectedAmount === '1000' ? 'border-blue-900 border-2' : 'border'
            }`}
            onClick={() => setSelectedAmount('1000')}
          >
            <span className="text-sm mr-1">AED</span>{' '}
            <span className="text-3xl font-bold">1000</span>
          </Button>
          <Button
            variant={selectedAmount === '500' ? 'default' : 'outline'}
            className={`h-16 text-xl ${
              selectedAmount === '500' ? 'border-blue-900 border-2' : 'border'
            }`}
            onClick={() => setSelectedAmount('500')}
          >
            <span className="text-sm mr-1">AED</span>{' '}
            <span className="text-3xl font-bold">500</span>
          </Button>
        </div>

        {/* Custom Amount */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="(AED) مبلغ آخر"
            className="h-14 text-right"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              if (e.target.value) setSelectedAmount('custom');
            }}
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4 mb-6">
          <Input
            type="email"
            placeholder="البريد الإلكتروني"
            className="h-14 text-right"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex gap-2">
            <div className="relative w-1/3">
              <Button
                variant="outline"
                className="w-full h-14 flex justify-between items-center"
              >
                <span>AE +971</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <Input
              type="tel"
              placeholder="050 123 4567"
              className="h-14 w-2/3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Donate Button */}
        <Button className="w-full h-14 text-xl bg-gray-300 hover:bg-gray-400 text-gray-700">
          تصدّق
        </Button>
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
