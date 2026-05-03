document.addEventListener('DOMContentLoaded', () => {
  // Sidebar navigation toggling (Mock)
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Allow link redirects to happen if they have onclick set inline
      // Otherwise, just handle visual active state
      if (!item.hasAttribute('onclick')) {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // Action Buttons Ripple Effect (Micro-interaction)
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      let ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Progress Bar Animation
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
  
  // Chat Input Focus styling (if exists)
  const chatInput = document.querySelector('.chat-input-box input');
  if(chatInput) {
    chatInput.addEventListener('focus', () => {
      chatInput.parentElement.style.boxShadow = '0 0 0 2px var(--accent-primary-glow)';
    });
    chatInput.addEventListener('blur', () => {
      chatInput.parentElement.style.boxShadow = 'var(--shadow-lg)';
    });
  }
});

// Append ripple css dynamically to avoid cluttering main css
const style = document.createElement('style');
style.textContent = `
  .btn { position: relative; overflow: hidden; }
  .ripple {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-anim 600ms linear;
    pointer-events: none;
    width: 100px;
    height: 100px;
    margin-top: -50px;
    margin-left: -50px;
  }
  @keyframes ripple-anim {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);
