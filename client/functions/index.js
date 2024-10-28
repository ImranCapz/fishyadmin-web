import functions from "firebase-functions";
import admin from "firebase-admin";
admin.initializeApp();

export const setInitialAdmin = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    res.status(200).send("Initial admin role assigned");
  } catch (error) {
    res.status(500).send("Error setting admin role", +error.message);
  }
});
