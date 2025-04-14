import { WorkerMailer } from 'worker-mailer'

export const sendEmail = async (body: { credential: { host: any; port: number; user: any; pass: any; }; props: { sender: any; recipients: any; subject: any; html: any; }; }) => {
    const info = await WorkerMailer.send({
      host: body.credential.host,
      port: body.credential.port,
      secure: body.credential.port == 465 ? true : false,
      credentials: {
        username: body.credential.user,
        password: body.credential.pass,
      }
    },
    {
      from: body.props.sender,
      to: body.props.recipients,
      subject: body.props.subject,
      html: body.props.html,
    }
  );
    console.log(info)
    return info;
  }
  
