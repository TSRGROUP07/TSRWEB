// @ts-nocheck
const { google } = require("googleapis");
const { PassThrough } = require("stream");
const { join } = require("path");
const { readFileSync, writeFileSync } = require("fs");

function createDriveClientFromServiceAccount(config) {
    const auth = new google.auth.JWT({
        email: config.client_email,
        key: config.private_key.replace(/\\n/g, '\n'),
        scopes: [
            "https://www.googleapis.com/auth/drive.readonly",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/drive",
        ],
    });

    return google.drive({ version: "v3", auth });
}

async function uploadToDrive(driveClient, fileBuffer, fileName, mimeType, folderId) {
    try {
        const fileMetadata = {
            name: fileName,
        };

        if (folderId) {
            fileMetadata.parents = [folderId];
        }

        const bufferStream = new PassThrough();
        bufferStream.end(fileBuffer);

        const media = {
            mimeType,
            body: bufferStream,
        };

        const response = await driveClient.files.create({
            requestBody: fileMetadata,
            media,
            fields: "id, name, webViewLink, thumbnailLink",
        });

        return response.data;
    } catch (error) {
        const errorMsg = `ERROR: ${error.message}\nSTACK: ${error.stack}`;
        writeFileSync("error.txt", errorMsg);
        throw error;
    }
}

async function testUpload() {
    try {
        console.log("Starting Test...");
        const serviceAccountPath = join(process.cwd(), "google-drive-service-account.json");
        const serviceAccountFile = readFileSync(serviceAccountPath, "utf8");
        const serviceAccount = JSON.parse(serviceAccountFile);

        const driveClient = createDriveClientFromServiceAccount(serviceAccount);

        // Dummy file
        const buffer = Buffer.from("Test file content");
        const fileName = "test-upload.txt";
        const mimeType = "text/plain";

        console.log("Uploading...");
        const result = await uploadToDrive(driveClient, buffer, fileName, mimeType);

        console.log("SUCCESS!");
        writeFileSync("success.txt", `ID: ${result.id}`);

    } catch (error) {
        // Already handled in uploadToDrive
        console.error("FAILED");
    }
}

testUpload();
