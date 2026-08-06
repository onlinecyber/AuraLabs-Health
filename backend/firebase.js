const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
require("dotenv").config();

let isFirebaseInitialized = false;
let app;
let db;

try {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      })
    });
    db = getFirestore(app);
    isFirebaseInitialized = true;
    console.log("Firebase Admin Initialized");
  } else {
    console.warn("Firebase Admin NOT initialized (Missing Environment Variables)");
  }
} catch (error) {
  console.error("Firebase Admin Initialization Error:", error);
}

const verifyAuth = async (req, res, next) => {
  if (!isFirebaseInitialized) {
    console.warn("Mock Auth Verification Passed");
    req.user = { uid: "mock-user-123", email: "mock@example.com" };
    return next();
  }

  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await getAuth(app).verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = { app, db, verifyAuth, isFirebaseInitialized };
