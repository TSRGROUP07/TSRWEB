import { z } from "zod";

// Property validation schemas
export const PropertySchema = z.object({
  // Temel Bilgiler
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır").max(200),
  propertyType: z.string().optional(),
  buildingType: z.string().optional(),
  type: z.enum(["Satılık", "Kiralık"], {
    errorMap: () => ({ message: "Tip 'Satılık' veya 'Kiralık' olmalıdır" }),
  }),
  price: z.number().positive("Fiyat pozitif bir sayı olmalıdır"),
  currency: z.string().optional().default("TRY"),
  monthlyRent: z.number().nullable().optional(),
  deposit: z.number().nullable().optional(),

  // Detaylı Bilgiler
  area: z.number().positive("Alan pozitif bir sayı olmalıdır"),
  netArea: z.number().nullable().optional(),
  rooms: z.number().int().min(0, "Oda sayısı 0 veya daha büyük olmalıdır"),
  bathrooms: z.number().int().min(0, "Banyo sayısı 0 veya daha büyük olmalıdır").optional(),
  floor: z.number().nullable().optional(),
  totalFloors: z.number().nullable().optional(),
  buildingAge: z.number().nullable().optional(),
  usageStatus: z.string().optional(),
  heatingType: z.string().optional(),
  direction: z.string().optional(),
  balconyCount: z.number().int().min(0).optional(),
  parkingCount: z.number().int().min(0).optional(),
  hasElevator: z.boolean().optional(),
  hasSecurity: z.boolean().optional(),
  isInSite: z.boolean().optional(),
  isSuitableForCredit: z.boolean().optional(),
  isExchangeable: z.boolean().optional(),
  isPriority: z.boolean().optional(),

  // Lokasyon
  location: z.string().min(3, "Konum en az 3 karakter olmalıdır"),
  district: z.string().optional(),
  neighborhood: z.string().optional(),
  address: z.string().optional(),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }).nullable().optional(),
  googleMapsUrl: z.string().url().optional().or(z.literal("")),

  // Yeni Özellikler (Admin Panel İsteği)
  hasGenerator: z.boolean().optional(), // Jeneratör
  hasCamera: z.boolean().optional(),    // Kamera
  hasCamellia: z.boolean().optional(),  // Kamelya
  furnishedStatus: z.enum(["Eşyalı", "Eşyasız", "Kısmen Eşyalı", "Boş"]).optional(), // Eşyalı/Eşyasız Durumu

  // Feature Flags
  citizenshipSuitable: z.boolean().optional(), // Vatandaşlığa Uygun
  residencePermitSuitable: z.boolean().optional(), // İkamete Uygun
  isOpportunity: z.boolean().optional(), // Fırsat Daire
  isRentalGuaranteed: z.boolean().optional(), // Kira Garantili
  hasSeaView: z.boolean().optional(), // Deniz Manzarası

  // Custom Label (Etiket)
  label: z.string().optional(),

  // Açıklama ve Özellikler
  description: z.string().optional(),
  features: z.array(z.string()).optional(),

  // Medya
  images: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional().or(z.literal("")),
  virtualTourUrl: z.string().url().optional().or(z.literal("")),

  // Ayarlar
  propertyStatus: z.string().optional(),
  listingNumber: z.string().optional(),
  listingDate: z.string().optional(),
  listingEndDate: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  notes: z.string().optional(),

  // Danışman Bilgileri
  agentName: z.string().optional(),
  agentPhoto: z.string().optional(),
  agentPhone: z.string().optional(),

  // Legacy support
  image: z.string().optional(),

  // Cover Photo
  coverImage: z.string().optional().nullable(),
}).passthrough(); // Ekstra alanları da kabul et

export const LoginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export type PropertyInput = z.infer<typeof PropertySchema>;
export type LoginInput = z.infer<typeof LoginSchema>;















