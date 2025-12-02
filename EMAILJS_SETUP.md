# EmailJS Setup Guide

This guide will help you configure EmailJS so that messages from your portfolio contact form are sent to **cristtiiank@gmail.com**.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Once logged in, go to **"Email Services"** in the sidebar
2. Click **"Add New Service"**
3. Select **"Gmail"** as your email service
4. Click **"Connect Account"** and sign in with your **cristtiiank@gmail.com** account
5. Give the service a name (e.g., "Gmail")
6. Copy the **Service ID** (you'll need this later)
7. Click **"Create Service"**

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the sidebar
2. Click **"Create New Template"**
3. Use this template configuration:

**Template Settings:**
- **Template Name**: Portfolio Contact Form
- **Subject**: New message from {{from_name}} - Portfolio Contact

**Email Body (Content tab):**
```
You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. In the **To Email** field, enter: `{{to_email}}`
5. Click **"Save"** 
6. Copy the **Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **"Account"** > **"General"** in the sidebar
2. Find the **"Public Key"** section
3. Copy your **Public Key**

## Step 5: Configure Your Portfolio

1. Open the `.env` file in your project root
2. Replace the placeholder values with your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_from_step_2
VITE_EMAILJS_TEMPLATE_ID=your_template_id_from_step_3
VITE_EMAILJS_PUBLIC_KEY=your_public_key_from_step_4
```

**Example:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
VITE_EMAILJS_PUBLIC_KEY=Xy9aBcDeFgHiJkLm
```

3. Save the `.env` file

## Step 6: Test Your Contact Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`

3. Navigate to the Contact section

4. Fill out the form with test data:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Message**: This is a test message from my portfolio!

5. Click **Submit**

6. You should see:
   - Loading state: "Sending..."
   - Success message: "Message sent successfully! I will get back to you soon."
   - Check your **cristtiiank@gmail.com** inbox for the email

## Troubleshooting

### Error: "EmailJS configuration is missing"
- Make sure you've filled in all three values in the `.env` file
- Restart your dev server after updating `.env`

### Error: "Failed to send message"
- Verify your Service ID, Template ID, and Public Key are correct
- Check your EmailJS account is verified
- Make sure your Gmail account is connected in EmailJS

### Email not received
- Check your spam/junk folder
- Verify the template email is set to `{{to_email}}`
- Check the EmailJS dashboard for error logs

## Free Tier Limits

EmailJS free tier includes:
- ✅ 200 emails per month
- ✅ 2 email templates
- ✅ 50KB per request

This should be more than enough for a personal portfolio!

## Security Note

⚠️ Never commit your `.env` file to Git. It's already added to `.gitignore` to protect your credentials.

## Need Help?

Visit the [EmailJS Documentation](https://www.emailjs.com/docs/) for more information.
