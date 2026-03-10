const fs = require("fs");

const deleteFile = (filePath) => {
  if (!filePath || filePath.startsWith("http")) {
    return;
  }
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
};

exports.deleteFile = deleteFile;
