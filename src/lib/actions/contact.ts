'use server'

import { Resend } from 'resend'
import { SITE } from '@/lib/site'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_SUBMIT_TIME_MS = 1500

export type ContactResult = { ok: true } | { ok: false; error: 'missing_fields' | 'invalid_email' | 'send_failed' }

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function sendContactMessage(formData: FormData): Promise<ContactResult> {
  // Honeypot: real visitors never see or fill this field — bots that fill every
  // input do. Pretend success so scripted submitters get no useful signal back.
  const honeypot = String(formData.get('company') || '').trim()
  if (honeypot) {
    return { ok: true }
  }

  // A form submitted faster than a human could plausibly read and fill it is
  // almost certainly scripted.
  const startedAt = Number(formData.get('startedAt') || 0)
  if (startedAt && Date.now() - startedAt < MIN_SUBMIT_TIME_MS) {
    return { ok: true }
  }

  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const org = String(formData.get('org') || '').trim()
  const projectType = String(formData.get('projectType') || '').trim()
  const medium = String(formData.get('medium') || '').trim()
  const dateLocation = String(formData.get('dateLocation') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !message) {
    return { ok: false, error: 'missing_fields' }
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: 'invalid_email' }
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set — cannot send email.')
    return { ok: false, error: 'send_failed' }
  }

  const from = process.env.RESEND_FROM_EMAIL || 'nveedee.visuals <noreply@nveedee.ch>'

  const rows: [string, string][] = [
    ['Name', name],
    ['E-Mail', email],
    ['Team / Organisation', org || '—'],
    ['Projektart', projectType || '—'],
    ['Foto / Video / Beides', medium || '—'],
    ['Datum & Ort', dateLocation || '—'],
  ]

  const text = [
    'Neue Projektanfrage',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Nachricht:',
    message,
    '',
    `Antworten an: ${email}`,
  ].join('\n')

  const html = `
    <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; font-size: 15px; color: #111;">
      <h2 style="margin: 0 0 16px;">Neue Projektanfrage</h2>
      <table style="border-collapse: collapse;" cellpadding="0" cellspacing="0">
        ${rows
          .map(
            ([k, v]) => `
        <tr>
          <td style="padding: 4px 12px 4px 0; color: #666; vertical-align: top; white-space: nowrap;">${escapeHtml(k)}</td>
          <td style="padding: 4px 0;">${escapeHtml(v)}</td>
        </tr>`
          )
          .join('')}
      </table>
      <p style="margin: 20px 0 4px; color: #666;">Nachricht:</p>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
      <p style="margin-top: 24px; color: #666;">Antworten an: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    </div>
  `.trim()

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from,
      to: SITE.email,
      replyTo: email,
      subject: 'Neue Projektanfrage – nveedee.visuals',
      text,
      html,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return { ok: false, error: 'send_failed' }
    }

    return { ok: true }
  } catch (err) {
    console.error('[contact] Failed to send email:', err)
    return { ok: false, error: 'send_failed' }
  }
}
