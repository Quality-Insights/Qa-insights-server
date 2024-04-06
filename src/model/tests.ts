import knex from "../db";

export function createBuildStats(buildStat: object) {
  return knex("buildStats").insert(buildStat).returning("*");
}
