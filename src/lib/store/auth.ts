import type { User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

const authStore = writable<User | null>(null);

export default authStore;
