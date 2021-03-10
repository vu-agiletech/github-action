type PaginationResponse = [number, number];

export function pagination(
  page: number = 10,
  size: number = 10,
): PaginationResponse {
  const limit: number = Math.max(size, 1);
  const offset: number = (Math.max(page, 1) - 1) * limit;
  return [offset, limit];
}
