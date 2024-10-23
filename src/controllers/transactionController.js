// src/controllers/transactionController.js

const addTransaction = (req, res, db) => {
  const { type, category, amount, date, description } = req.body;

  // Log incoming request body
  console.log("Request Body:", req.body);

  const sql =
    "INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)";

  db.run(sql, [type, category, amount, date, description], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Log the inserted data for debugging
    console.log("Inserted Transaction:", {
      id: this.lastID,
      type,
      category,
      amount,
      date,
      description,
    });

    // Send response with full transaction details
    res.status(201).json({
      id: this.lastID,
      type,
      category,
      amount,
      date,
      description,
    });
  });
};

const getTransactions = (req, res, db) => {
  const sql = "SELECT * FROM transactions";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

const getTransactionById = (req, res, db) => {
  const sql = "SELECT * FROM transactions WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
};

const updateTransaction = (req, res, db) => {
  const { type, category, amount, date, description } = req.body;
  const sql =
    "UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?";
  db.run(
    sql,
    [type, category, amount, date, description, req.params.id],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ changes: this.changes });
    }
  );
};

const deleteTransaction = (req, res, db) => {
  const sql = "DELETE FROM transactions WHERE id = ?";
  db.run(sql, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
};

const getSummary = (req, res, db) => {
  const sql = `
      SELECT 
          SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
          SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpenses
      FROM transactions
  `;
  db.get(sql, [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const balance = row.totalIncome - row.totalExpenses;
    res.json({
      totalIncome: row.totalIncome,
      totalExpenses: row.totalExpenses,
      balance,
    });
  });
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};
