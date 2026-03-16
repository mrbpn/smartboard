export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    status: "ok",
    db_url_set: !!process.env.DATABASE_URL,
    jwt_set: !!process.env.JWT_SECRET,
    timestamp: new Date().toISOString(),
  });
}
