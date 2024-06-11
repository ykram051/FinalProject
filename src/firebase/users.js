import { db } from '@/firebase/Config';

export const getUsers = async () => {
  const users = [];
  const snapshot = await db.collection('users').get();
  snapshot.forEach(doc => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};
