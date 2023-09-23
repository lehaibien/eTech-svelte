// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}

export class Category {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  image: {
    filePath: string;
    fileName: string;
  };
}
