// Client-side file upload helper
// Previously used Firebase Storage, now uses our own API route which uploads to Google Drive or Local FS

export interface UploadOptions {
  optimize?: boolean;
  onProgress?: (progress: number) => void;
  type?: string;
}

/**
 * Dosyayı sunucuya yükler (/api/admin/upload)
 * Sunucu tarafında Google Drive'a veya dosya sistemine kaydedilir
 */
export async function uploadToFirebaseStorage(
  file: File,
  path: string, // path argümanı geriye dönük uyumluluk için tutuluyor, API type parametresi kullanır
  options: UploadOptions = {}
): Promise<{ url: string; thumbnailUrl?: string | null; metadata?: any }> {
  try {
    const { optimize = false, onProgress, type = "images" } = options;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type); // 'images', 'documents', etc.
    formData.append("optimize", String(optimize));

    // XMLHttpRequest kullanarak upload işlemini yap (progress tracking için)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/admin/upload", true);

      // Auth header ekle (cookie zaten taranıyor tarayıcı tarafından)
      // Ancak client-side'da token varsa ekleyebiliriz

      // Upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      };

      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.error) {
              reject(new Error(response.error));
              return;
            }
            resolve({
              url: response.url,
              thumbnailUrl: response.thumbnailUrl,
              metadata: response.metadata,
            });
          } catch (e) {
            reject(new Error("Sunucu yanıtı okunamadı"));
          }
        } else {
          try {
            const response = JSON.parse(xhr.responseText);
            reject(new Error(response.error || `Upload hatası: ${xhr.status}`));
          } catch (e) {
            reject(new Error(`Upload hatası: ${xhr.status} ${xhr.statusText}`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network hatası"));
      };

      xhr.send(formData);
    });

  } catch (error: any) {
    console.error("Upload hatası:", error);
    throw new Error(`Dosya yüklenemedi: ${error.message}`);
  }
}
