type PaginationResponse = [number, number];

export function pagination(page = 10, size = 10): PaginationResponse {
  const limit: number = Math.max(size, 1);
  const offset: number = (Math.max(page, 1) - 1) * limit;
  return [offset, limit];
}
