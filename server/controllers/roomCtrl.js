const shortid = require('shortid');

exports.post = (req, res) => {
  console.log('room post ctrl');
  const roomId = shortid.generate();
  return res.json({roomId: roomId});
}