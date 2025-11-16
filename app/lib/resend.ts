
import { Resend } from 'resend';

// Initialize Resend lazily to avoid build-time errors
let resend: Resend | null = null;

function getResendClient() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  inquiryId: string;
}

/**
 * Send admin notification email when a contact form is submitted
 */
export async function sendAdminNotification(data: ContactFormData) {
  try {
    const client = getResendClient();

    const adminEmailResult = await client.emails.send({
      from: 'Everguard Group <info@everguardgroup.com.au>',
      to: 'info@everguardgroup.com.au',
      subject: `New Inquiry: ${data.service} - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Everguard Group Website</p>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #DC2626; margin-top: 0; font-size: 20px; border-bottom: 2px solid #DC2626; padding-bottom: 10px;">Contact Details</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; font-weight: bold; color: #4B5563; width: 140px;">Full Name:</td>
                    <td style="padding: 12px 0; color: #1F2937;">${data.name}</td>
                  </tr>
                  <tr style="background: #f9fafb;">
                    <td style="padding: 12px 0; font-weight: bold; color: #4B5563;">Email:</td>
                    <td style="padding: 12px 0;"><a href="mailto:${data.email}" style="color: #DC2626; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: bold; color: #4B5563;">Phone:</td>
                    <td style="padding: 12px 0;"><a href="tel:${data.phone}" style="color: #DC2626; text-decoration: none;">${data.phone}</a></td>
                  </tr>
                  <tr style="background: #f9fafb;">
                    <td style="padding: 12px 0; font-weight: bold; color: #4B5563;">Service:</td>
                    <td style="padding: 12px 0; color: #1F2937;">${data.service}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: bold; color: #4B5563;">Inquiry ID:</td>
                    <td style="padding: 12px 0; color: #6B7280; font-family: monospace;">${data.inquiryId}</td>
                  </tr>
                  <tr style="background: #f9fafb;">
                    <td style="padding: 12px 0; font-weight: bold; color: #4B5563;">Submitted:</td>
                    <td style="padding: 12px 0; color: #1F2937;">${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #DC2626; margin-top: 0; font-size: 20px; border-bottom: 2px solid #DC2626; padding-bottom: 10px;">Message</h2>
                <p style="color: #1F2937; margin: 0; white-space: pre-wrap; background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #DC2626;">${data.message}</p>
              </div>
              
              <div style="margin-top: 25px; padding: 20px; background: #FEE2E2; border-radius: 8px; border-left: 4px solid #DC2626;">
                <p style="margin: 0; color: #991B1B; font-size: 14px;">
                  <strong>⚡ Action Required:</strong> Please respond to this inquiry within 24 hours to maintain service standards.
                </p>
              </div>
              
              <div style="margin-top: 25px; text-align: center;">
                <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Reply to Client</a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #6B7280; font-size: 12px;">
              <p style="margin: 5px 0;">This email was sent from the Everguard Group contact form</p>
              <p style="margin: 5px 0;">Everguard Group | Professional Investigation Services</p>
              <p style="margin: 5px 0;">Phone: 1300 718 760 | Email: info@everguardgroup.com.au</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ Admin notification sent successfully:', adminEmailResult);
    return adminEmailResult;
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    throw error;
  }
}

/**
 * Send acknowledgment email to the client
 */
export async function sendClientAcknowledgment(data: ContactFormData) {
  try {
    const client = getResendClient();

    const clientEmailResult = await client.emails.send({
      from: 'Everguard Group <info@everguardgroup.com.au>',
      to: data.email,
      subject: 'Thank You for Contacting Everguard Group',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You - Everguard Group</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: white; padding: 40px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 32px;">Thank You, ${data.name.split(' ')[0]}</h1>
              <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">We've received your inquiry</p>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p style="color: #1F2937; margin: 0 0 20px 0; font-size: 16px;">
                  Thank you for reaching out to Everguard Group. Your inquiry regarding <strong>${data.service}</strong> has been received and assigned the reference number:
                </p>
                
                <div style="background: #FEE2E2; border: 2px solid #DC2626; border-radius: 8px; padding: 15px; text-align: center; margin: 20px 0;">
                  <div style="color: #991B1B; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Reference Number</div>
                  <div style="color: #DC2626; font-size: 20px; font-weight: bold; font-family: monospace;">${data.inquiryId}</div>
                </div>
                
                <p style="color: #1F2937; margin: 20px 0 0 0; font-size: 16px;">
                  Our specialist team will review your inquiry and respond within <strong>24 hours</strong>. For urgent matters, please don't hesitate to call our emergency line.
                </p>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #DC2626; margin-top: 0; font-size: 20px; border-bottom: 2px solid #DC2626; padding-bottom: 10px;">Your Submission Details</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #4B5563; width: 120px;">Service:</td>
                    <td style="padding: 10px 0; color: #1F2937;">${data.service}</td>
                  </tr>
                  <tr style="background: #f9fafb;">
                    <td style="padding: 10px 0; font-weight: bold; color: #4B5563;">Email:</td>
                    <td style="padding: 10px 0; color: #1F2937;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #4B5563;">Phone:</td>
                    <td style="padding: 10px 0; color: #1F2937;">${data.phone}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #1F2937; color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; font-size: 18px;">Need Immediate Assistance?</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong>Emergency Line:</strong>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <a href="tel:1300718760" style="color: #FCA5A5; text-decoration: none; font-weight: bold;">1300 718 760</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong>Email:</strong>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <a href="mailto:info@everguardgroup.com.au" style="color: #FCA5A5; text-decoration: none;">info@everguardgroup.com.au</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;" colspan="2">
                      <div style="color: #FCA5A5; font-size: 14px; margin-top: 10px;">
                        ⏰ Available 24/7 for Emergency Situations
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #DBEAFE; border-left: 4px solid #3B82F6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0; color: #1E40AF; font-size: 14px;">
                  <strong>🔒 Confidentiality Guaranteed:</strong> All communications with Everguard Group are strictly confidential and protected under professional investigation standards.
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 25px;">
                <a href="https://www.everguardgroup.com.au" style="display: inline-block; background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Visit Our Website</a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #6B7280; font-size: 12px;">
              <p style="margin: 5px 0;"><strong>Everguard Group</strong> - Specialist Private Investigation & Intelligence Services</p>
              <p style="margin: 5px 0;">Licensed & Professional | 100% Confidential | Australia-Wide Coverage</p>
              <p style="margin: 5px 0;">This email was sent because you submitted a contact form at everguardgroup.com.au</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ Client acknowledgment sent successfully:', clientEmailResult);
    return clientEmailResult;
  } catch (error) {
    console.error('❌ Error sending client acknowledgment:', error);
    throw error;
  }
}
