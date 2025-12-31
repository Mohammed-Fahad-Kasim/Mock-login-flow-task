// ===============================
// Student Mock Login - script.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop().toLowerCase();

  // Elements (if present)
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const togglePass = document.getElementById("togglePass");

  const userLabel = document.getElementById("userLabel");
  const profileUser = document.getElementById("profileUser");

  const logoutBtn = document.getElementById("logoutBtn");
  const logoutBtn2 = document.getElementById("logoutBtn2");

  // ---- Helpers ----
  const setSessionUser = (username) => sessionStorage.setItem("mockUser", username);
  const getSessionUser = () => sessionStorage.getItem("mockUser");
  const clearSession = () => sessionStorage.removeItem("mockUser");

  const requireAuth = () => {
    const user = getSessionUser();
    if (!user) {
      // Not logged in -> force back to login
      window.location.href = "index.html";
      return null;
    }
    return user;
  };

  const doLogout = () => {
    clearSession();
    window.location.href = "index.html";
  };

  // ---- Login Page Logic ----
  if (page === "" || page === "index.html") {
    // If already logged in, go straight to dashboard
    if (getSessionUser()) window.location.href = "dashboard.html";

    // Toggle password visibility
    if (togglePass && passwordInput) {
      togglePass.addEventListener("click", () => {
        const isHidden = passwordInput.type === "password";
        passwordInput.type = isHidden ? "text" : "password";
        togglePass.textContent = isHidden ? "🙈" : "👁️";
      });
    }

    // Bootstrap-like validation + required logic
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simple validation
        const u = (usernameInput?.value || "").trim();
        const p = (passwordInput?.value || "").trim();

        // show invalid UI if empty
        loginForm.classList.add("was-validated");
        if (!u || !p) return;

        // Required logic: admin / 1234
        if (u === "admin" && p === "1234") {
          setSessionUser(u);
          window.location.href = "dashboard.html";
        } else {
          alert("Invalid credentials");
        }
      });
    }
  }

  // ---- Dashboard ----
  if (page === "dashboard.html") {
    const user = requireAuth();
    if (userLabel && user) userLabel.textContent = user;

    if (logoutBtn) logoutBtn.addEventListener("click", doLogout);
    if (logoutBtn2) logoutBtn2.addEventListener("click", doLogout);
  }

  // ---- Profile ----
  if (page === "profile.html") {
    const user = requireAuth();
    if (profileUser && user) profileUser.textContent = user;

    // Static details required (already in HTML).
    // Optional: could customize if user != admin, but task says static.
    if (logoutBtn) logoutBtn.addEventListener("click", doLogout);
    if (logoutBtn2) logoutBtn2.addEventListener("click", doLogout);
  }
});
