import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Price IDs should be set in environment variables or Stripe dashboard
export const STRIPE_PRICE_IDS = {
  individual_monthly: process.env.STRIPE_PRICE_ID_INDIVIDUAL_MONTHLY || 'price_individual_monthly',
  district_monthly: process.env.STRIPE_PRICE_ID_DISTRICT_MONTHLY || 'price_district_monthly',
}

export const STRIPE_PRODUCT_IDS = {
  individual: process.env.STRIPE_PRODUCT_ID_INDIVIDUAL || 'prod_individual',
  district: process.env.STRIPE_PRODUCT_ID_DISTRICT || 'prod_district',
}
