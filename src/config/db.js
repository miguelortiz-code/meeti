import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_SERVER,
    dialect: "postgres",
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
    timezone: "-05:00",
  }
);

// conexión a la base de datos
const connection = async () => {
  try {
    await db.authenticate();
    console.log(`✅ Conexión exitosa a la base de datos ${process.env.DB_NAME}`);
    await db.sync();
  } catch (error) {
    console.error(`❌ Error al conectar a la base de datos: ${error}`);
    process.exit(1); // Detiene la app si no conecta
  }
};

// cerrar la conexión al apagar el servidor
process.on("SIGINT", async () => {
  console.log("⏳ Cerrando conexión a la base de datos...");
  await db.close();
  console.log("✅ Conexión cerrada correctamente.");
  process.exit(0);
});

export { db, connection };