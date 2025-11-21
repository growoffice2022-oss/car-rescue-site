// DOM読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
    setupContactForm();
    setupHamburgerMenu();
    console.log('ローン車買取サイト初期化完了');
});

// ハンバーガーメニュー設定
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // メニューリンククリック時にメニューを閉じる
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// お問い合わせフォーム設定
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// お問い合わせフォーム送信処理
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // バリデーション
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();
    const inquiry = formData.get('inquiry');
    const message = formData.get('message')?.trim();
    const privacy = formData.get('privacy');
    
    // エラーメッセージをクリア
    clearErrorMessages();
    
    let hasError = false;
    
    // 必須項目チェック
    if (!name) {
        showFieldError('name', 'お名前を入力してください');
        hasError = true;
    }
    
    if (!email) {
        showFieldError('email', 'メールアドレスを入力してください');
        hasError = true;
    } else if (!isValidEmail(email)) {
        showFieldError('email', '正しいメールアドレスを入力してください');
        hasError = true;
    }
    
    if (!phone) {
        showFieldError('phone', 'お電話番号を入力してください');
        hasError = true;
    } else if (!isValidPhone(phone)) {
        showFieldError('phone', '正しい電話番号を入力してください（ハイフンあり・なし両方可）');
        hasError = true;
    }
    
    if (!inquiry) {
        showFieldError('inquiry', 'お問い合わせ種別を選択してください');
        hasError = true;
    }
    
    if (!message) {
        showFieldError('message', 'お問い合わせ内容を入力してください');
        hasError = true;
    }
    
    if (!privacy) {
        showFieldError('privacy', 'プライバシーポリシーに同意してください');
        hasError = true;
    }
    
    if (hasError) {
        return;
    }
    
    // 送信処理（実際の実装では適切なエンドポイントに送信）
    console.log('お問い合わせ送信:', {
        name, email, phone, inquiry, message
    });
    
    // 成功メッセージ表示
    showSuccessMessage('お問い合わせを受け付けました。担当者より後日ご連絡いたします。');
    
    // フォームリセット
    form.reset();
}

// バリデーション関数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // ハイフンあり・なし両方に対応
    const phoneRegex = /^(0\d{1,4}-?\d{1,4}-?\d{3,4}|0\d{9,11})$/;
    return phoneRegex.test(phone.replace(/-/g, ''));
}

// エラーメッセージ表示
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc2626';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#dc2626';
    }
}

// エラーメッセージクリア
function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '';
    });
}

// 成功メッセージ表示
function showSuccessMessage(message) {
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background-color: #dcfce7;
        border: 1px solid #16a34a;
        color: #166534;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        font-weight: 500;
    `;
    
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(successDiv, form);
        
        // 5秒後に自動削除
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }
}

// スクロールアニメーション設定
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素の監視
    const animationTargets = document.querySelectorAll('.step, .contact-method, .loan-explanation-visual, .info-bubble');
    animationTargets.forEach(target => {
        observer.observe(target);
    });
}

// スムーズスクロール設定
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});