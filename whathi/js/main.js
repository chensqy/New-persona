/**
 * 个人主页 - 主JavaScript文件
 * 包含以下功能:
 * 1. 粒子背景效果
 * 2. 导航栏滚动效果
 * 3. 移动端菜单切换
 * 4. 平滑滚动
 * 5. 表单验证和提交
 * 6. 页面加载动画
 * 7. 项目卡片交互
 * 8. 主题切换(可选)
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==================== 1. 粒子背景效果 ====================
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = window.innerWidth < 768 ? 30 : 80;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // 随机属性
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = Math.random() * 0.5 + 0.1;
            const animationDuration = Math.random() * 30 + 10;
            const animationDelay = Math.random() * 10;
            const animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse';
            
            // 应用样式
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${opacity};
                animation-duration: ${animationDuration}s;
                animation-delay: -${animationDelay}s;
                animation-direction: ${animationDirection};
                background-color: ${i % 3 === 0 ? '#8b5cf6' : (i % 2 === 0 ? '#4f46e5' : '#6366f1')};
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    // ==================== 2. 导航栏滚动效果 ====================
    function setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        let lastScrollPosition = 0;
        
        window.addEventListener('scroll', function() {
            const currentScrollPosition = window.scrollY;
            
            // 向下滚动时隐藏导航栏
            if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
                navbar.style.top = '-70px';
            } else {
                navbar.style.top = '0';
            }
            
            // 添加滚动样式
            if (currentScrollPosition > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollPosition = currentScrollPosition;
        });
    }

    // ==================== 3. 移动端菜单切换 ====================
    function setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        if (!menuToggle || !navLinks) return;
        
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // 切换图标
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击链接后关闭菜单
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // ==================== 4. 平滑滚动 ====================
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 更新URL哈希(不触发跳转)
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // ==================== 5. 表单验证和提交 ====================
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单元素
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // 验证表单
            let isValid = true;
            
            // 验证姓名
            if (nameInput.value.trim() === '') {
                showError(nameInput, '请输入您的姓名');
                isValid = false;
            } else {
                clearError(nameInput);
            }
            
            // 验证邮箱
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, '请输入有效的邮箱地址');
                isValid = false;
            } else {
                clearError(emailInput);
            }
            
            // 验证消息
            if (messageInput.value.trim() === '') {
                showError(messageInput, '请输入您的消息');
                isValid = false;
            } else {
                clearError(messageInput);
            }
            
            if (isValid) {
                // 禁用提交按钮防止重复提交
                submitButton.disabled = true;
                submitButton.textContent = '发送中...';
                
                // 模拟表单提交(实际项目中替换为AJAX请求)
                setTimeout(function() {
                    // 显示成功消息
                    showSuccessMessage('消息发送成功！感谢您的联系。');
                    
                    // 重置表单
                    contactForm.reset();
                    
                    // 恢复按钮状态
                    submitButton.disabled = false;
                    submitButton.textContent = '发送消息';
                }, 1500);
            }
        });
        
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            if (!formGroup) return;
            
            let errorElement = formGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            formGroup.classList.add('has-error');
        }
        
        function clearError(input) {
            const formGroup = input.closest('.form-group');
            if (!formGroup) return;
            
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            
            formGroup.classList.remove('has-error');
        }
        
        function showSuccessMessage(message) {
            // 移除现有的成功消息
            const existingMessage = document.querySelector('.success-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // 创建并显示新消息
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = message;
            
            contactForm.insertBefore(successMessage, contactForm.firstChild);
            
            // 3秒后淡出
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 3000);
        }
    }

    // ==================== 6. 页面加载动画 ====================
    function setupPageLoadAnimation() {
        // 添加加载完成类，触发CSS动画
        document.body.classList.add('loaded');
        
        // 延迟加载图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.onload = function() {
                img.style.opacity = '1';
            };
        });
    }

    // ==================== 7. 项目卡片交互 ====================
    function setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length === 0) return;
        
        projectCards.forEach(card => {
            // 点击项目卡片
            card.addEventListener('click', function(e) {
                // 如果不是点击链接，则打开项目详情
                if (!e.target.closest('a')) {
                    const link = card.querySelector('.project-link');
                    if (link) {
                        window.open(link.href, '_blank');
                    }
                }
            });
            
            // 鼠标悬停效果
            card.addEventListener('mouseenter', function() {
                const img = card.querySelector('.project-image img');
                if (img) {
                    img.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const img = card.querySelector('.project-image img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }

    // ==================== 8. 主题切换(可选) ====================
    function setupThemeSwitcher() {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = '切换主题';
        
        document.body.appendChild(themeToggle);
        
        // 检查本地存储中的主题偏好
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // 切换主题
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // ==================== 初始化所有功能 ====================
    initParticles();
    setupNavbarScroll();
    setupMobileMenu();
    setupSmoothScrolling();
    setupContactForm();
    setupPageLoadAnimation();
    setupProjectCards();
    
    // 如果需要主题切换功能，取消下面这行的注释
    // setupThemeSwitcher();
    
    // ==================== 控制台信息 ====================
    console.log('%c欢迎访问我的个人主页!', 'color: #4f46e5; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML5, CSS3 and JavaScript', 'color: #94a3b8; font-size: 14px;');
});
