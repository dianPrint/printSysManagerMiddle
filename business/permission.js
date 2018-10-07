const initPermission = pool => {
    return {
      add: async permission => {
        const client = await pool.connect();
        const sqlValue = [];
        const sqlValuePlaceholder = [];
        const sqlQueryStr = Object.keys(permission)
          .map((v, i) => {
            sqlValue.push(permission[v]);
            sqlValuePlaceholder.push(`$${i + 1}`);
            return v;
          })
          .join(" , ");
        const sqlStr = `INSERT INTO  user_manager."permission"(${sqlQueryStr}) VALUES (${sqlValuePlaceholder.join(
          " , "
        )}) RETURNING *`;
        try {
          const res = await client.query(sqlStr, sqlValue);
          return res.rows;
        } finally {
          client.release();
        }
      },
      del: async id => {
        const client = await pool.connect();
        const sqlStr = `DELETE FROM user_manager."permission" WHERE id = $1`;
        try {
          const res = await client.query(sqlStr, [id]);
          return res;
        } finally {
          client.release();
        }
      },
      update: async permission => {
        if (!permission || !permission.id) {
          return "no permission id";
        }
        console.log("-->");
        const client = await pool.connect();
        const sqlValue = [permission.id];
        delete permission.id;
        console.log("-->2");
        const sqlQueryStr = Object.keys(permission)
          .map((v, i) => {
            sqlValue.push(permission[v]);
            return `${v} = $${i + 2}`;
          })
          .join(" , ");
        console.log("-->3 ", `UPDATE user_manager."permission" SET ${sqlQueryStr} WHERE id = $1 RETURNING *`);;
        try {
          const res = await client.query(`UPDATE user_manager."permission" SET ${sqlQueryStr} WHERE id = $1 RETURNING *`, sqlValue);
          return res.rows;
        } finally {
          client.release();
        }
      },
      get: async (permission = {}) => {
        const client = await pool.connect();
        const sqlValue = [];
        const sqlQueryStr =
          Object.keys(permission).length !== 0
            ? " WHERE " +
              Object.keys(permission)
                .map((v, i) => {
                  sqlValue.push(permission[v]);
                  return `${v} = $${i + 1}`;
                })
                .join(" and ")
            : "";
        const sqlStr = `SELECT * FROM user_manager."permission" ${sqlQueryStr}`;
        try {
          const res = await client.query(sqlStr, sqlValue);
          return res.rows;
        } finally {
          client.release();
        }
      }
    };
  };
  
  module.exports = initPermission;
  