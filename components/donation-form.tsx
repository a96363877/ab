'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import ReactFlagsSelect from "react-flags-select";

import { saveDonation, recordVisitor } from '@/lib/firebase';
import { PhoneInput } from './flags-selelct';
export default function DonationForm() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<string>('100');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [donationMethod, setDonationMethod] = useState<string>('card');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // Record visitor when component mounts
  useEffect(() => {
    recordVisitor();

  }, []);

  const handleSubmit = async () => {
    // Form validation
    if (!email || !email.includes('@')) {
      toast.error('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    if (!phone || phone.length < 9) {
      toast.error('يرجى إدخال رقم هاتف صحيح');
      return;
    }

    const finalAmount = customAmount || selectedAmount;
    if (!finalAmount) {
      toast.error('يرجى تحديد أو إدخال مبلغ التبرع');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save donation data to Firestore
      const donationData = {
        amount: selectedAmount,
        customAmount: customAmount || undefined,
        email,
        phone,
        donationMethod,
      };

      const donationId = await saveDonation(donationData);

      if (donationId) {
        // Navigate to payment page with donation ID
        router.push(`/payment?id=${donationId}&amount=${finalAmount}`);
      } else {
        throw new Error('Failed to save donation');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast.error('حدثت مشكلة في معالجة تبرعك. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 bg-gray-100 p-2">
      {/* Donation Methods */}
      <div className={"grid grid-cols-3   md:1 gap-2 mb-2"}>
        <Card
          className={`${
            donationMethod === 'bank' ? 'bg-teal-600' : 'bg-teal-400'
          } text-white p-2 text-center rounded-lg cursor-pointer`}
          onClick={() => setDonationMethod('bank')}
        >
          <div className="text-sm  leading-tight">
          تصدق بثقة وأمان          </div>
        </Card>
        <Card
          className={`${
            donationMethod === 'sms' ? 'bg-slate-600' : 'bg-slate-500'
          } text-white p-2 text-center rounded-lg cursor-pointer`}
          onClick={() => setDonationMethod('sms')}
        >
          <div className="text-sm leading-tight">
            تصدق عبر الرسائل النصية
          </div>
        </Card>
        <Card
          className={`${
            donationMethod === 'card' ? 'bg-blue-950' : 'bg-blue-900'
          } text-white p-2 text-center rounded-lg cursor-pointer`}
          onClick={() => setDonationMethod('card')}
        >
          <div className="text-sm leading-tight">تصدق عن أبيك</div>
        </Card>
      </div>

      {/* Donation Amounts */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        <Button
          variant={selectedAmount === '100' ? 'outline' : 'outline'}
          className={`h-16 text-xl ${
            selectedAmount === '100' ? 'border-blue-900 border-4' : 'border'
          }`}
          onClick={() => {
            setSelectedAmount('100');
            setCustomAmount('100');
          }}
        >
          <span className="text-3xl font-bold">100</span>{' '}
          <span className="text-sm mr-1">AED</span>
        </Button>
        <Button
          variant={selectedAmount === '10' ? 'outline' : 'outline'}
          className={`h-16 text-xl ${
            selectedAmount === '10'
              ?'border-blue-900 border-4' : 'border'
          }`}
          onClick={() => {
            setSelectedAmount('10');
            setCustomAmount('10');
          }}
        >
          <span className="text-3xl font-bold">10</span>{' '}
          <span className="text-sm mr-1">AED</span>
        </Button>
        <Button
          variant={selectedAmount === '1000' ? 'outline' : 'outline'}
          className={`h-16 text-xl ${
            selectedAmount === '1000' ? 'border-blue-900 border-4' : 'border'
          }`}
          onClick={() => {
            setSelectedAmount('1000');
            setCustomAmount('1000');
          }}
        >
          <span className="text-3xl font-bold">1000</span>{' '}
          <span className="text-sm mr-1">AED</span>
        </Button>
        <Button
          variant={selectedAmount === '500' ? 'outline' : 'outline'}
          className={`h-16 text-xl ${
            selectedAmount === '500' ? 'border-blue-900 border-4 bg-white' : 'border'
          }`}
          onClick={() => {
            setSelectedAmount('500');
            setCustomAmount('500');
          }}
        >
          <span className="text-3xl font-bold">500</span>{' '}
          <span className="text-sm mr-1">AED</span>
        </Button>
      </div>

      {/* Custom Amount */}
      <div className="mb-2">
        <Input
          type="text"
          placeholder="مبلغ آخر (AED)"
          className="h-14 bg-white"
          value={customAmount}
          onChange={(e) => {
            // Only allow numbers
            const value = e.target.value.replace(/[^0-9]/g, '');
            setCustomAmount(value);
            if (value) setSelectedAmount('custom');
          }}
        />
      </div>

      {/* Contact Information */}
      <div className="space-y-4 mb-4">
        <Input
          type="email"
          placeholder="البريد الإلكتروني"
          className="h-14 bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex gap-2 " dir='ltr'>
        <PhoneInput value='' onChange={setPhone} onCountryChange={()=>{}}/>
          
         
        </div>
      </div>

      {/* Donate Button */}
      <Button
        className="w-full h-14 text-xl bg-gray-300 hover:bg-gray-400 text-gray-700 p-2"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'جاري المعالجة...' : 'تصدّق'}
      </Button>
    </div>
  );
}
