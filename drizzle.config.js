import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: 'postgresql://test_owner:npg_2EVZUlwJT6MX@ep-morning-voice-a53al4o5-pooler.us-east-2.aws.neon.tech/test?sslmode=require',
  },
});
