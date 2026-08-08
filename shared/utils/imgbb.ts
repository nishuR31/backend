export interface ImgBBResult {
    url: string; // direct image URL (e.g. https://i.ibb.co/…/name.webp)
    displayUrl: string;
    deleteUrl: string;
    size: number;
}

export async function uploadToImgBB(
    apiKey: string,
    apiUrl: string,
    buffer: Buffer,
    filename: string,
    expiration?: number,
): Promise<ImgBBResult> {
    if (!apiKey) throw new Error("IMGBB api key is not found or missing");
    if (!apiUrl) throw new Error("IMGBB api url is not found or missing");

    // imgbb accepts base64 as a simple form field — URLSearchParams works with fetch()
    const params = new URLSearchParams();
    params.append("image", buffer.toString("base64"));
    params.append("name", filename);
    if (expiration) params.append("expiration", String(expiration));

    const url = `${apiUrl}?key=${apiKey}`;

    const response = await fetch(url, {
        method: "POST",
        body: params,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`imgbb upload failed (${response.status}): ${text}`);
    }

    const json = (await response.json()) as {
        data: {
            url: string;
            display_url: string;
            delete_url: string;
            size: number;
        };
        success: boolean;
        status: number;
    };

    if (!json.success) throw new Error("imgbb json conversion failed");

    return {
        url: json.data.url,
        displayUrl: json.data.display_url,
        deleteUrl: json.data.delete_url,
        size: json.data.size,
    };
}
