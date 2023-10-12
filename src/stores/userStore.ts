import type { User } from '$lib/types';
import { writable } from 'svelte/store';

export const userState: User = null;

export const userStore = writable(userState);

export const setUser = (user: User) => {
  console.log('User: ', user);
  userStore.update(() => {
    return user;
  });
};

export const clearUser = () => {
  userStore.update(() => null);
  localStorage.removeItem('accessToken');
};

export const getUserFromToken = async (token: string) => {
  const user: User = await fetch('https://localhost:7066/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then((res) => res.json());
  return user;
};
