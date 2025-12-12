import heic2any from "heic2any";

async function convertToWebP(file: File, quality = 1): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas não suportado");

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Falha ao converter para WebP");

          resolve(
            new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
              type: "image/webp",
            })
          );
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => reject("Erro ao carregar imagem");
    img.src = URL.createObjectURL(file);
  });
}

export default async function processFileToWebP(file: File): Promise<File> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".heic") || file.type === "image/heic") {
    const pngBlob = await heic2any({ blob: file, toType: "image/png" });

    const pngFile = new File(
      [pngBlob as Blob],
      file.name.replace(".heic", ".png"),
      { type: "image/png" }
    );

    return convertToWebP(pngFile);
  }

  return convertToWebP(file);
}