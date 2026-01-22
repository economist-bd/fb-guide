// api/send-sms.js
const twilio = require('twilio');

export default async function handler(req, res) {
    // শুধুমাত্র POST মেথড এক্সেপ্ট করবে
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    // এনভায়রনমেন্ট ভেরিয়েবল থেকে ক্রেডেনশিয়াল নেওয়া হবে (নিরাপদ পদ্ধতি)
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
        const message = await client.messages.create({
            body: 'আপনার ফেইসবুক মনিটাইজেশন গাইড লিংক: https://fb-guide.vercel.app - শুভকামনায়, মনজুরুল হক।',
            from: process.env.TWILIO_PHONE_NUMBER, // আপনার ড্যাশবোর্ডের নাম্বার
            to: phone
        });

        return res.status(200).json({ success: true, sid: message.sid });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}