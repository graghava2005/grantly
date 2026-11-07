export function formatRupees(amount) {
  if (typeof amount === 'string') return amount;
  if (!amount && amount !== 0) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDeadline(dateString) {
  if (!dateString) return 'Ongoing';
  const target = new Date(dateString);
  const now = new Date('2026-11-07'); // Set relative to current date context
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = target.toLocaleDateString('en-IN', options);

  let statusBadge = { label: `${diffDays} days left`, type: 'normal' };
  if (diffDays <= 7 && diffDays >= 0) {
    statusBadge = { label: `Closing in ${diffDays}d`, type: 'urgent' };
  } else if (diffDays <= 20 && diffDays > 7) {
    statusBadge = { label: `${diffDays} days left`, type: 'warning' };
  } else if (diffDays < 0) {
    statusBadge = { label: 'Closed', type: 'expired' };
  }

  return {
    date: formattedDate,
    daysLeft: diffDays,
    statusBadge
  };
}
