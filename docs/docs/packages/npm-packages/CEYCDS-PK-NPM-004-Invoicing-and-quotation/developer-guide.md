# Invoicing and Quotation UI - React Component Library

> **React UI components for the Ceygenic Invoicing & Quotation Laravel package**

A comprehensive React component library providing pre-built UI components for managing invoices, quotations, customers, and payments. Designed to work seamlessly with the [`ceygenic/invoicing-and-quotation`](https://github.com/ceygenic-web/CEYCDS-PK-COMPOSER-002-invoicing-and-quotation) Laravel package.

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Components](#-components)
- [API Client](#-api-client)
- [Hooks](#-hooks)
- [Utilities](#-utilities)
- [TypeScript Support](#-typescript-support)
- [Examples](#-examples)
- [Development](#-development)
- [Contributing](#-contributing)

---

## ✨ Features

### UI Components
- **Invoice List/Grid** - Filterable, sortable invoice list with pagination
- **Invoice Form** - Create/edit invoices with line items and validation
- **Quotation List** - Manage and filter quotations
- **Quotation Form** - Create/edit quotations with line items
- **Payment Form** - Record payments against invoices
- **Status Widgets** - Display and change document statuses

### API Integration
- **Type-safe API Client** - Full TypeScript support
- **RESTful endpoints** - CRUD operations for invoices, quotations, payments
- **PDF generation** - Download invoices and quotations as PDFs
- **Email delivery** - Send documents via email

### State Management
- **Custom React Hooks** - `useForm`, `useLoadingState`, `useCache`, etc.
- **Form validation** - Built-in validation for all forms
- **Error handling** - Comprehensive error states
- **Data caching** - Automatic caching with TTL support

### Utilities
- **Currency formatting** - Multi-currency support
- **Date utilities** - Formatting, calculations, relative dates
- **Tax calculations** - Automatic subtotal, tax, and total calculations
- **Validation** - Field-level and form-level validation

---

## 📦 Installation

```bash
npm install invoicing-and-quotation
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom
```

---

## 🚀 Quick Start

### 1. Set up the API Client

```tsx
import { createApiClient } from 'invoicing-and-quotation';

const apiClient = createApiClient({
  baseUrl: 'https://your-laravel-app.com',
  headers: {
    'Authorization': 'Bearer your-token-here',
  },
  onError: (error) => {
    console.error('API Error:', error);
  },
  onUnauthorized: () => {
    // Redirect to login
    window.location.href = '/login';
  },
});
```

### 2. Use Components

```tsx
import { InvoiceList, InvoiceForm } from 'invoicing-and-quotation';
import { useState, useEffect } from 'react';

function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [invoicesData, customersData] = await Promise.all([
        apiClient.getInvoices(),
        apiClient.getCustomers(),
      ]);
      
      setInvoices(invoicesData.data);
      setCustomers(customersData);
      setIsLoading(false);
    }
    
    loadData();
  }, []);

  return (
    <div>
      <h1>Invoices</h1>
      <InvoiceList
        invoices={invoices}
        customers={customers}
        isLoading={isLoading}
        onInvoiceClick={(invoice) => {
          console.log('Invoice clicked:', invoice);
        }}
      />
    </div>
  );
}
```

---

## 🧩 Components

### InvoiceList

Display a filterable, sortable list of invoices with pagination.

```tsx
import { InvoiceList } from 'invoicing-and-quotation';

<InvoiceList
  invoices={invoices}
  customers={customers}
  isLoading={false}
  onInvoiceClick={(invoice) => console.log(invoice)}
  onFilterChange={(filters) => console.log(filters)}
  onSort={(field, direction) => console.log(field, direction)}
  showPagination={true}
  totalCount={100}
  currentPage={1}
  onPageChange={(page) => console.log(page)}
/>
```

**Props:**
- `invoices`: Invoice[] - Array of invoices to display
- `customers?`: Customer[] - Array of customers for filtering
- `isLoading?`: boolean - Show loading state
- `onInvoiceClick?`: (invoice: Invoice) => void - Click handler
- `onFilterChange?`: (filters: InvoiceFilters) => void - Filter change handler
- `onSort?`: (field: string, direction: 'asc' | 'desc') => void - Sort handler
- `showPagination?`: boolean - Show pagination controls
- `totalCount?`: number - Total number of invoices
- `currentPage?`: number - Current page number
- `onPageChange?`: (page: number) => void - Page change handler

### InvoiceForm

Create or edit invoices with line items, automatic calculations, and validation.

```tsx
import { InvoiceForm } from 'invoicing-and-quotation';

<InvoiceForm
  invoice={existingInvoice} // Optional, for editing
  customers={customers}
  onSubmit={async (data) => {
    const result = await apiClient.createInvoice(data);
    console.log('Invoice created:', result);
  }}
  onCancel={() => console.log('Cancelled')}
  isSubmitting={false}
/>
```

**Props:**
- `invoice?`: Invoice - Existing invoice to edit
- `customers`: Customer[] - Array of customers for selection
- `onSubmit`: (data: CreateInvoiceRequest | UpdateInvoiceRequest) => Promise<void>
- `onCancel?`: () => void - Cancel handler
- `isSubmitting?`: boolean - Show submitting state

### QuotationList

Display and filter quotations.

```tsx
import { QuotationList } from 'invoicing-and-quotation';

<QuotationList
  quotations={quotations}
  customers={customers}
  isLoading={false}
  onQuotationClick={(quotation) => console.log(quotation)}
  onFilterChange={(filters) => console.log(filters)}
/>
```

### QuotationForm

Create or edit quotations.

```tsx
import { QuotationForm } from 'invoicing-and-quotation';

<QuotationForm
  quotation={existingQuotation} // Optional, for editing
  customers={customers}
  onSubmit={async (data) => {
    const result = await apiClient.createQuotation(data);
  }}
  onCancel={() => console.log('Cancelled')}
/>
```

### PaymentForm

Record payments against invoices.

```tsx
import { PaymentForm } from 'invoicing-and-quotation';

<PaymentForm
  invoice={invoice}
  onSubmit={async (data) => {
    const payment = await apiClient.recordPayment(data);
    console.log('Payment recorded:', payment);
  }}
  onCancel={() => console.log('Cancelled')}
/>
```

### StatusBadge

Display status badges with appropriate styling.

```tsx
import { StatusBadge } from 'invoicing-and-quotation';

<StatusBadge status="PAID" />
<StatusBadge status="OVERDUE" />
<StatusBadge status="ACCEPTED" />
```

### StatusChangeWidget

Change document status with a dropdown.

```tsx
import { StatusChangeWidget } from 'invoicing-and-quotation';

<StatusChangeWidget
  currentStatus="SENT"
  availableStatuses={['PAID', 'OVERDUE', 'VOID']}
  onStatusChange={async (newStatus) => {
    await apiClient.changeInvoiceStatus(invoice.id, {
      status: newStatus,
      changed_by: 'user:123',
    });
  }}
/>
```

---

## 🔌 API Client

### Creating an API Client

```tsx
import { createApiClient } from 'invoicing-and-quotation';

const apiClient = createApiClient({
  baseUrl: process.env.REACT_APP_API_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
  },
  onError: (error) => {
    toast.error(error.message);
  },
  onUnauthorized: () => {
    logout();
  },
});
```

### API Methods

#### Customers
```tsx
// Get all customers
const customers = await apiClient.getCustomers();

// Get a single customer
const customer = await apiClient.getCustomer(1);

// Create a customer
const newCustomer = await apiClient.createCustomer({
  name: 'Acme Corp',
  email: 'billing@acme.com',
  phone: '+1-555-0100',
  address: '123 Business St',
});
```

#### Invoices
```tsx
// Get invoices with filters
const response = await apiClient.getInvoices(
  { status: ['SENT', 'OVERDUE'], customer_id: 1 },
  { field: 'issue_date', direction: 'desc' },
  { page: 1, per_page: 10 }
);

// Create an invoice
const invoice = await apiClient.createInvoice({
  customer_id: 1,
  issue_date: '2024-01-15',
  due_date: '2024-02-15',
  tax_rate: 0.1,
  currency_code: 'USD',
  items: [
    { description: 'Web Development', quantity: 40, unit_price: 125 },
  ],
});

// Update an invoice
const updated = await apiClient.updateInvoice(1, {
  due_date: '2024-03-01',
});

// Change invoice status
const statusUpdated = await apiClient.changeInvoiceStatus(1, {
  status: 'PAID',
  changed_by: 'user:123',
});

// Generate PDF
const pdfBlob = await apiClient.generateInvoicePdf(1);

// Email invoice
await apiClient.emailInvoice(1, 'customer@example.com');
```

#### Quotations
```tsx
// Get quotations
const quotations = await apiClient.getQuotations();

// Create a quotation
const quotation = await apiClient.createQuotation({
  customer_id: 1,
  issue_date: '2024-01-15',
  validity_date: '2024-02-15',
  items: [
    { description: 'Service', quantity: 10, unit_price: 100 },
  ],
});

// Convert quotation to invoice
const invoice = await apiClient.convertQuotationToInvoice(1);
```

#### Payments
```tsx
// Record a payment
const payment = await apiClient.recordPayment({
  invoice_id: 1,
  amount: 5500,
  payment_method: 'BANK_TRANSFER',
  payment_date: '2024-01-20',
  reference_number: 'TXN-12345',
});

// Get invoice payments
const payments = await apiClient.getInvoicePayments(1);
```

---

## 🪝 Hooks

### useForm

Manage form state with validation.

```tsx
import { useForm } from 'invoicing-and-quotation';

function MyForm() {
  const form = useForm(
    { name: '', email: '' },
    (values) => {
      const errors = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.email) errors.email = 'Email is required';
      return errors;
    }
  );

  return (
    <form onSubmit={form.handleSubmit(async (values) => {
      await saveData(values);
    })}>
      <input
        value={form.values.name}
        onChange={(e) => form.handleChange('name', e.target.value)}
        onBlur={() => form.handleBlur('name')}
      />
      {form.errors.name && <span>{form.errors.name}</span>}
    </form>
  );
}
```

### useLoadingState

Manage loading and error states.

```tsx
import { useLoadingState } from 'invoicing-and-quotation';

function MyComponent() {
  const { isLoading, error, startLoading, stopLoading, setError } = useLoadingState();

  async function loadData() {
    startLoading();
    try {
      const data = await fetchData();
      stopLoading();
    } catch (err) {
      setError(err);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Content</div>;
}
```

### useCache

Cache data with automatic refresh.

```tsx
import { useCache } from 'invoicing-and-quotation';

function MyComponent() {
  const {
    data,
    isLoading,
    refresh,
    invalidate,
  } = useCache(
    'invoices',
    () => apiClient.getInvoices(),
    { ttl: 5 * 60 * 1000, autoRefresh: true }
  );

  return <div>{/* Use data */}</div>;
}
```

### Other Hooks
- `useAsyncOperation` - Execute async operations with loading/error handling
- `useDebounce` - Debounce values
- `usePagination` - Manage pagination state
- `useSort` - Manage sort state
- `useLocalStorage` - Persist state in localStorage

---

## 🛠 Utilities

### Currency Formatting
```tsx
import { formatCurrency } from 'invoicing-and-quotation';

formatCurrency(1234.56, 'USD'); // "$1,234.56"
```

### Date Utilities
```tsx
import {
  formatDate,
  formatDateForInput,
  getTodayDate,
  addDays,
  isOverdue,
  getDaysUntil,
} from 'invoicing-and-quotation';

formatDate('2024-01-15'); // "Jan 15, 2024"
formatDateForInput(new Date()); // "2024-01-15"
getTodayDate(); // "2024-01-15"
addDays(new Date(), 30); // Date 30 days from now
isOverdue('2024-01-01'); // true/false
getDaysUntil('2024-02-15'); // number
```

### Calculations
```tsx
import {
  calculateSubtotal,
  calculateTaxAmount,
  calculateTotal,
  calculateTotals,
} from 'invoicing-and-quotation';

const items = [
  { description: 'Item 1', quantity: 10, unit_price: 100 },
  { description: 'Item 2', quantity: 5, unit_price: 200 },
];

const subtotal = calculateSubtotal(items); // 2000
const taxAmount = calculateTaxAmount(subtotal, 0.1); // 200
const total = calculateTotal(subtotal, 0.1); // 2200

// Or all at once
const totals = calculateTotals(items, 0.1);
// { subtotal: 2000, taxAmount: 200, total: 2200 }
```

### Validation
```tsx
import {
  validateInvoice,
  validateCustomer,
  fieldValidators,
} from 'invoicing-and-quotation';

const result = validateInvoice(invoiceData);
if (!result.isValid) {
  console.log(result.errors);
}

// Field-level validation
const emailError = fieldValidators.email('test@example.com');
const requiredError = fieldValidators.required('', 'Name');
```

---

## 📘 TypeScript Support

This package is written in TypeScript and includes full type definitions.

```tsx
import type {
  Invoice,
  Quotation,
  Customer,
  Payment,
  InvoiceStatus,
  QuotationStatus,
  CreateInvoiceRequest,
  ApiError,
} from 'invoicing-and-quotation';
```

---

## 💡 Examples

### Complete Invoice Management Page

```tsx
import {
  InvoiceList,
  InvoiceForm,
  createApiClient,
  useCache,
} from 'invoicing-and-quotation';
import { useState } from 'react';

const apiClient = createApiClient({
  baseUrl: process.env.REACT_APP_API_URL!,
});

export function InvoicesPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const {
    data: invoices,
    isLoading,
    refresh,
  } = useCache('invoices', () => apiClient.getInvoices());

  const {
    data: customers,
  } = useCache('customers', () => apiClient.getCustomers());

  async function handleCreateInvoice(data) {
    await apiClient.createInvoice(data);
    refresh();
    setShowForm(false);
  }

  if (showForm) {
    return (
      <InvoiceForm
        customers={customers || []}
        onSubmit={handleCreateInvoice}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Invoices</h1>
        <button onClick={() => setShowForm(true)}>
          Create Invoice
        </button>
      </div>

      <InvoiceList
        invoices={invoices?.data || []}
        customers={customers || []}
        isLoading={isLoading}
        onInvoiceClick={(invoice) => {
          setSelectedInvoice(invoice);
        }}
      />
    </div>
  );
}
```

---

## 🔧 Development

### Prerequisites
- Node.js 20.x or higher
- npm 9.x or higher

### Setup
```bash
# Clone the repository
git clone <repo-url>
cd invoicing-and-quotation

# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run type checking
npm run typecheck

# Build the package
npm run build
```

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook
- `npm run typecheck` - Run TypeScript type checking

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shenal Rayantha**  
Email: shenalrd23@gmail.com  
Organization: Ceygenic

---

## 🔗 Related Packages

- [ceygenic/invoicing-and-quotation](https://github.com/ceygenic-web/CEYCDS-PK-COMPOSER-002-invoicing-and-quotation) - Laravel backend package

---

## 📝 Changelog

### Version 0.0.1 (Initial Release)
- ✅ Invoice List/Grid component
- ✅ Invoice Form component
- ✅ Quotation List component
- ✅ Quotation Form component
- ✅ Payment Form component
- ✅ Status Badge and Status Change Widget
- ✅ API Client with full type safety
- ✅ Custom React hooks
- ✅ Validation utilities
- ✅ Helper functions for formatting and calculations
- ✅ Full TypeScript support
- ✅ Storybook documentation
