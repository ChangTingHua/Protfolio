// 1. 頂部滾動進度條
const progress = document.querySelector('#progress');

function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
}

addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// 2. 視口滾動揭露動畫 (Intersection Observer)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. 作品類別篩選按鈕 (Filter Buttons)
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all') {
        card.hidden = false;
      } else {
        card.hidden = card.dataset.category !== filter;
      }
    });
  });
});

// 4. 專案 Case Study、美甲與履歷表彈窗（Modal）機制
function openModal(modalId) {
  const targetModal = document.getElementById(modalId);
  if (targetModal) {
    targetModal.classList.add('is-active');
    targetModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
}

function closeModal(modal) {
  modal.classList.remove('is-active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

// 綁定作品卡片點擊事件
document.querySelectorAll('.project-card[data-modal]').forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.dataset.modal;
    if (modalId) openModal(modalId);
  });
});

// 綁定按鈕與目錄觸發彈窗事件（例如：點擊查看履歷表、目錄 05 美甲等）
document.querySelectorAll('[data-trigger-modal]').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = trigger.dataset.triggerModal;
    if (modalId) openModal(modalId);
  });
});

// 綁定關閉按鈕與背景點擊事件
document.querySelectorAll('[data-close]').forEach(element => {
  element.addEventListener('click', (e) => {
    const modal = e.target.closest('.modal');
    if (modal) closeModal(modal);
  });
});

// 按 Esc 鍵關閉彈窗
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.is-active');
    if (activeModal) closeModal(activeModal);
  }
});
