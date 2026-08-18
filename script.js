document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const userInput = document.getElementById('userInput');
    const resultContainer = document.getElementById('resultContainer');

    searchBtn.addEventListener('click', async () => {
        const query = userInput.value.trim();
        if (!query) return;

        resultContainer.innerHTML = '<div class="loader"></div>';

        try {
            // المسار هنا يجب أن يطابق تماماً ما في البايثون
            const apiUrl = `https://fifa-backend-8w1t.onrender.com/fifa_gratest_player?player=${encodeURIComponent(query)}`;
            
            const response = await fetch(apiUrl);
            const data = await response.json();

            // طباعة النتيجة في Console للتشخيص (اضغط F12 في المتصفح لرؤيتها)
            console.log(data);

     if (data.status === "congrats") {
            resultContainer.innerHTML = `
                <pre style="color: #d4af37; font-family: monospace; white-space: pre-wrap; direction: ltr; text-align: left; background: rgba(0,0,0,0.4); padding: 15px; border-radius: 10px; font-size: 12px; line-height: 1.2; overflow-x: auto;">${data.message}</pre>
                <img src="${data.image}" style="max-width: 100%; border-radius: 10px; margin-top: 15px;">
            `;
        } else {
            resultContainer.innerHTML = `
                <pre style="color: #ff6b6b; font-family: monospace; white-space: pre-wrap; direction: ltr; text-align: left; background: rgba(0,0,0,0.4); padding: 15px; border-radius: 10px; font-size: 12px; line-height: 1.2; overflow-x: auto;">${data.message}</pre>
                <img src="${data.image}" style="max-width: 100%; border-radius: 10px; margin-top: 15px;">
            `;
        }
        } catch (error) {
            resultContainer.innerHTML = `<p style="color:red;">خطأ في الاتصال بالخادم</p>`;
        }
    });
});
