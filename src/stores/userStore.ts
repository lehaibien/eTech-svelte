import type { User } from '$lib/types';
import { writable } from 'svelte/store';

export const userState : User = null ;

export const getUserInit = async () => {
  const localAccessToken = localStorage.getItem('accessToken');
  if(localAccessToken === null) {
    return;
  }
  const token = JSON.parse(localAccessToken).accessToken;
  if(token === undefined || token === null){
    return;
  }
  const user = await getUserFromToken(token);
  setUser(user);
}

 export const userStore = writable(userState);

export const setUser = (user: User) => {
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
