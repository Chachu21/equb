export const backend_url =
  import.meta.env.NODE_ENV === "production"
    ? "https://mentorshipserver-backend.onrender.com"
    : "http://localhost:5000";
