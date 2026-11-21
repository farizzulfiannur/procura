const API_URL = "http://localhost:8000";

// Membaca cookie berdasarkan nama
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie
    ? decodeURIComponent(cookie.split("=")[1])
    : null;
}

// Mengambil CSRF Cookie dari Laravel
export async function getCsrfCookie() {
  const response = await fetch(
    `${API_URL}/sanctum/csrf-cookie`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil CSRF Cookie");
  }
}

// Fungsi request ke Laravel
export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const csrfToken = getCookie("XSRF-TOKEN");

  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (csrfToken) {
    headers.set("X-XSRF-TOKEN", csrfToken);
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers,
  });
}

// Login
export async function login(email: string, password: string) {
  await getCsrfCookie();

  const response = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Login gagal");
  }

  return true;
}

// Mengecek pengguna yang sedang login
export async function getUser() {
  const response = await apiFetch("/api/user");

  if (!response.ok) {
    throw new Error("Belum login atau session sudah berakhir");
  }

  return response.json();
}

// Logout
export async function logout() {
  const response = await apiFetch("/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout gagal");
  }

  return true;
}

