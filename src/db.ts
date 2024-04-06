import knex from "knex";

export default knex({
  client: "pg",
  connection: {
    //connectionString: 'qa-insights-pg.cbkowckcix4f.us-east-1.rds.amazonaws.com',
    host: 'qa-insights-pg.cbkowckcix4f.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    database: 'postgres',
    password: 'qainsights',
    ssl: false,
  },
  searchPath: ["knex", "public"],
});

