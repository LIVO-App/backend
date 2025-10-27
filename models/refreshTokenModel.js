"use strict";

const pool = require("../utils/db.js");
const crypto = require("crypto");

module.exports = {
  /**
   * Crea un nuovo refresh token per un utente e dispositivo specifico
   * @param {number} userId - ID dell'utente
   * @param {string} userType - Tipo di utente (student, teacher, admin)
   * @param {string} deviceUuid - Identificatore unico del dispositivo
   * @param {string} deviceType - Tipo di dispositivo (mobile, web)
   * @returns {Promise<string>} Il refresh token generato
   */
  async create(userId, userType, deviceUuid, deviceType = "web") {
    let conn;
    try {
      // Genera un token casuale sicuro
      const token = crypto.randomBytes(64).toString("hex");

      // Calcola la data di scadenza in base al tipo di dispositivo
      // Mobile: 90 giorni, Web: 7 giorni
      const expirationDays = deviceType === "mobile" ? 90 : 7;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expirationDays);

      conn = await pool.getConnection();

      const current_refresh = await this.findByDeviceId(userId, userType, deviceUuid);

      let sql = "";
      if (current_refresh) {
        // Se esiste già un refresh token per questo dispositivo, lo aggiorna
        sql = `
                  UPDATE refresh_tokens
                  SET token = ?, expires_at = ?
                  WHERE user_id = ? AND user_type = ? AND device_uuid = ?
              `;
              
        await conn.query(sql, [
          token,
          expiresAt,
          userId,
          userType,
          deviceUuid,
        ]);
      } else {
        // Inserisce il nuovo token
        sql = `
                  INSERT INTO refresh_tokens (user_id, user_type, device_uuid, device_type, token, expires_at)
                  VALUES (?, ?, ?, ?, ?, ?)
              `;

        await conn.query(sql, [
          userId,
          userType,
          deviceUuid,
          deviceType,
          token,
          expiresAt,
        ]);
      }

      return token;
    } catch (err) {
      console.error("Error creating refresh token:", err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Trova un refresh token valido
   * @param {string} token - Il refresh token da cercare
   * @returns {Promise<object|null>} Oggetto con user_id, user_type, device_uuid, device_type o null se non trovato/scaduto
   */
  async findByToken(token) {
    let conn;
    try {
      conn = await pool.getConnection();

      const sql = `
                SELECT user_id, user_type, device_uuid, device_type, expires_at
                FROM refresh_tokens
                WHERE token = ? AND expires_at > NOW()
            `;

      const rows = await conn.query(sql, [token]);

      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (err) {
      console.error("Error finding refresh token:", err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  },

  async findByDeviceId(userId, userType, deviceUuid) {
    let conn;
    try {
      conn = await pool.getConnection();

      const sql = `
                SELECT user_id, user_type, device_uuid, device_type, expires_at
                FROM refresh_tokens
                WHERE user_id = ? AND user_type = ? AND device_uuid = ?
            `;

      const rows = await conn.query(sql, [userId, userType, deviceUuid]);

      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (err) {
      console.error("Error finding refresh token by device:", err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Elimina il refresh token di un dispositivo specifico
   * @param {number} userId - ID dell'utente
   * @param {string} userType - Tipo di utente (student, teacher, admin)
   * @param {string} deviceUuid - Identificatore del dispositivo
   * @returns {Promise<boolean>} True se l'operazione è riuscita
   */
  async deleteByDevice(userId, userType, deviceUuid) {
    let conn;
    try {
      conn = await pool.getConnection();

      const sql =
        "DELETE FROM refresh_tokens WHERE user_id = ? AND user_type = ? AND device_uuid = ?";
      await conn.query(sql, [userId, userType, userId + "_" + userType + "_" + deviceUuid]);

      return true;
    } catch (err) {
      console.error("Error deleting refresh token by device:", err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Elimina tutti i refresh token di un utente
   * @param {number} userId - ID dell'utente
   * @param {string} userType - Tipo di utente (student, teacher, admin)
   * @returns {Promise<boolean>} True se l'operazione è riuscita
   */
  async deleteByUserId(userId, userType) {
    let conn;
    try {
      conn = await pool.getConnection();

      const sql =
        "DELETE FROM refresh_tokens WHERE user_id = ? AND user_type = ?";
      await conn.query(sql, [userId, userType]);

      return true;
    } catch (err) {
      console.error("Error deleting refresh tokens:", err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Elimina un refresh token specifico
   * @param {string} token - Il refresh token da eliminare
   * @returns {Promise<boolean>} True se l'operazione è riuscita
   */
  async deleteByToken(token) {
    let conn;
    try {
      conn = await pool.getConnection();

      const sql = "DELETE FROM refresh_tokens WHERE token = ?";
      await conn.query(sql, [token]);

      return true;
    } catch (err) {
      console.error("Error deleting refresh token:", err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Elimina tutti i token scaduti dal database
   * @returns {Promise<number>} Numero di token eliminati
   */
  async deleteExpired() {
    let conn;
    try {
      conn = await pool.getConnection();

      const sql = "DELETE FROM refresh_tokens WHERE expires_at <= NOW()";
      const result = await conn.query(sql);

      return result.affectedRows || 0;
    } catch (err) {
      console.error("Error deleting expired refresh tokens:", err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  },
};
