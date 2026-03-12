const fs = require('fs');
const path = require('path');

const imagePath = path.join(__dirname, '../public/G46.png');

try {
    const fd = fs.openSync(imagePath, 'r');
    const buffer = Buffer.alloc(24);
    fs.readSync(fd, buffer, 0, 24, 0);
    fs.closeSync(fd);

    // PNG signature
    if (buffer.toString('hex', 0, 8) === '89504e470d0a1a0a') {
        const width = buffer.readUInt32BE(16);
        const height = buffer.readUInt32BE(20);
        console.log(`Dimensions: ${width}x${height}`);
        console.log(`Aspect Ratio: ${width / height}`);
    } else {
        console.log("Not a valid PNG file signature");
    }
} catch (err) {
    console.error("Error reading file:", err);
}
