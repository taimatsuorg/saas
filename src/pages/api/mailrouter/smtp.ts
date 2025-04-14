import { sendEmail } from "@/lib/mailrouter";

export async function POST({ locals, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const body = await request.json();
  try {
    const info = await sendEmail(body);
    return Response.json(
      { message: info, success: true },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { message: error, success: false },
      { status: 500 },
    );
  }
}
