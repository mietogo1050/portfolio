// フォーム送信後にthanksページを表示する(実装外）
// const form = document.getElementById('form');

// form.addEventListener('submit',async(e) =>{
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('user-name',document.getElementById('user-name').value);
//     formData.append('email',document.getElementById('email').value);
//     try{
//         const response = await fetch('https://ssgform.com/s/hVmW9HVXjqrF',{
//             method:'POST',
//             body:formData,
//         });
//         if(!response.ok) throw new Error('送信失敗');
//         window.location.href = './thanks.html';
//     } catch(e) {
//         console.error(e);
//     }
// });

// トップに戻るボタンを交差オブザーバーで出す
window.addEventListener('DOMContentLoaded', () => {

const btnPageTop = document.querySelector('.page-top');
const observeTarget = document.querySelector('.mv');
const options = {
    threshold:0,
    rootMargin:'0px',
};
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        btnPageTop.classList.remove('is-shown');
    } else {
        btnPageTop.classList.add('is-shown');
    }
}, options);

// 監視を始めてください
observer.observe(observeTarget);

// トップに戻る処理
btnPageTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});
});
