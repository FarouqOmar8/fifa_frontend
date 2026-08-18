document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const userInput = document.getElementById('userInput');
    const resultContainer = document.getElementById('resultContainer');

    searchBtn.addEventListener('click', async () => {
        const query = userInput.value.trim();
        
        if (!query) {
            alert('الرجاء إدخال قيمة في مربع البحث');
            return;
        }

        // إظهار دائرة التحميل أثناء انتظار الرد من الخادم
        resultContainer.innerHTML = '<div class="loader"></div>';

        try {
            // قم بتعديل هذا الرابط بناءً على الـ Endpoint الدقيق في الـ API الخاص بك
            // هنا افترضنا أنه يستقبل باراميتر اسمه `name` أو `query`
            const apiUrl = `https://fifa-backend-8w1t.onrender.com/search?query=${encodeURIComponent(query)}`;
            
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('فشل في جلب البيانات من الخادم');
            }

            /*
             * الاحتمال الأول: الـ API يعيد رابط الصورة بداخل ملف JSON
             * مثال: { "imageUrl": "https://example.com/image.png" }
             */
            const data = await response.json();
            
            if (data.imageUrl) {
                resultContainer.innerHTML = `<img src="${data.imageUrl}" alt="بطاقة فيفا">`;
            } else {
                resultContainer.innerHTML = '<p class="error-message">لم يتم العثور على صورة لهذه القيمة.</p>';
            }

            /* 
             * الاحتمال الثاني (إذا كان الـ API يرسل الصورة مباشرة كـ File/Blob وليس كـ JSON):
             * قم بمسح كود "الاحتمال الأول" بالكامل، واستخدم الكود التالي بدلاً منه:
             * 
             * const blob = await response.blob();
             * const imageUrl = URL.createObjectURL(blob);
             * resultContainer.innerHTML = `<img src="${imageUrl}" alt="بطاقة فيفا">`;
             */

        } catch (error) {
            console.error('Error:', error);
            resultContainer.innerHTML = `<p class="error-message">حدث خطأ أثناء جلب الصورة. تأكد من تشغيل الـ API بشكل صحيح.</p>`;
        }
    });

    // إضافة ميزة البحث عند الضغط على زر Enter في الكيبورد
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});