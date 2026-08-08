# Campus Outing Pass — Setup Guide

You don't need to know how to code to get this running. Follow these steps in order.

## 1. Create your Firebase project (free) — handles logins + database

1. Go to https://console.firebase.google.com, sign in with any Google account, click **Add project**.
2. Name it (e.g. "campus-outing-pass"), click through the prompts (you can skip Google Analytics).
3. In the left sidebar: **Build > Authentication > Get started**. Click the **Email/Password** provider and enable it.
4. In the left sidebar: **Build > Firestore Database > Create database**. Choose "production mode" and pick a location near you.
5. Click the gear icon (top left) > **Project settings**. Scroll to "Your apps", click the `</>` (web) icon, name it anything, and it'll show you a `firebaseConfig` object with keys like `apiKey`, `authDomain`, etc.
6. Open `src/firebase.js` in this project and paste those values in.

## 2. Add each student, parent, and staff/warden manually

This app does NOT let people sign themselves up — that was your call, and it's the safer choice to start.

For **every person** (student, parent, staff, warden):
1. Firebase console > **Authentication > Users > Add user**. Enter their email and a temporary password. Share that password with them privately (they should change it after first login — see note at the bottom).
2. Firebase console > **Firestore Database > Start collection** (first time) named `users`. For each person, create a document:
   - Use their **User UID** (copied from the Authentication tab) as the Document ID.
   - Add these fields:
     - `role`: `"student"`, `"parent"`, `"staff"`, or `"warden"`
     - `name`: their full name
     - `email`: their login email
     - If `role` is `"student"`: also add `regNo` (their register number) and, if you want, `parentEmail` / `parentName` for direct notification.
     - If `role` is `"parent"`: also add `linkedRegNo` — their child's register number (must exactly match the student's `regNo`).

3. Also create one document at `config/warden` with fields `email` and `name` — this is who gets emailed on every new request.

It's slow for the first batch, but you only set each person up once.

## 3. Set up EmailJS (free) — sends the automatic emails

1. Go to https://www.emailjs.com, sign up free.
2. **Email Services > Add New Service** → connect your Gmail (or college email). Copy the **Service ID**.
3. **Email Templates > Create New Template**. In the body, use variables like:
   ```
   Hi {{to_name}},

   A new outing request needs your attention ({{stage}}).

   Student: {{student_name}} ({{reg_no}})
   Destination: {{destination}}
   Reason: {{reason}}
   Out: {{out_date}} {{out_time}}
   Return by: {{in_date}} {{in_time}}
   Request ID: {{request_id}}
   ```
   Set the "To Email" field of the template to `{{to_email}}`. Copy the **Template ID**.
4. **Account > General** — copy your **Public Key**.
5. Open `src/email.js` and paste in the Service ID, Template ID, and Public Key.

## 4. Apply the security rules

In the Firebase console: **Firestore Database > Rules**, replace the contents with what's in `firestore.rules` in this project, then click **Publish**.

## 5. Run it locally to test

You'll need [Node.js](https://nodejs.org) installed (just click the installer, defaults are fine). Then, in a terminal, inside this folder:

```
npm install
npm run dev
```

It'll print a `localhost` link — open it in your browser and try logging in as one of the accounts you created.

## 6. Put it on a real, public link (free) — Vercel

1. Go to https://vercel.com, sign up free (you can use GitHub or just email).
2. Easiest path: put this project in a GitHub repository (create a free GitHub account if needed, create a new repo, upload these files), then in Vercel click **Add New > Project** and import that repo. Vercel auto-detects Vite and deploys it.
3. You'll get a link like `campus-outing-pass.vercel.app` — that's your real, working website, reachable from any phone.

## About passwords

Right now you set everyone's first password. Once people are logging in on their own phones, add a "Forgot password" link using Firebase's built-in `sendPasswordResetEmail` — I can add this for you when you're ready; it's a small change.

## Roles at a glance

| Role | Can do |
|---|---|
| student | submit requests, see their own requests |
| parent | approve/deny requests for their linked child |
| warden / staff | approve/deny requests parents already approved, see all requests |
