import { ref } from 'vue';
import { db, projectAuth } from '../Config';

const error = ref(null);

const signup = async (email, password, displayName) => {
  error.value = null;

  try {
    const userCredential = await projectAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Mettez à jour le profil utilisateur
    await user.updateProfile({ displayName });

    // Enregistrer les informations utilisateur dans Firestore
    await db.collection('users').doc(user.uid).set({
      email: user.email,
      username: displayName,
      isAdmin: false // Définir par défaut que l'utilisateur n'est pas un admin
    });

    error.value = null;
    return user; // Renvoie l'utilisateur
  } catch (err) {
    console.error('Error creating user:', err);
    if (err.code === 'auth/email-already-in-use') {
      error.value = 'The email address is already in use by another account.';
    } else {
      error.value = err.message;
    }
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
