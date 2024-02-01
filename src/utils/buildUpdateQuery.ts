import { sql } from "drizzle-orm";

function buildUpdateQuery(
  table: string,
  data: Record<string, any>,
  idField: string,
  idValue: string | number
) {
  let setParts = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined) {
      setParts.push(sql`${sql.raw(key)} = ${value}`);
    }
  }

  const setClause = sql.join(setParts, sql.raw(", "));

  return () =>
    sql`UPDATE ${sql.raw(table)} SET ${setClause} WHERE ${sql.raw(
      idField
    )} = ${idValue} RETURNING *`;
}

export default buildUpdateQuery;
