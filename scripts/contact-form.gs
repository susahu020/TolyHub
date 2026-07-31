// ============================================================
//  TolyHub Contact Form — Google Apps Script
//  Deploy: script.google.com → paste this whole file → Deploy
//  → New deployment → Web app → Execute as: Me → Who has
//  access: Anyone → Deploy. Copy the /exec URL into
//  contact.html's SCRIPT_URL constant if it ever changes.
//
//  NOTE: if a contact form email is showing up as broken plain
//  text (no styling, garbled symbols) instead of this styled
//  card, the deployed script is out of date — go to
//  Manage deployments → Edit (pencil) → New version → Deploy.
//  Editing this file alone does NOT update the live version;
//  Apps Script requires a fresh deployment each time.
// ============================================================

const RECIPIENT_EMAIL = 'tolyhub2@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot check: real users never fill in this hidden field, so a
    // non-empty value means the submission came from a bot. Silently
    // pretend success so bots don't retry/adapt, but skip sending the email.
    if (data.website) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const name    = data.name    || 'N/A';
    const email   = data.email   || 'N/A';
    const subject = data.subject || 'General Question';
    const message = data.message || 'N/A';
    const time    = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd MMM yyyy, hh:mm a');

    const emailSubject = '[TolyHub] ' + subject + ' — from ' + name;

    const subjectEmoji = {
      'General Question': '💬',
      'Bug Report': '🐞',
      'Tool Suggestion': '💡',
      'Business Inquiry': '🤝',
      'Other': '📌'
    }[subject] || '📌';

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f3f5;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f3f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- LOGO HEADER -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#4361ee;border-radius:12px;width:42px;height:42px;text-align:center;vertical-align:middle;">
                    <span style="font-size:22px;line-height:42px;">🛠️</span>
                  </td>
                  <td style="padding-left:10px;font-size:22px;font-weight:800;color:#1a1a2e;letter-spacing:-0.03em;vertical-align:middle;">
                    TolyHub
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MAIN CARD -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid #e9ecef;overflow:hidden;">

              <!-- TOP ACCENT BAR -->
              <tr>
                <td style="background:linear-gradient(135deg,#4361ee 0%,#6082f5 100%);height:5px;font-size:0;line-height:0;">&nbsp;</td>
              </tr>

              <!-- CARD HEADER -->
              <tr>
                <td style="padding:32px 36px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <div style="display:inline-block;background:#eef0fd;color:#4361ee;font-size:12px;font-weight:700;padding:4px 12px;border-radius:99px;letter-spacing:0.05em;text-transform:uppercase;">
                          📬 New Message
                        </div>
                        <h1 style="margin:12px 0 4px;font-size:24px;font-weight:800;color:#1a1a2e;letter-spacing:-0.03em;">
                          ${subjectEmoji} ${subject}
                        </h1>
                        <p style="margin:0;font-size:14px;color:#868e96;">Received on ${time}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- DIVIDER -->
              <tr>
                <td style="padding:0 36px;"><div style="height:1px;background:#e9ecef;"></div></td>
              </tr>

              <!-- SENDER DETAILS -->
              <tr>
                <td style="padding:24px 36px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;border-radius:12px;border:1px solid #e9ecef;">
                    <tr>
                      <td style="padding:20px 24px;">
                        <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#868e96;text-transform:uppercase;letter-spacing:0.08em;">Sender Details</p>

                        <!-- Name Row -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
                          <tr>
                            <td width="28" style="vertical-align:top;padding-top:2px;">
                              <div style="width:28px;height:28px;background:#eef0fd;border-radius:8px;text-align:center;line-height:28px;font-size:14px;">👤</div>
                            </td>
                            <td style="padding-left:12px;vertical-align:top;">
                              <p style="margin:0;font-size:11px;color:#868e96;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Name</p>
                              <p style="margin:2px 0 0;font-size:15px;font-weight:600;color:#1a1a2e;">${name}</p>
                            </td>
                          </tr>
                        </table>

                        <!-- Email Row -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
                          <tr>
                            <td width="28" style="vertical-align:top;padding-top:2px;">
                              <div style="width:28px;height:28px;background:#eef0fd;border-radius:8px;text-align:center;line-height:28px;font-size:14px;">📧</div>
                            </td>
                            <td style="padding-left:12px;vertical-align:top;">
                              <p style="margin:0;font-size:11px;color:#868e96;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Email</p>
                              <p style="margin:2px 0 0;font-size:15px;font-weight:600;">
                                <a href="mailto:${email}" style="color:#4361ee;text-decoration:none;">${email}</a>
                              </p>
                            </td>
                          </tr>
                        </table>

                        <!-- Subject Row -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
                          <tr>
                            <td width="28" style="vertical-align:top;padding-top:2px;">
                              <div style="width:28px;height:28px;background:#eef0fd;border-radius:8px;text-align:center;line-height:28px;font-size:14px;">📌</div>
                            </td>
                            <td style="padding-left:12px;vertical-align:top;">
                              <p style="margin:0;font-size:11px;color:#868e96;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Subject</p>
                              <p style="margin:2px 0 0;font-size:15px;font-weight:600;color:#1a1a2e;">${subject}</p>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- MESSAGE BODY -->
              <tr>
                <td style="padding:0 36px 28px;">
                  <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#868e96;text-transform:uppercase;letter-spacing:0.08em;">💬 Message</p>
                  <div style="background:#f8f9fa;border-left:4px solid #4361ee;border-radius:0 12px 12px 0;padding:20px 24px;">
                    <p style="margin:0;font-size:15px;color:#1a1a2e;line-height:1.7;white-space:pre-wrap;">${message}</p>
                  </div>
                </td>
              </tr>

              <!-- REPLY BUTTON -->
              <tr>
                <td style="padding:0 36px 32px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#4361ee;border-radius:8px;">
                        <a href="mailto:${email}?subject=Re: [TolyHub] ${subject}" 
                           style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.01em;">
                          ↩️ Reply to ${name}
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#868e96;">
                This email was sent automatically by the <strong>TolyHub</strong> contact form.
              </p>
              <p style="margin:0;font-size:12px;color:#868e96;">
                <a href="https://www.tolyhub.com" style="color:#4361ee;text-decoration:none;">www.tolyhub.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

    GmailApp.sendEmail(RECIPIENT_EMAIL, emailSubject, '', {
      htmlBody: htmlBody,
      replyTo: email,
      name: 'TolyHub Contact Form'
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
