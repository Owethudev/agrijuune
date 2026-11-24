import { env } from '../../config/env.js';
import { createBrevoEmailAdapter } from './brevo-email-adapter.js';

export const emailNotifier = createBrevoEmailAdapter(env.brevo);
