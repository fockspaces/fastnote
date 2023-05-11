export const healthCheck = (req, res) => {
  const { message } = req.query;
  // Get the IP address from the request
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Log the IP address and a custom message
  console.log(`lambda Check OK - IP: ${ip}, message: ${message}`);
  return res.status(200).json({ message });
};
