// Dynamic Admin Navbar/Menu
const adminNavLinks = [
  { name: 'Dashboard', href: 'index.html' },
  { name: 'Products', href: 'products.html' },
  { name: 'Members', href: 'members.html' },
  { name: 'Sold Items', href: 'sold.html' },
  { name: 'Visitor Stats', href: 'visitors.html' },
];

function renderAdminNavbar() {
  const current = window.location.pathname.split('/').pop();
  const nav = document.getElementById('admin-navbar');
  if (!nav) return;
  nav.innerHTML = `
    <nav class="navbar bg-dark navbar-dark">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Admin Dashboard</span>
        <ul class="navbar-nav flex-row">
          ${adminNavLinks.map(link => `
            <li class="nav-item mx-2">
              <a class="nav-link${link.href === current ? ' active' : ''}" href="${link.href}">${link.name}</a>
            </li>
          `).join('')}
        </ul>
      </div>
    </nav>
  `;
}

document.addEventListener('DOMContentLoaded', renderAdminNavbar); 