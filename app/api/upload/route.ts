import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
    try {
        // Parse form data from the request
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        // If no file is uploaded, return a 400 error
        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Validate file type (optional)
        const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validMimeTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type" },
                { status: 400 }
            );
        }

        // Convert the file to a buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define the upload directory path
        const uploadDir = join(process.cwd(), "public/images");

        // Ensure the upload directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            console.error("Error creating directory:", error);
            return NextResponse.json(
                { error: "Failed to create upload directory" },
                { status: 500 }
            );
        }

        // Generate a unique file name (to avoid conflicts)
        const uniqueFileName = `${uuidv4()}-${file.name}`;
        const filePath = join(uploadDir, uniqueFileName);

        // Save the file to the specified directory
        await writeFile(filePath, buffer);

        // Return a success response
        return NextResponse.json(
            {
                message: "File uploaded successfully",
                filename: uniqueFileName,
            },
            { status: 200 }
        );
    } catch (error: any) {
        // Log any error and return a generic 500 error message
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: `Error uploading file: ${error.message || error}` },
            { status: 500 }
        );
    }
}
