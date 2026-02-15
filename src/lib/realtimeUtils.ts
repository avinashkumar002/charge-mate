const selfMutatedBookingIds = new Set<string>();

export function markAsSelfMutated(bookingId: string) {
  selfMutatedBookingIds.add(bookingId);
  setTimeout(() => selfMutatedBookingIds.delete(bookingId), 5000);
}

export function isSelfMutated(bookingId: string): boolean {
  if (selfMutatedBookingIds.has(bookingId)) {
    selfMutatedBookingIds.delete(bookingId);
    return true;
  }
  return false;
}