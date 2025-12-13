import { slugify } from "@/utils/slugify";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import processFileToWebP from "@/utils/convert-to-webp";

export async function uploadFoto(file: File, name: string): Promise<string> {
  const webpFile = await processFileToWebP(file);
  const fileRef = ref(storage, `fotos/${slugify(name)}-${Date.now()}`);
  const snapshot = await uploadBytes(fileRef, webpFile);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}