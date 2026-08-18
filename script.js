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

            if (data.status === "success") {
                resultContainer.innerHTML = `
                    <h3 style="color: #d4af37;">${data.message}</h3>
                    <img src="${data.image}" style="max-width: 100%; border-radius: 10px;">
                `;
            } else {
                resultContainer.innerHTML = `<p style="color:red;">${data.message || "خطأ في البيانات"}</p>`;
            }
        } catch (error) {
            resultContainer.innerHTML = `<p style="color:red;">خطأ في الاتصال بالخادم</p>`;
        }
    });
});
