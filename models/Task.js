const db = require("../config/db");

// Task Table creation (if not exists)
const createTaskTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        priority ENUM('Low', 'Medium', 'High') NOT NULL,
        status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
        dueDate DATE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;
    const connection = await db.getConnection();
    await connection.query(query);
    connection.release();
    console.log("Task table created successfully.");
  } catch (error) {
    console.error("Error creating task table:", error);
  }
};
