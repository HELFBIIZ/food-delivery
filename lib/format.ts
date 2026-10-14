export function formatMNT(value: number): string {
  return new Intl.NumberFormat('mn-MN').format(Math.round(value)) + '₮';
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
