import { profile } from '../data/portfolio'

export function getMailtoLink(subject = 'Hello Areeba') {
  const params = new URLSearchParams({ subject })
  return `mailto:${profile.email}?${params.toString()}`
}

export function getGmailComposeLink(subject = 'Hello Areeba') {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: profile.email,
    su: subject,
  })
  return `https://mail.google.com/mail/?${params.toString()}`
}

/** Opens Gmail compose in a new tab — works even without a desktop mail app. */
export function openEmail(subject = 'Hello Areeba') {
  window.open(getGmailComposeLink(subject), '_blank', 'noopener,noreferrer')
}

export async function copyEmailToClipboard() {
  await navigator.clipboard.writeText(profile.email)
}
