const apiBaseUrl = window.DBREW_API_URL || "";

async function request(path, payload) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Permintaan gagal.");
  return data;
}

async function contact(event) {
  event?.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  try {
    const data = await request("/contact", { name, email, message });
    alert(data.message);
    document.getElementById("contact-form").reset();
  } catch (error) {
    alert(error.message);
  }
}

async function signUp(event) {
  event?.preventDefault();
  const username = document.getElementById("usernameSignUp").value;
  const email = document.getElementById("emailSignUp").value;
  const password = document.getElementById("passwordSignUp").value;
  try {
    const data = await request("/register", { username, email, password });
    alert(data.message);
    window.location.href = "./account.html";
  } catch (error) {
    alert(error.message);
  }
}

async function signIn(event) {
  event?.preventDefault();
  const username = document.getElementById("usernameSignIn").value;
  const password = document.getElementById("passwordSignIn").value;
  try {
    const data = await request("/register/login", { username, password });
    sessionStorage.setItem("dbrewUser", JSON.stringify(data.data));
    alert(data.message);
    window.location.href = "./homepage.html";
  } catch (error) {
    alert(error.message);
  }
}
