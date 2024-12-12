const nodemailer = require("nodemailer");

const sendEmailService = async (order) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Your email provider's SMTP
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Customize the email content based on the order details
    const mailOptions = {
      from: `"ShinrinShop" <${process.env.EMAIL_USER}>`,
      to: order.shippingAddress.email, // Email of the person who placed the order
      subject: "Order Confirmation",
      html: `
      <div style="font-family: Arial, sans-serif; color: #000;">
        <h1 style="font-size: 36px; text-align: center; margin: 0; color: #000;">SHINRINSHOP</h1>
        <h2 style="font-size: 20px; text-align: center; margin: 5px 0; color: #000;">ORDER STATUS</h2>
        
        <hr style="border: 1px solid #ccc; width: 80%; margin: 20px auto;" />
        
        <p style="font-size: 18px; color: #000;">Hey, ${order.shippingAddress.name}</p>
        <p style="font-size: 16px; color: #000;">We're happy to let you know that your order has been <strong>confirmed</strong>!</p>
        
        <p style="font-size: 16px; color: #000;">Please do not hesitate to give us a call on <strong>+92 123 456 789</strong> or send an email to <a href="mailto:contact@shinrinshop.com" style="color: #000;">contact@shinrinshop.com</a> if you have any questions at all.</p>
        
        <p style="font-size: 16px; color: #000;">Thanks,</p>
        <p style="font-size: 16px; font-weight: bold; color: #000;">ShinrinShop</p>
        
        <hr style="border: 1px solid #ccc; width: 80%; margin: 20px auto;" />
        
        <div style="font-size: 16px; color: #000;">
          <p><strong>ORDER ID:</strong> ${order._id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div style="font-size: 16px; color: #000;">
          <p><strong>DELIVERY TO:</strong></p>
          <p>${order.shippingAddress.name}</p>
          <p>${order.shippingAddress.address}</p>
          <p>${order.shippingAddress.city}, ${order.shippingAddress.postalCode}</p>
          <p>${order.shippingAddress.country}</p>
          <p>Phone: ${order.shippingAddress.phone}</p>
        </div>
        
        <hr style="border: 1px solid #ccc; width: 80%; margin: 20px auto;" />
        
        <h3 style="font-size: 18px; color: #000;">ORDER ITEMS</h3>
        ${order.orderItems.map((item) => `
          <div style="margin-bottom: 20px; font-size: 16px; color: #000; display: flex; justify-content: space-between; align-items: center;">
            <p style="flex: 1; margin: 0; text-align: left; display: inline-block; width: 60%;">${item.name}</p>
            <p style="flex: 0; margin: 0; text-align: right; display: inline-block; width: 30%;">Qty: ${item.qty}</p>
          </div>
        `).join('')}
        
        <hr style="border: 1px solid #ccc; width: 80%; margin: 20px auto;" />
        
        <p style="font-size: 16px; text-align: center; color: #000;"><strong>Total Amount:</strong> $${order.totalPrice}</p>
      </div>
    `
  };
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
};

module.exports = sendEmailService;
