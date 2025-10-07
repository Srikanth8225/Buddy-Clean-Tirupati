
export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-12">Refund & Cancellation Policy</h1>
        <div className="prose prose-lg max-w-none text-muted-foreground">
          <h2>1. Cancellation Policy</h2>
          <p>
            You can cancel your service booking at any time. To cancel, please contact us at least 24 hours before your scheduled service time.
          </p>
          <ul>
            <li>Cancellations made more than 24 hours before the scheduled service time will receive a 100% refund of any amount paid.</li>
            <li>Cancellations made within 24 hours of the service time are not eligible for a refund, but we will be happy to reschedule your service to a more convenient time.</li>
            <li>If you chose the "Cash on Delivery" option, please inform us of your cancellation to avoid dispatching our team.</li>
          </ul>

          <h2>2. Refund Policy</h2>
          <p>
            We strive to provide the best cleaning service possible. If you are not satisfied with our service, please contact us within 24 hours of the service completion.
          </p>
          <ul>
            <li><strong>Service Quality Issues:</strong> If you are unhappy with the quality of our service, we will send a team back to address the specific areas of concern at no additional cost to you (a "re-clean"). This must be reported within 24 hours of the original service.</li>
            <li><strong>Refund Eligibility:</strong> Refunds are processed on a case-by-case basis. A refund will only be considered if a re-clean is not possible or if the service was not performed at all due to a fault on our end.</li>
            <li><strong>Processing Refunds:</strong> If a refund is approved, it will be processed within 5-7 business days to your original payment method. For "Cash on Delivery" orders, this policy does not apply as no upfront payment was made.</li>
          </ul>

          <h2>3. Rescheduling</h2>
          <p>
            You can reschedule your service at no extra cost, provided you let us know at least 12 hours before your scheduled appointment. Please contact our support team to arrange a new date and time.
          </p>

          <h2>4. How to Contact Us</h2>
          <p>
            For any cancellations, refund requests, or rescheduling, please contact us via:
          </p>
          <ul>
            <li>Email: <a href="mailto:buddycleanservices@gmail.com">buddycleanservices@gmail.com</a></li>
            <li>Phone: <a href="tel:+918096092423">+91 80960 92423</a></li>
          </ul>

          <p className="mt-8">
            Buddy Clean reserves the right to modify this policy at any time. Please review it periodically. Your continued use of our services after any modification constitutes your acceptance of the new terms.
          </p>
        </div>
      </div>
    </div>
  );
}
