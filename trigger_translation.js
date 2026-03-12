const start = async () => {
    console.log("Triggering batch translation...");
    try {
        const response = await fetch('http://localhost:3004/api/admin/translate-properties');
        const data = await response.json();
        console.log("Response:", data);
    } catch (err) {
        console.error("Error triggering translation:", err);
    }
};

start();
