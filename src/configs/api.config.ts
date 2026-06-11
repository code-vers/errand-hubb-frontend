export const API_CONFIG = {
  BACKEND_URL:
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    (process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL.replace("/api/v1", "")
      : "http://localhost:5000"),
  API_V1_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
};

export const getImageUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith("http")) return path;

  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_CONFIG.BACKEND_URL}${normalizedPath}`;
};
