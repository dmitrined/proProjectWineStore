import { NextResponse } from 'next/server';

/**
 * Health Check Route for WooCommerce API.
 * This route verifies the connectivity and credentials for the WooCommerce REST API.
 */
export async function GET() {
    const WC_URL = process.env.WC_STORE_URL || process.env.NEXT_PUBLIC_WC_URL;
    const WC_KEY = process.env.WC_CONSUMER_KEY;
    const WC_SECRET = process.env.WC_CONSUMER_SECRET;

    if (!WC_URL || !WC_KEY || !WC_SECRET) {
        return NextResponse.json({
            status: 'error',
            message: 'Missing environment variables. Check WC_STORE_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET.'
        }, { status: 500 });
    }

    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');

    try {
        const response = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=1`, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({
                status: 'error',
                code: response.status,
                message: `WooCommerce API returned error: ${response.statusText}`,
                details: errorText
            }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({
            status: 'ok',
            message: 'Connection successful',
            product_count_check: data.length,
            url: WC_URL
        });

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: 'Network execution error',
            error: error.message
        }, { status: 500 });
    }
}
