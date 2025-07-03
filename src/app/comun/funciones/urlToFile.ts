export async function urlToFile(imageUrl: string): Promise<File> {
    try {
        // Fetch the image from the URL
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Extract filename from URL or use a default name
        const filename = imageUrl.split('/').pop() || 'image.jpg';

        // Create a File object from the blob
        const file = new File([blob], filename, {
            type: blob.type
        });

        return file;
    } catch (error) {
        throw new Error(`Error converting URL to File: ${error}`);
    }
}
