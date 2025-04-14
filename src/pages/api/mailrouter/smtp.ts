
import { type WorkerMailerOptions, type EmailOptions, WorkerMailer, LogLevel } from "worker-mailer";

export async function POST({ request }) {

  const body = await request.json();
  try {
    const config: WorkerMailerOptions = {
      host: body.credential.host,
      port: body.credential.port,
      secure: body.credential.port == 465 ? true : false,
      authType: 'login',
      // logLevel: LogLevel.DEBUG,
      credentials: {
        username: body.credential.user,
        password: body.credential.pass,
      }
    }
    const email: EmailOptions = {
      from: body.props.sender,
      to: body.props.recipients,
      subject: body.props.subject,
      html: body.props.html,
    }
    await WorkerMailer.send(config, email)
    return Response.json(
      { message: "success", success: true },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { message: error.message, success: false },
        { status: 500 },
      );
    }
    return Response.json(
      { message: `Internal server error`, success: false },
      { status: 500 },
    );
  }
}
