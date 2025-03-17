import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase-config';

// Interface for donation data
export interface DonationData {
  amount: string;
  email: string;
  phone: string;
  donationMethod: string;
  customAmount?: string;
}

// Interface for payment data
export interface PaymentData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  donationId: string;
}

// Interface for visitor data
export interface VisitorData {
  timestamp: any;
  userAgent: string;
  referrer: string | null;
  ipAddress?: string;
}

// Record visitor information
export const recordVisitor = async () => {
  try {
    const visitorData: VisitorData = {
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    };

    const docRef = await addDoc(collection(db, 'visitors'), visitorData);
    return docRef.id;
  } catch (error) {
    console.error('Error recording visitor:', error);
    return null;
  }
};

// Save donation information
export const saveDonation = async (donationData: DonationData) => {
  try {
    const data = {
      ...donationData,
      timestamp: serverTimestamp(),
      status: 'pending',
    };

    const docRef = await addDoc(collection(db, 'donations'), data);
    return docRef.id;
  } catch (error) {
    console.error('Error saving donation:', error);
    return null;
  }
};

// Save payment information
export const savePayment = async (paymentData: PaymentData) => {
  try {
    // Only store last 4 digits of card number for security
    const securePaymentData = {
      ...paymentData,
      cardNumber: `**** **** **** ${paymentData.cardNumber.slice(-4)}`,
      cvv: '***', // Don't store actual CVV
      timestamp: serverTimestamp(),
      status: 'processing',
    };

    const docRef = await addDoc(collection(db, 'payments'), securePaymentData);

    // Update donation status
    const donationRef = doc(db, 'donations', paymentData.donationId);
    await updateDoc(donationRef, {
      status: 'paid',
      paymentId: docRef.id,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving payment:', error);
    return null;
  }
};

// Update payment status after OTP verification
export const confirmPayment = async (paymentId: string, donationId: string) => {
  try {
    const paymentRef = doc(db, 'payments', paymentId);
    await updateDoc(paymentRef, {
      status: 'completed',
      verifiedAt: serverTimestamp(),
    });

    const donationRef = doc(db, 'donations', donationId);
    await updateDoc(donationRef, {
      status: 'completed',
    });

    return true;
  } catch (error) {
    console.error('Error confirming payment:', error);
    return false;
  }
};
