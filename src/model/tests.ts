import knex from "../db";

export function createBuildStats(buildStat) {
  return knex("buildStats").insert(buildStat).returning("*");
}
