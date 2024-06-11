import { ref } from 'vue';
import { db, projectAuth } from '@/firebase/Config';

const error = ref(null);

const login = async (email, password, loginType) => {
  error.value = null;
  try {
    if (loginType === 'admin') {
      const adminSnapshot = await db.collection('adminEmails').where('email', '==', email).get();
      if (adminSnapshot.empty) {
        throw new Error('Admin email not found.');
      }
      const adminData = adminSnapshot.docs[0].data();
      if (adminData.password !== password) {
        throw new Error('Invalid admin credentials.');
      }
      return { email: adminData.email, isAdmin: true };
    }

    const response = await projectAuth.signInWithEmailAndPassword(email, password);
    const user = response.user;
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (!userDoc.exists) {
      throw new Error('User data not found in Firestore');
    }

    const isAdmin = (await db.collection('adminEmails').where('email', '==', email).get()).size > 0;

    return { ...user, isAdmin };
  } catch (err) {
    console.error('Error during login:', err);

    let errorMessage = 'An error occurred. Please try again later.';

    if (err.code === 'auth/user-not-found') {
      errorMessage = 'No user found with this email.';
    } else if (err.code === 'auth/wrong-password') {
      errorMessage = 'Invalid login credentials. Please check your email and password.';
    } else {
      errorMessage = err.message;
    }

    error.value = errorMessage;
  }
};

const useLogin = () => {
  return { error, login };
};

export default useLogin;
