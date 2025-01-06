/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formidable } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Initialize formidable to handle form data
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const { orderDetails, mobileNumber, address, paymentInfo } = fields;

    // Ensure required fields are present
    if (!orderDetails || !mobileNumber || !address || !paymentInfo) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send email immediately
    try {
      const response = await resend.emails.send({
        from: 'Team Oven <onboarding@resend.dev>',
        to: ['ramsha494@gmail.com'],
        subject: 'New Order Received',
        html: `
          <h1>Order Details</h1>
          <p><strong>Contact:</strong> ${mobileNumber}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Payment Info:</strong> ${paymentInfo}</p>
          <p><strong>Details:</strong> ${orderDetails}</p>
        `,
      });

      res.status(200).json({ success: true, messageId: response.data });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
}
