# Ceygenic Invoicing & Quotation Package

A comprehensive Laravel package for managing invoices, quotations, customers, payments, and more. Features automatic numbering, PDF generation, email delivery, status tracking, and multi-currency support.

## Features

✅ **Customer Management** - Store and manage customer information  
✅ **Quotations** - Create, update, and track quotations with line items  
✅ **Invoices** - Full invoice lifecycle management  
✅ **Automatic Numbering** - Sequential numbering with configurable prefixes  
✅ **Line Items** - Support for multiple items with quantity and pricing  
✅ **Tax Calculation** - Configurable tax rates per document  
✅ **Status Tracking** - Complete status history for invoices and quotations  
✅ **Payment Recording** - Track payments and automatically update invoice status  
✅ **Quotation to Invoice** - Convert accepted quotations to invoices  
✅ **Quotations → Invoices Link** - One quotation can have many invoices; creating an invoice under a quotation auto-inherits the customer  
✅ **PDF Generation** - Generate professional PDF documents using DomPDF  
✅ **Email Delivery** - Send invoices and quotations with PDF attachments  
✅ **Multi-Currency** - Support for different currencies with localized formatting  

## Requirements

- PHP ^8.2
- Laravel ^10.0 or higher
- barryvdh/laravel-dompdf ^3.1

## Installation

Install the package via Composer:

```bash
composer require ceygenic/invoicing-and-quotation
```

### Publish Configuration

Publish the configuration file:

```bash
php artisan vendor:publish --tag=invoicing_and_quotation-config
```

### Publish Migrations

Publish and run the migrations:

```bash
php artisan vendor:publish --tag=invoicing_and_quotation-migrations
php artisan migrate
```

### Publish Views (Optional)

If you want to customize the PDF and email templates:

```bash
php artisan vendor:publish --tag=invoicing_and_quotation-views
```

## Configuration

The package configuration file (`config/invoicing_and_quotation.php`) provides the following options:

```php
return [
    // Master enable/disable flag
    'enabled' => env('INVOICING_QUOTATION_ENABLED', true),
    
    // Invoice numbering
    'invoice_number_prefix' => env('INVOICE_NUMBER_PREFIX', 'INV-'),
    'quotation_number_prefix' => env('QUOTATION_NUMBER_PREFIX', 'QUO-'),
    'number_padding' => env('DOCUMENT_NUMBER_PADDING', 3),
    
    // Defaults
    'default_tax_rate' => env('DEFAULT_TAX_RATE', 0.10), // 10%
    'default_currency' => env('DEFAULT_CURRENCY', 'USD'),
    
    // Email settings
    'email_from_address' => env('INVOICE_QUOTE_FROM_EMAIL', 'no-reply@example.com'),
    'email_from_name' => env('INVOICE_QUOTE_FROM_NAME', 'Billing'),
];
```

### Environment Variables

Add these to your `.env` file:

```env
INVOICING_QUOTATION_ENABLED=true
INVOICE_NUMBER_PREFIX=INV-
QUOTATION_NUMBER_PREFIX=QUO-
DOCUMENT_NUMBER_PADDING=3
DEFAULT_TAX_RATE=0.10
DEFAULT_CURRENCY=USD
INVOICE_QUOTE_FROM_EMAIL=billing@yourcompany.com
INVOICE_QUOTE_FROM_NAME="Your Company"
```

## Database Schema

The package creates the following tables:

- **customers** - Customer information
- **invoices** - Invoice header data (includes optional `quotation_id` FK to `quotations`)
- **invoice_items** - Line items for invoices
- **invoice_status_histories** - Status change tracking for invoices
- **quotations** - Quotation header data
- **quotation_items** - Line items for quotations
- **quotation_status_histories** - Status change tracking for quotations
- **payments** - Payment records linked to invoices

### Status Conventions

**Invoice Statuses:**
- `DRAFT` - Initial state
- `SENT` - Sent to customer
- `OVERDUE` - Past due date
- `PAID` - Fully paid
- `VOID` - Cancelled

**Quotation Statuses:**
- `DRAFT` - Initial state
- `SENT` - Sent to customer
- `ACCEPTED` - Customer accepted
- `REJECTED` - Customer rejected
- `EXPIRED` - Past validity date

## Usage

### Accessing the Billing Service

You can access the `BillingService` in several ways:

```php
// Via facade
use Ceygenic\InvoicingAndQuotation\Facades\InvoicingAndQuotation;
$billing = InvoicingAndQuotation::billing();

// Via dependency injection
use Ceygenic\InvoicingAndQuotation\Services\BillingService;

class InvoiceController extends Controller
{
    public function __construct(private BillingService $billing) {}
}

// Via service container
$billing = app(BillingService::class);
```

### Customer Management

```php
// Create a customer
$customer = $billing->createCustomer([
    'name' => 'Acme Corporation',
    'email' => 'billing@acme.com',
    'phone' => '+1-555-0100',
    'address' => '123 Business St, City, State 12345',
]);
```

### Creating Quotations

```php
// Create a quotation with items
$quotation = $billing->createQuotation([
    'customer_id' => $customer->id,
    'issue_date' => now()->toDateString(),
    'validity_date' => now()->addDays(30)->toDateString(),
    'notes' => 'Valid for 30 days',
    'tax_rate' => 0.15, // Optional, overrides default
    'currency_code' => 'USD', // Optional, overrides default
], [
    [
        'description' => 'Web Development Services',
        'quantity' => 40,
        'unit_price' => 150.00,
    ],
    [
        'description' => 'Hosting (Annual)',
        'quantity' => 1,
        'unit_price' => 1200.00,
    ],
]);

// Access computed totals
echo $quotation->subtotal;    // 7200.00
echo $quotation->tax_amount;  // 1080.00
echo $quotation->total;       // 8280.00
```

### Updating Quotations

```php
// Update quotation details and items
$quotation = $billing->updateQuotation($quotation, [
    'notes' => 'Updated terms',
], [
    ['description' => 'Web Development', 'quantity' => 50, 'unit_price' => 150],
    ['description' => 'Hosting', 'quantity' => 1, 'unit_price' => 1500],
]);
```

### Managing Quotation Status

```php
// Change status with tracking
$billing->changeQuotationStatus($quotation, 'SENT', 'user:123');
$billing->changeQuotationStatus($quotation, 'ACCEPTED', 'user:123');

// View status history
foreach ($quotation->statusHistories as $history) {
    echo "{$history->status} by {$history->changed_by} at {$history->changed_at}";
}
```

### Converting Quotation to Invoice

```php
// Automatically converts quotation to invoice and marks quotation as ACCEPTED
$invoice = $billing->convertQuotationToInvoice($quotation);
```

### Creating Invoices

```php
// Create an invoice directly
$invoice = $billing->createInvoice([
    'customer_id' => $customer->id,
    'issue_date' => today()->toDateString(),
    'due_date' => today()->addDays(30)->toDateString(),
    'notes' => 'Payment due within 30 days',
], [
    ['description' => 'Product A', 'quantity' => 10, 'unit_price' => 99.99],
    ['description' => 'Product B', 'quantity' => 5, 'unit_price' => 149.99],
]);

// Access automatic invoice number
echo $invoice->number; // INV-001
```

### Creating an Invoice Under a Quotation (auto-inherit customer)

```php
// Provide quotation_id; customer_id will be inherited automatically
$invoice = $billing->createInvoice([
    'quotation_id' => $quotation->id,
    'issue_date'   => now()->toDateString(),
    'due_date'     => now()->addDays(30)->toDateString(),
    'notes'        => 'Billed from accepted quotation',
], [
    ['description' => 'Service', 'quantity' => 10, 'unit_price' => 100],
]);

// Link back to quotation
$invoice->quotation;   // Quotation model
$quotation->invoices;  // Collection of related invoices
```

### Managing Invoice Status

```php
$billing->changeInvoiceStatus($invoice, 'SENT', 'user:456');
$billing->changeInvoiceStatus($invoice, 'OVERDUE', 'system');
```

### Recording Payments

```php
// Record a full payment
$payment = $billing->recordPayment($invoice, 'BANK_TRANSFER', '2025-11-18');

// Invoice status automatically updated to PAID
$invoice->refresh();
echo $invoice->status; // PAID
```

### Generating PDFs

```php
// Generate invoice PDF
$pdfBinary = $billing->generateInvoicePdf($invoice);
Storage::put("invoices/{$invoice->number}.pdf", $pdfBinary);

// Generate quotation PDF
$pdfBinary = $billing->generateQuotationPdf($quotation);
Storage::put("quotations/{$quotation->number}.pdf", $pdfBinary);

// Return as download response
return response($pdfBinary)
    ->header('Content-Type', 'application/pdf')
    ->header('Content-Disposition', "attachment; filename=\"{$invoice->number}.pdf\"");
```

### Sending Emails

```php
// Email invoice with PDF attachment
$billing->emailInvoice($invoice, 'customer@example.com');

// Email quotation with PDF attachment
$billing->emailQuotation($quotation, 'customer@example.com');
```

### Currency Formatting

```php
// Format currency amounts
$formatted = $billing->formatCurrency(1234.56, 'USD');
echo $formatted; // USD 1,234.56 (or localized format)
```

## Automatic Numbering

The package automatically generates sequential numbers for invoices and quotations:

- **Invoice Numbers**: `INV-001`, `INV-002`, `INV-003`, etc.
- **Quotation Numbers**: `QUO-001`, `QUO-002`, `QUO-003`, etc.

Numbering can be customized via configuration:
- Change the prefix (e.g., `INVOICE-` instead of `INV-`)
- Adjust zero-padding (e.g., `INV-00001` with padding of 5)

## Customizing Templates

After publishing the views, you can customize:

**PDF Templates:**
- `resources/views/vendor/invoicing_and_quotation/pdf/invoice.blade.php`
- `resources/views/vendor/invoicing_and_quotation/pdf/quotation.blade.php`

**Email Templates:**
- `resources/views/vendor/invoicing_and_quotation/emails/invoice-sent.blade.php`
- `resources/views/vendor/invoicing_and_quotation/emails/quotation-sent.blade.php`

## Testing

Run the package tests:

```bash
composer test
```

Or using PHPUnit directly:

```bash
vendor/bin/phpunit
```

The test suite covers:
- Customer, invoice, and quotation creation
- Automatic numbering
- Total calculations (subtotal, tax, grand total)
- Status change tracking
- Payment recording
- Quotation to invoice conversion
- PDF generation
- Email sending

## Model Relationships

### Customer Model
```php
$customer->invoices;   // HasMany relationship
$customer->quotations; // HasMany relationship
```

### Invoice Model
```php
$invoice->customer;         // BelongsTo relationship
$invoice->quotation;        // BelongsTo relationship (optional)
$invoice->items;            // HasMany relationship
$invoice->payments;         // HasMany relationship
$invoice->statusHistories;  // HasMany relationship
```

### Quotation Model
```php
$quotation->customer;         // BelongsTo relationship
$quotation->items;            // HasMany relationship
$quotation->statusHistories;  // HasMany relationship
$quotation->invoices;         // HasMany relationship (one quotation → many invoices)
```

## Advanced Usage

### Querying Invoices

```php
use Ceygenic\InvoicingAndQuotation\Models\Invoice;

// Find overdue invoices
$overdue = Invoice::where('status', 'OVERDUE')
    ->where('due_date', '<', today())
    ->with('customer')
    ->get();

// Get paid invoices for a customer
$paidInvoices = Invoice::where('customer_id', $customerId)
    ->where('status', 'PAID')
    ->get();
```

### Custom Status Workflows

```php
// Implement your own status logic
if ($invoice->status === 'SENT' && $invoice->due_date < today()) {
    $billing->changeInvoiceStatus($invoice, 'OVERDUE', 'system-cron');
}
```

## Extensibility

The package is designed to be extensible:

1. **Custom Validation** - Add validation rules before calling service methods
2. **Events** - Implement domain events for invoice/quotation lifecycle
3. **Partial Payments** - Extend payment recording for partial amounts
4. **Discounts** - Add discount logic on top of the existing totals
5. **Multiple Taxes** - Implement per-item tax rates
6. **Custom Statuses** - Use your own status enums and workflows
7. **Mailable Classes** - Replace raw Mail::send with dedicated Mailables

## Roadmap

- [ ] Partial payment support with outstanding balance tracking
- [ ] Line-item and document-level discounts
- [ ] Per-item tax rates
- [ ] Enum-based status system with validation
- [ ] Factory classes and seeders for testing
- [ ] Domain events (InvoicePaid, QuotationAccepted, etc.)
- [ ] Advanced PDF themes and branding
- [ ] Currency exchange rate integration
- [ ] Recurring invoices
- [ ] Payment gateway integration

## Security

This package does not include user authentication or authorization. You should:

1. Validate all user input before passing to service methods
2. Implement authorization checks (Laravel Policies recommended)
3. Protect routes and controllers appropriately
4. Use mass-assignment protection on models (already configured)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Running Tests

Before submitting a PR, ensure all tests pass:

```bash
composer test
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- **Author**: Shenal Rayantha
- **Email**: shenalrd23@gmail.com
- **Organization**: Ceygenic

## Support

For bugs, feature requests, or questions, please open an issue on GitHub.

---

**Package Name**: `ceygenic/invoicing-and-quotation`  
**Repository**: CEYCDS-PK-COMPOSER-002-invoicing-and-quotation  
**Version**: 1.0.0
