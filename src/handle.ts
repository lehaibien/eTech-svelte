import { userStore } from './stores/userStore';

export async function handle({ event, resolve }) {
  const user = localStorage.getItem('user');
  console.log(user);
  if (user) {
    userStore.set(JSON.parse(user));
  }
  const response = await resolve(event);
  return response;
}
