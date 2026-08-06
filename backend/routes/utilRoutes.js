const express = require("express");
const { verifyAuth } = require("../firebase");
const router = express.Router();

// Mock modules (User needs to install pdfkit and twilio/messagebird)
let PDFDocument;
try {
  PDFDocument = require("pdfkit");
} catch (e) {
  console.warn("PDFKit not installed. PDF generation will operate in mock mode.");
}

// 1. Generate PDF Report / Invoice
router.post("/generate-pdf", verifyAuth, (req, res) => {
  try {
    const { type, data } = req.body;
    // type: 'invoice' | 'test_report'

    if (!PDFDocument) {
      return res.json({ 
        success: true, 
        message: "PDF generation mocked successfully", 
        mockUrl: `https://auralabs.com/mock-downloads/report_${Date.now()}.pdf`
      });
    }

    const doc = new PDFDocument();
    
    // Set response headers to force download
    res.setHeader("Content-disposition", `attachment; filename=auralabs-${type}-${Date.now()}.pdf`);
    res.setHeader("Content-type", "application/pdf");

    doc.pipe(res);

    // Build PDF Content
    doc.fontSize(25).text(`AuraLabs ${type.toUpperCase()}`, 100, 100);
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    
    if (data) {
      doc.text(JSON.stringify(data, null, 2));
    }

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

// 2. Send Notifications (SMS/WhatsApp)
router.post("/send-notification", verifyAuth, async (req, res) => {
  try {
    const { phone, message, type } = req.body;
    // type: 'whatsapp' | 'sms'

    // Boilerplate for Twilio or Gupshup/MessageBird
    console.log(`[MOCK NOTIFICATION] Sending ${type} to ${phone}: ${message}`);

    // In a real scenario, you would call your SMS API here
    // e.g., await twilioClient.messages.create({ body: message, from: TWILIO_PHONE, to: phone });

    res.json({ success: true, message: `Notification sent successfully via ${type}` });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

module.exports = router;
