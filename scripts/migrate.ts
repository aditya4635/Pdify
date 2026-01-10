const { neon } = require("@neondatabase/serverless");
require('dotenv').config();

async function runMigration() {
  console.log("🔄 Starting database migration...");
  
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not defined in .env");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Run the migration
    console.log("⏳ Adding card_data column...");
    await sql`
      ALTER TABLE pdf_summaries 
      ADD COLUMN IF NOT EXISTS card_data JSONB DEFAULT NULL
    `;

    console.log("✅ Migration successful! card_data column added.");

    // Verify the column was added
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'pdf_summaries'
      ORDER BY column_name
    `;

    console.log("\n📋 Current table columns:");
    columns.forEach((col) => {
      console.log(`  - ${col.column_name}: ${col.data_type}`);
    });

    console.log("\n🎉 Migration complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

runMigration();
