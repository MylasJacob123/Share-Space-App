const { auth, db } = require("../config/firebase");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} = require("firebase/auth");
const { doc, setDoc } = require("firebase/firestore");

const signUp = async (req, res) => {
    const { name, surname, email, password } = req.body;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
  
      const userProfileRef = doc(db, "Users", user.uid, "Profile", "profileInfo");
      
      await setDoc(userProfileRef, {
        name: name,
        surname: surname,
        role: "client",
      });
  
      return res
        .status(201)
        .json({ message: "Signed up successfully", userId: user.uid });
    } catch (authError) {
      console.error("Error in signing up:", authError.message);
  
      return res
        .status(400)
        .json({ message: "Error in signing up", error: authError.message });
    }
  };
  

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(`User signed in: ${user.uid}`);

    return res
      .status(200)
      .json({ message: "Sign in successful", userId: user.uid });
  } catch (authError) {
    console.error("Error in signing user in: ", authError.message);

    return res
      .status(400)
      .json({ message: "Error in signing user in", error: authError.message });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await sendPasswordResetEmail(auth, email);
    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  resetPassword,
};
