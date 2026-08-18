document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const userInput = document.getElementById('userInput');
    const resultContainer = document.getElementById('resultContainer');

    searchBtn.addEventListener('click', async () => {
        const query = userInput.value.trim();
        
        if (!query) {
            alert('الرجاء إدخال اسم اللاعب');
            return;
        }

        // إظهار دائرة التحميل أثناء انتظار الرد من الخادم
        resultContainer.innerHTML = '<div class="loader"></div>';

        try {
            // التعديل 1 و 2: تغيير اسم المسار واسم المتغير ليتطابق مع كود البايثون
            const apiUrl = `https://fifa-backend-8w1t.onrender.com/fifa_gratest_player?player=${encodeURIComponent(query)}`;
            
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('فشل في جلب البيانات من الخادم');
            }

            const data = await response.json();
            
            // التعديل 3: استخدام data.image بدلاً من data.imageUrl
            if (data.image) {
                // عرض الرسالة الترحيبية أو رسالة الخطأ القادمة من الباك اند (اختياري)
                let messageHtml = `<h3 style="color: #d4af37; margin-bottom: 15px;">${data.message}</h3>`;
                
                // عرض الصورة
                let imgHtml = `<img src="${data.image}" alt="بطاقة فيفا">`;
                
                resultContainer.innerHTML = messageHtml + imgHtml;
            } else {
                resultContainer.innerHTML = '<p class="error-message">حدث خطأ في قراءة الصورة من الخادم.</p>';
            }

        } catch (error) {
            console.error('Error:', error);
            resultContainer.innerHTML = `<p class="error-message">حدث خطأ أثناء الاتصال بالخادم. تأكد من أن الـ API يعمل.</p>`;
        }
    });

    // إضافة ميزة البحث عند الضغط على زر Enter
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});