import { slugify } from "@/utils/slugify";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

export async function uploadFoto(file: File, name: string): Promise<string> {
  const fileRef = ref(storage, `fotos/${slugify(name)}-${Date.now()}`);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}