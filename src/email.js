// 1. Go to https://www.emailjs.com -> Sign up (free, 200 emails/month)
// 2. Email Services > Add new service (connect your Gmail) -> copy the Service ID
// 3. Email Templates > Create template. Use these variables in the template body:
//    {{to_name}} {{to_email}} {{student_name}} {{reg_no}} {{destination}}
//    {{reason}} {{out_date}} {{out_time}} {{in_date}} {{in_time}} {{request_id}} {{stage}}
//    -> copy the Template ID
// 4. Account > General > copy your Public Key
import emailjs from "@emailjs/browser";

const SERVICE_ID = "PASTE_YOUR_SERVICE_ID";
const TEMPLATE_ID = "PASTE_YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "PASTE_YOUR_PUBLIC_KEY";

// stage: "new request" | "parent approved" | "parent denied" | "warden approved" | "warden denied"
export function notify({ to_email, to_name, stage, request }) {
  if (!to_email) return Promise.resolve();
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email,
      to_name,
      stage,
      student_name: request.studentName,
      reg_no: request.regNo,
      destination: request.destination,
      reason: request.reason,
      out_date: request.outDate,
      out_time: request.outTime,
      in_date: request.inDate,
      in_time: request.inTime,
      request_id: request.id,
    },
    PUBLIC_KEY
  );
}
