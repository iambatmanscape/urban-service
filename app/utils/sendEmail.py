from mailersend import MailerSendClient, EmailBuilder
from config import settings

ms = MailerSendClient()

def account_verification_template(name:str,verification_link:str):
    return f"""
        <!DOCTYPE html>
        <html lang="en" style="margin:0; padding:0;">
        <head>
        <meta charset="UTF-8" />
        <title>Verify Your Account</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- Use inline styles for best email client support -->
        </head>
        <body style="margin:0; padding:0; background-color:#f4f4f4;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding:20px 0;">
            <tr>
            <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#ffffff; border-radius:4px; overflow:hidden; font-family:Arial, sans-serif;">
                <tr>
                    <td style="padding:20px; text-align:center; background-color:#111827; color:#ffffff;">
                    <h1 style="margin:0; font-size:22px; font-weight:600;">Verify Your Account</h1>
                    </td>
                </tr>

                <tr>
                    <td style="padding:20px 24px 10px 24px; font-size:14px; color:#333333;">
                    <p style="margin:0 0 12px 0;">Hi {name},</p>
                    <p style="margin:0 0 12px 0;">
                        Thanks for signing up for UrbanService. Please confirm your email address
                        by clicking the button below.
                    </p>
                    </td>
                </tr>

                <tr>
                    <td align="center" style="padding:10px 24px 20px 24px;">
                    <a href="{verification_link}" 
                        style="display:inline-block; padding:12px 24px; background-color:#2563eb; color:#ffffff; text-decoration:none; font-size:14px; font-weight:bold; border-radius:4px;">
                        Verify Email
                    </a>
                    </td>
                </tr>

                <tr>
                    <td style="padding:0 24px 20px 24px; font-size:12px; color:#555555; line-height:1.5;">
                    <p style="margin:0 0 10px 0;">
                        Or copy and paste this link into your browser:
                    </p>
                    <p style="margin:0; word-break:break-all;">
                        <a href="{verification_link}" style="color:#2563eb; text-decoration:none;">
                        {verification_link}
                        </a>
                    </p>
                    </td>
                </tr>

                <tr>
                    <td style="padding:0 24px 20px 24px; font-size:11px; color:#999999; border-top:1px solid #eeeeee;">
                    <p style="margin:12px 0 0 0;">
                        If you didn’t create an account, you can safely ignore this email.
                    </p>
                    </td>
                </tr>

                </table>
            </td>
            </tr>
        </table>
        </body>
        </html>
    """
    
def send_verification_email(to_email: str, name: str, verification_link: str):
    email_content = account_verification_template(name, verification_link)
    
    email = (
        EmailBuilder()
        .from_email("no-reply@" + settings.MAILER_SEND_DOMAIN, "Urban Services")
        .to(to_email, name)
        .subject("Verify Your Urban Services Account")
        .html(email_content)
        .build()
    )
    
    response = ms.emails.send(email)
    return response
    

if __name__ == "__main__":
    sentMail = send_verification_email('aakashisjesus@gmail.com', 'Aakash', 'https://example.com/verify?token=someverificationtoken')
    print(sentMail)    