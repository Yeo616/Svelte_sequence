import { writable } from 'svelte/store'

export const count = writable(10);
console.log("스토어",count)
