/**
 * Simple logger for audit trails and debugging
 * In production, replace with winston, pino, or similar
 */

const logLevels = {
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

function formatTimestamp() {
  return new Date().toISOString();
}

function log(level, message, context = {}) {
  const logEntry = {
    timestamp: formatTimestamp(),
    level,
    message,
    ...context,
  };
  console.log(JSON.stringify(logEntry, null, 2));
}

module.exports = {
  debug: (message, context) => log(logLevels.DEBUG, message, context),
  info: (message, context) => log(logLevels.INFO, message, context),
  warn: (message, context) => log(logLevels.WARN, message, context),
  error: (message, context) => log(logLevels.ERROR, message, context),
};
