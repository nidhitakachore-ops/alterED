(function () {
  'use strict';

  const ROLE_KEY = 'alterED_role';
  const DEFAULT_ROLE = 'student';

  const pageRoles = {
    'index.html': ['student', 'faculty', 'admin'],
    'student.html': ['student', 'admin'],
    'timetable.html': ['student', 'faculty', 'admin'],
    'attendance.html': ['student', 'admin'],
    'notification.html': ['student', 'faculty', 'admin'],
    'exam.html': ['student', 'faculty', 'admin'],
    'faculty.html': ['faculty', 'admin'],
    'admin.html': ['admin'],
    'about.html': ['student', 'faculty', 'admin'],
    'contact.html': ['student', 'faculty', 'admin'],
    'login.html': ['student', 'faculty', 'admin'],
    'register.html': ['student', 'faculty', 'admin']
  };

  function getRole() {
    const saved = localStorage.getItem(ROLE_KEY);
    return ['student', 'faculty', 'admin'].includes(saved) ? saved : DEFAULT_ROLE;
  }

  function setRole(role) {
    if (['student', 'faculty', 'admin'].includes(role)) {
      localStorage.setItem(ROLE_KEY, role);
    }
  }

  function roleLabel(role) {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

  function currentPage() {
    const file = location.pathname.split('/').pop();
    return file || 'index.html';
  }

  function isAllowed(role, page) {
    return (pageRoles[page] || ['student']).includes(role);
  }

  function applyRoleAccess() {
    const role = getRole();
    const page = currentPage();

    document.documentElement.dataset.role = role;
    document.body.dataset.role = role;

    document.querySelectorAll('.nav-link[data-roles]').forEach(link => {
      const allowed = (link.dataset.roles || '').split(/\s+/).filter(Boolean);
      const visible = allowed.includes(role);
      link.hidden = !visible;
      link.setAttribute('aria-hidden', String(!visible));
    });

    document.querySelectorAll('[data-role-only]').forEach(el => {
      const allowed = (el.dataset.roleOnly || '').split(/\s+/).filter(Boolean);
      el.hidden = !allowed.includes(role);
    });

    const roleName = roleLabel(role);
    document.querySelectorAll('#profileRole').forEach(el => el.textContent = roleName);
    document.querySelectorAll('#profileScope').forEach(el => {
      el.textContent = role === 'admin' ? 'Admin Portal' : role === 'faculty' ? 'Faculty Portal' : 'Student Portal';
    });

    // Protect role-specific pages even when someone types the URL manually.
    if (!['login.html', 'register.html'].includes(page) && !isAllowed(role, page)) {
      location.replace(role === 'admin' ? 'admin.html' : role === 'faculty' ? 'faculty.html' : 'student.html');
      return;
    }

    // Active navigation item.
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page && !link.hidden);
    });
  }

  function initDate() {
    const date = document.getElementById('currentDate');
    if (date) {
      date.textContent = new Date().toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
      });
    }
  }

  function initAI() {
    const aiButton = document.getElementById('voiceAssistantButton');
    const aiBox = document.getElementById('aiResponseBox');
    const aiTitle = document.getElementById('aiResponseTitle');
    const aiText = document.getElementById('aiResponseText');
    const closeAI = document.getElementById('closeAI');

    if (!aiButton || !aiBox) return;

    aiButton.addEventListener('click', function () {
      if (aiTitle) aiTitle.textContent = 'Hello Student! ✦';
      if (aiText) aiText.textContent = 'Your next lecture is SQL at 10:30 AM in Room 302. Computer Networks is at 12:00 PM in Room 201, and AI at 2:00 PM has an alternate faculty arrangement.';
      aiBox.classList.add('show');
      aiBox.style.display = 'flex';
    });

    if (closeAI) closeAI.addEventListener('click', () => {
      aiBox.classList.remove('show');
      setTimeout(() => { if (!aiBox.classList.contains('show')) aiBox.style.display = 'none'; }, 220);
    });
  }

  function initQR() {
    const qr = document.getElementById('qrButton');
    const message = document.getElementById('qrMessage');
    if (qr && message) {
      qr.addEventListener('click', () => {
        message.textContent = 'QR scanner interface opened. Connect the backend/camera service here for live validation.';
      });
    }
  }

  function initAuth() {
    const login = document.getElementById('loginForm');
    if (login) {
      const roleSelect = document.getElementById('loginRole');
      if (roleSelect) roleSelect.value = getRole();
      const loginRoleTitle = document.getElementById('loginRoleTitle');
      const syncLoginRoleTitle = () => {
        if (loginRoleTitle && roleSelect) {
          loginRoleTitle.textContent = roleLabel(roleSelect.value);
        }
      };
      if (roleSelect) {
        roleSelect.addEventListener('change', syncLoginRoleTitle);
        syncLoginRoleTitle();
      }

      login.addEventListener('submit', function (event) {
        event.preventDefault();
        const role = roleSelect ? roleSelect.value : 'student';
        setRole(role);
        const msg = document.getElementById('loginMessage');
        if (msg) msg.textContent = `${roleLabel(role)} login successful for this demo. Opening portal…`;
        setTimeout(() => {
          location.href = role === 'admin' ? 'admin.html' : role === 'faculty' ? 'faculty.html' : 'student.html';
        }, 450);
      });
    }

    const register = document.getElementById('registerForm');
    if (register) {
      register.addEventListener('submit', function (event) {
        event.preventDefault();
        setRole('student');
        const msg = document.getElementById('registerMessage');
        if (msg) msg.textContent = 'Registration complete for this demo. Redirecting to login…';
        setTimeout(() => { location.href = 'login.html'; }, 650);
      });
    }
  }

  function initLogout() {
    const button = document.getElementById('logoutButton');
    if (!button) return;
    button.addEventListener('click', function () {
      localStorage.removeItem(ROLE_KEY);
      location.href = 'login.html';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyRoleAccess();
    initDate();
    initAI();
    initQR();
    initAuth();
    initLogout();
  });
})();
