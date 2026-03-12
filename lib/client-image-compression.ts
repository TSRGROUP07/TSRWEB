/**
 * Client-side image compression utility
 * Uses HTML5 Canvas to resize and compress images before upload
 */

export async function compressImage(file: File, options = { maxWidth: 1920, maxHeight: 1920, quality: 0.8 }): Promise<File> {
    // Sadece resim dosyalarını işle
    if (!file.type.startsWith('image/')) {
        return file;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                // Boyut hesapla
                let width = img.width;
                let height = img.height;

                // Eğer resim zaten küçükse, sıkıştırmadan olduğu gibi döndür (opsiyonel)
                // Ancak genellikle JPEG dönüşümü için her zaman işlemek daha iyidir

                if (width > height) {
                    if (width > options.maxWidth) {
                        height *= options.maxWidth / width;
                        width = options.maxWidth;
                    }
                } else {
                    if (height > options.maxHeight) {
                        width *= options.maxHeight / height;
                        height = options.maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas context oluşturulamadı'));
                    return;
                }

                // Arka planı beyaz yap (PNG şeffaflığı siyaha dönüşmesin diye)
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, width, height);

                ctx.drawImage(img, 0, 0, width, height);

                // Blob'a çevir (JPEG formatında)
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });

                            // Eğer sıkıştırılmış dosya orijinalden büyükse, orijinali kullan (boyut kontrolü)
                            if (newFile.size > file.size) {
                                // console.log("Sıkıştırma faydasız, orijinal kullanılıyor.");
                                resolve(file);
                            } else {
                                // console.log(`Sıkıştırma başarılı: ${(file.size / 1024 / 1024).toFixed(2)}MB -> ${(newFile.size / 1024 / 1024).toFixed(2)}MB`);
                                resolve(newFile);
                            }
                        } else {
                            reject(new Error('Resim sıkıştırılamadı (Canvas to Blob failed)'));
                        }
                    },
                    'image/jpeg',
                    options.quality
                );
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
    });
}
