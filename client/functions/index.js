import functions from "firebase-functions";
import admin from "firebase-admin";
import cors from "cors";

admin.initializeApp();

const corsOptions = {
  origin: true,
};

export const setInitialAdmin = functions.https.onRequest((req, res) => {
  cors(corsOptions)(req, res, async () => {
    // Check if the request method is POST
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { email } = req.body;

    // Check if the email is provided
    if (!email) {
      return res.status(400).send("Email is required");
    }

    try {
      // Retrieve the user's UID by email
      const user = await admin.auth().getUserByEmail(email);

      // Set the admin claim for this user
      await admin.auth().setCustomUserClaims(user.uid, { admin: true });
      res.status(200).send("Initial admin role assigned");
    } catch (error) {
      console.error("Error setting admin role:", error); // Log the error for debugging
      res.status(500).send("Error setting admin role: " + error.message);
    }
  });
});
