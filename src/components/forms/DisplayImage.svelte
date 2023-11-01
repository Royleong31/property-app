<script lang="ts">
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { createEventDispatcher } from 'svelte';

  export let size = 10;
  export let supabase: SupabaseClient;
  export let onUpload: (val: string) => void;

  let avatarUrl: string | null = null;
  let uploading = false;
  let files: FileList;
  let url = '';

  const downloadImage = async (path: string) => {
    try {
      const result = await supabase.storage.from('property_images').getPublicUrl(path);

      if (result.data) {
        avatarUrl = result.data.publicUrl;
        onUpload(avatarUrl);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  };

  const uploadImage = async () => {
    try {
      uploading = true;

      if (!files || files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = files[files.length - 1];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error } = await supabase.storage.from('property_images').upload(filePath, file);

      if (error) {
        throw error;
      }

      url = filePath;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      uploading = false;
    }
  };

  $: if (url) downloadImage(url);
</script>

<div>
  {#if avatarUrl}
    <img
      src={avatarUrl}
      alt={avatarUrl ? 'Avatar' : 'No image'}
      class="avatar image"
      style="height: {size}em; width: {size}em;"
    />
  {:else}
    <div class="avatar no-image" style="height: {size}em; width: {size}em;" />
  {/if}
  <input type="hidden" name="avatarUrl" value={avatarUrl} />

  <div style="width: {size}em;">
    <label class="button primary block" for="single">
      {uploading ? 'Uploading ...' : 'Upload'}
    </label>
    <input
      style="visibility: hidden; position:absolute;"
      type="file"
      id="single"
      accept="image/*"
      bind:files
      on:change={uploadImage}
      disabled={uploading}
    />
  </div>
</div>
