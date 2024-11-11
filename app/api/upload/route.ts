import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

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

        // Generate a unique file name
        const uniqueFileName = `${uuidv4()}-${file.name}`;

        // Upload file to Vercel Blob Storage
        const blob = await put(uniqueFileName, file, {
            access: "public",
        });

        // Return a success response with the Blob URL
        return NextResponse.json(
            {
                message: "File uploaded successfully",
                url: blob.url,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: `Error uploading file: ${error.message || error}` },
            { status: 500 }
        );
    }
}
