// Basit authentication helper - Production'da daha güvenli bir sistem kullanın

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function isAuthenticated(): boolean {
  return getAdminToken() !== null;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
  window.location.href = "/admin/login";
}

// Fetch için headers oluştur (token ile)
export function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
}

// FormData için fetch options (token cookie'de olacak)
export function getAuthFetchOptions(method: string = "POST"): RequestInit {
  const token = getAdminToken();
  const options: RequestInit = {
    method,
    credentials: "include", // Cookie'leri gönder
  };
  
  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  
  return options;
}


















