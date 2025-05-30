export const http = {
    get: async (url, token) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: buildHeaders(token)
        });
        return handleResponse(response);
    },

    post: async (url, data, token) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: buildHeaders(token),
            body: JSON.stringify(data)
        });
        
        return handleResponse(response);
    },

    put: async (url, data, token) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: buildHeaders(token),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    patch: async (url, data, token) => {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: buildHeaders(token),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    delete: async (url, token) => {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: buildHeaders(token)
        });
        return handleResponse(response);
    }
};

// Helper to build headers with optional token
function buildHeaders(token) {
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
}

// Handle and parse the fetch response
async function handleResponse(response) {
    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
        const errorData = contentType?.includes("application/json")
            ? await response.json()
            : { message: await response.text() };
        throw errorData;
    }

    if (response.status === 204) return {}; // No content
    return contentType?.includes("application/json")
        ? await response.json()
        : await response.text(); // Fallback for plain text
}
  