type QueryParams = (string | number)[];

function buildUpdateQuery(
  table: string,
  data: Record<string, any>,
  idField: string,
  idValue: string | number
): { query: string; params: QueryParams } {
  let query = `UPDATE ${table} SET `;
  const params: QueryParams = [];
  let paramIndex = 1;

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      query += `${key} = $${paramIndex}, `;
      params.push(value);
      paramIndex++;
    }
  });

  query = query.slice(0, -2);
  query += ` WHERE ${idField} = $${paramIndex} RETURNING *`;
  params.push(idValue);

  return { query, params };
}

export default buildUpdateQuery;
