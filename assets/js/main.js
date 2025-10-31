/**
* Template Name: iLanding
* Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
* Updated: Nov 12 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// =====================
// New Navbar Functionality
// =====================

// DOM Elements
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
const categoryItems = document.querySelectorAll('.category-item');
const subcategoryItems = document.querySelectorAll('.subcategory-item');

// State management
let isDropdownOpen = false;
let activeDropdown = null;
let activeCategory = null;

// Initialize the menubar
document.addEventListener('DOMContentLoaded', function() {
    initializeMenubar();
});

function initializeMenubar() {
    // Add event listeners
    setupDropdownToggles();
    setupCategoryInteractions();
    setupClickOutside();
    setupKeyboardNavigation();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize default submenu visibility
    initializeDefaultSubmenu();
}

function initializeDefaultSubmenu() {
    // Show AI & Automation submenu by default since it's active
    const aiAutomationSubmenu = document.getElementById('ai-automation-submenu');
    if (aiAutomationSubmenu) {
        aiAutomationSubmenu.style.display = 'flex';
        aiAutomationSubmenu.classList.remove('hidden');
    }
}

// Dropdown toggle functionality
function setupDropdownToggles() {
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownId = this.getAttribute('data-dropdown');
            toggleDropdown(dropdownId);
        });
    });
}

function toggleDropdown(dropdownId) {
    const targetDropdown = document.getElementById(`${dropdownId}-dropdown`);
    
    // Close all other dropdowns
    dropdownMenus.forEach(menu => {
        if (menu !== targetDropdown) {
            closeDropdown(menu);
        }
    });
    
    // Toggle target dropdown
    if (activeDropdown === targetDropdown) {
        closeDropdown(targetDropdown);
    } else {
        openDropdown(targetDropdown);
    }
}

function openDropdown(dropdown) {
    if (dropdown) {
        dropdown.classList.add('active');
        dropdown.style.display = 'block';
        
        // Update active state
        const toggle = document.querySelector(`[data-dropdown="${dropdown.id.replace('-dropdown', '')}"]`);
        if (toggle) {
            toggle.parentElement.classList.add('active');
        }
        
        activeDropdown = dropdown;
        isDropdownOpen = true;
        
        // Add smooth animation
        requestAnimationFrame(() => {
            dropdown.style.opacity = '1';
            dropdown.style.transform = 'translateY(0)';
        });
    }
}

function closeDropdown(dropdown) {
    if (dropdown) {
        dropdown.classList.remove('active');
        
        // Update active state
        const toggle = document.querySelector(`[data-dropdown="${dropdown.id.replace('-dropdown', '')}"]`);
        if (toggle) {
            toggle.parentElement.classList.remove('active');
        }
        
        // Hide dropdown after animation
        setTimeout(() => {
            if (!dropdown.classList.contains('active')) {
                dropdown.style.display = 'none';
            }
        }, 400);
        
        if (activeDropdown === dropdown) {
            activeDropdown = null;
            isDropdownOpen = false;
        }
    }
}

// Category interactions
function setupCategoryInteractions() {
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (isDropdownOpen) {
                setActiveCategory(item);
            }
        });
        
        item.addEventListener('click', function(e) {
            const link = this.querySelector('.category-link');
            if (link) {
                // Check if the link has an href (not "#" or empty)
                const href = link.getAttribute('href');
                if (href && href !== '#' && href !== '') {
                    // Allow navigation to the page
                    window.location.href = href;
                } else {
                    // Prevent default only if there's no valid href
                    e.preventDefault();
                    if (isDropdownOpen) {
                        setActiveCategory(item);
                    }
                }
            } else {
                e.preventDefault();
                if (isDropdownOpen) {
                    setActiveCategory(item);
                }
            }
        });
    });
    
    // Subcategory interactions
    subcategoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const link = this.querySelector('.subcategory-link');
            if (link) {
                // Check if the link has an href (not "#" or empty)
                const href = link.getAttribute('href');
                if (href && href !== '#' && href !== '') {
                    // Allow navigation to the page
                    window.location.href = href;
                } else {
                    // Prevent default only if there's no valid href
                    e.preventDefault();
                    handleSubcategoryClick(link.textContent);
                }
            }
        });
    });
}

function setActiveCategory(item) {
    // Remove active class from all items in the same column
    const column = item.closest('.category-column');
    if (column) {
        const itemsInColumn = column.querySelectorAll('.category-item');
        itemsInColumn.forEach(catItem => {
            catItem.classList.remove('active');
        });
    }
    
    // Add active class to current item
    item.classList.add('active');
    activeCategory = item;
    
    // Update subcategory visibility based on selection
    updateSubcategoryVisibility(item);
}

function updateSubcategoryVisibility(activeItem) {
    const submenuType = activeItem.getAttribute('data-submenu');
    
    // Hide all subcategory columns
    const allSubcategoryColumns = document.querySelectorAll('.subcategory-column');
    allSubcategoryColumns.forEach(column => {
        column.style.display = 'none';
        column.classList.add('hidden');
    });
    
    // Show the selected subcategory column
    const targetSubmenu = document.getElementById(`${submenuType}-submenu`);
    if (targetSubmenu) {
        targetSubmenu.style.display = 'flex';
        targetSubmenu.classList.remove('hidden');
        
        // Add smooth animation
        requestAnimationFrame(() => {
            targetSubmenu.style.opacity = '1';
        });
    }
}

function handleSubcategoryClick(subcategoryName) {
    // Show notification for demo purposes
    showNotification(`Selected: ${subcategoryName}`);
    
    // Here you would typically navigate to the actual page
    console.log('Navigating to subcategory:', subcategoryName);
}

// Click outside to close
function setupClickOutside() {
    document.addEventListener('click', function(e) {
        const isClickInsideDropdown = Array.from(dropdownMenus).some(menu => 
            menu.contains(e.target)
        );
        const isClickOnToggle = Array.from(dropdownToggles).some(toggle => 
            toggle.contains(e.target)
        );
        
        if (!isClickInsideDropdown && !isClickOnToggle && isDropdownOpen) {
            closeAllDropdowns();
        }
    });
}

function closeAllDropdowns() {
    dropdownMenus.forEach(menu => {
        closeDropdown(menu);
    });
    
    // Remove active states
    dropdownToggles.forEach(toggle => {
        toggle.parentElement.classList.remove('active');
    });
    
    isDropdownOpen = false;
    activeDropdown = null;
    activeCategory = null;
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isDropdownOpen) {
            closeAllDropdowns();
        }
        
        // Arrow key navigation for categories
        if (isDropdownOpen && activeDropdown) {
            const currentColumn = activeCategory?.closest('.category-column');
            if (currentColumn) {
                const items = Array.from(currentColumn.querySelectorAll('.category-item'));
                const currentIndex = items.indexOf(activeCategory);
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        navigateCategories(items, currentIndex, 'down');
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        navigateCategories(items, currentIndex, 'up');
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        navigateToNextColumn();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        navigateToPreviousColumn();
                        break;
                }
            }
        }
    });
}

function navigateCategories(items, currentIndex, direction) {
    let newIndex = currentIndex;
    
    if (direction === 'down') {
        newIndex = Math.min(currentIndex + 1, items.length - 1);
    } else if (direction === 'up') {
        newIndex = Math.max(currentIndex - 1, 0);
    }
    
    if (newIndex !== currentIndex) {
        const newCategory = items[newIndex];
        setActiveCategory(newCategory);
        
        // Scroll into view if needed
        newCategory.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function navigateToNextColumn() {
    const columns = document.querySelectorAll('.category-column');
    const currentColumn = activeCategory?.closest('.category-column');
    const currentColumnIndex = Array.from(columns).indexOf(currentColumn);
    
    if (currentColumnIndex < columns.length - 1) {
        const nextColumn = columns[currentColumnIndex + 1];
        const firstItem = nextColumn.querySelector('.category-item');
        if (firstItem) {
            setActiveCategory(firstItem);
        }
    }
}

function navigateToPreviousColumn() {
    const columns = document.querySelectorAll('.category-column');
    const currentColumn = activeCategory?.closest('.category-column');
    const currentColumnIndex = Array.from(columns).indexOf(currentColumn);
    
    if (currentColumnIndex > 0) {
        const prevColumn = columns[currentColumnIndex - 1];
        const firstItem = prevColumn.querySelector('.category-item');
        if (firstItem) {
            setActiveCategory(firstItem);
        }
    }
}

// Animation initialization
function initializeAnimations() {
    // Add staggered animation to category items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
                entry.target.classList.add('animate-in');
            }
        });
    });
    
    // Observe category items
    categoryItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observe subcategory items
    subcategoryItems.forEach(item => {
        observer.observe(item);
    });
}

// Utility functions
function showNotification(message) {
    // Create a modern notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="notification-text">${message}</div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        z-index: 10000;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        overflow: hidden;
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            gap: 12px;
        }
        .notification-icon {
            color: #00d4aa;
            font-size: 20px;
        }
        .notification-text {
            flex: 1;
            color: #1a1a1a;
            font-size: 14px;
        }
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        .notification-close:hover {
            background: #f0f0f0;
            color: #1a1a1a;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .animate-in {
            animation: fadeInUp 0.5s ease forwards;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 4000);
}

// Export functions for potential external use
window.KriraAIMenubar = {
    toggleDropdown,
    openDropdown,
    closeDropdown,
    closeAllDropdowns,
    setActiveCategory,
    showNotification
};
