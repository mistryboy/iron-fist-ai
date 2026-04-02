import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

/**
 * Iron Core Fitness — Vercel Serverless Signup Function
 * 
 * This function processes user signups and stores them in Firebase Firestore.
 * It Replaces the local Express signup route for serverless deployment.
 */

// ── Firebase Configuration ────────────────────────────────
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase (singleton pattern for serverless)
let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (err) {
  console.error('[FIREBASE INIT ERROR]', err);
}

export default async function handler(req, res) {
  // 1. Method Validation
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email } = req.body;

    // 2. Basic Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters.' });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'A valid email address is required.' });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!db) {
      return res.status(500).json({ message: 'Database connection error. Please try again later.' });
    }

    // 3. Check for Duplicates (Firestore)
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', cleanEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return res.status(409).json({
        message: 'This email is already registered. Welcome back!',
      });
    }

    // 4. Store New Signup
    const docRef = await addDoc(usersRef, {
      name: cleanName,
      email: cleanEmail,
      createdAt: serverTimestamp(),
      source: 'vercel-api'
    });

    console.log(`[SIGNUP] New member via Vercel: ${cleanName} <${cleanEmail}>`);

    // 5. Success Response
    return res.status(201).json({
      message: `Welcome to Iron Core Fitness, ${cleanName}! We'll be in touch soon.`,
      userId: docRef.id
    });

  } catch (err) {
    console.error('[SIGNUP ERROR]', err);
    return res.status(500).json({ message: 'Internal server error processing your signup.' });
  }
}
