---
sidebar_position: 1
title: "Cey Pk11"
description: "Documentation for nethmi/logger Composer package"
---

# Cey Pk11

A Laravel package for enhanced functionality.

## Requirements

- **PHP**: ^8.2
- **Laravel**: ^12.0

For detailed requirements, see [REQUIREMENTS.md](REQUIREMENTS.md)

## Installation

```bash
composer require cey/pk11
```

## Configuration

Publish the configuration file:

```bash
php artisan vendor:publish --tag=pk11-config
```

You can configure the package by adding these variables to your `.env` file:

```env
PK11_ENABLED=true
PK11_DEFAULT_SETTING=default
PK11_OPTION1=value1
PK11_OPTION2=value2
PK11_TIMEOUT=30
PK11_RETRY_COUNT=3
```

## Usage

```php
use Cey\Pk11\Facades\Pk11;

// Using the facade
Pk11::greet('hehe');              // Returns: "Hello, hehe!"
Pk11::greet();                    // Returns: "Hello, hehe!" (default)
Pk11::someMethod();               // Uses configuration values
Pk11::anotherMethod();            // Returns: 'result'
```

## License

MIT

