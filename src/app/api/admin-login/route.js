// app/api/admin-login/route.js
export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }
}
