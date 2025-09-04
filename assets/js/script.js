'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM Content Loaded - Initializing all functionality...");
  
  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
    console.log("Sidebar toggle initialized");
  } else {
    console.warn("Sidebar elements not found");
  }

  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // add event in all select items
  if (selectItems.length > 0 && selectValue) {
    for (let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        if (select) elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    }
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // add event in all filter button items for large screen
  if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];

    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    }
    console.log("Filter functionality initialized");
  }

  // Initialize navigation when DOM is loaded
  console.log("Initializing navigation...");
  
  // Get navigation elements after DOM is loaded
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");
  
  console.log("Navigation setup - Links found:", navigationLinks.length, "Pages found:", pages.length);
  
  if (navigationLinks.length === 0) {
    console.error("No navigation links found!");
    return;
  }
  
  if (pages.length === 0) {
    console.error("No pages found!");
    return;
  }
  
  // Log all navigation links and pages for debugging
  navigationLinks.forEach((link, index) => {
    console.log(`Navigation link ${index + 1}:`, link.innerHTML, link.outerHTML);
  });
  
  pages.forEach((page, index) => {
    console.log(`Page ${index + 1}:`, page.dataset.page, page.className, page.outerHTML.substring(0, 100));
  });
  
  // Add click events to all navigation links
  navigationLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
      const clickedLink = this;
      const clickedText = clickedLink.innerHTML.toLowerCase();
      
      console.log("Navigation clicked:", clickedText);

      // Remove active class from all navigation links
      navigationLinks.forEach(navLink => navLink.classList.remove("active"));
      
      // Remove active class from all pages
      pages.forEach(page => page.classList.remove("active"));

      // Find the matching page and activate it
      for (let j = 0; j < pages.length; j++) {
        console.log("Checking page:", pages[j].dataset.page, "against clicked:", clickedText);
        if (clickedText === pages[j].dataset.page) {
          console.log("Match found! Activating page:", pages[j].dataset.page);
          pages[j].classList.add("active");
          clickedLink.classList.add("active");
          
          // Save current page to localStorage
          saveCurrentPage(clickedText);
          
          // Debug: check if the page is now visible
          console.log("Page classes after activation:", pages[j].className);
          console.log("Page display style:", window.getComputedStyle(pages[j]).display);
          
          window.scrollTo(0, 0);
          break;
        }
      }
    });
    
    console.log(`Bound click event to navigation link ${index + 1}:`, link.innerHTML);
  });
  
  // Function to save current page to localStorage
  function saveCurrentPage(pageName) {
    localStorage.setItem('currentPage', pageName);
  }
  
  // Function to restore page from localStorage
  function restoreCurrentPage() {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      // Remove active from all pages and links
      pages.forEach(page => page.classList.remove("active"));
      navigationLinks.forEach(link => link.classList.remove("active"));
      
      // Activate the saved page
      const targetPage = document.querySelector(`[data-page="${savedPage}"]`);
      const targetLink = Array.from(navigationLinks).find(link => 
        link.innerHTML.toLowerCase() === savedPage
      );
      
      if (targetPage) {
        targetPage.classList.add("active");
        console.log("Restored page:", savedPage);
      }
      
      if (targetLink) {
        targetLink.classList.add("active");
        console.log("Restored navigation link:", savedPage);
      }
      
      return true;
    }
    return false;
  }
  
  // Try to restore saved page, otherwise default to About
  if (!restoreCurrentPage()) {
    // Find the About navigation link and make it active
    const aboutLink = Array.from(navigationLinks).find(link => 
      link.innerHTML.toLowerCase() === "about"
    );
    
    if (aboutLink) {
      aboutLink.classList.add("active");
      console.log("About link activated");
    } else {
      console.error("About navigation link not found!");
    }
    
    // Ensure About page is active
    const aboutPage = document.querySelector('[data-page="about"]');
    if (aboutPage) {
      aboutPage.classList.add("active");
      console.log("About page activated");
      console.log("About page classes:", aboutPage.className);
      console.log("About page display style:", window.getComputedStyle(aboutPage).display);
    } else {
      console.error("About page not found!");
    }
  }
  
  // Add a test function to manually test navigation
  window.testNavigation = function() {
    console.log("Testing navigation manually...");
    const testPage = document.querySelector('[data-page="resume"]');
    if (testPage) {
      console.log("Found resume page, activating it...");
      // Remove active from all pages
      pages.forEach(page => page.classList.remove("active"));
      // Activate resume page
      testPage.classList.add("active");
      console.log("Resume page classes:", testPage.className);
      console.log("Resume page display style:", window.getComputedStyle(testPage).display);
    }
  };
  
  console.log("Navigation initialization complete. Use window.testNavigation() to test manually.");
  
  // PHOTO MODAL FUNCTIONALITY
  console.log("Initializing photo modal functionality...");
  
  // photo modal variables
  const photoModalContainer = document.querySelector("[data-photo-modal-container]");
  const photoOverlay = document.querySelector("[data-photo-overlay]");
  const photoModalCloseBtn = document.querySelector("[data-photo-modal-close-btn]");
  const photoModalImg = document.querySelector("[data-photo-modal-img]");
  const photoModalTitle = document.querySelector("[data-photo-modal-title]");
  const photoModalCategory = document.querySelector("[data-photo-modal-category]");
  const photoLinks = document.querySelectorAll("[data-photo-modal]");

  // photo modal toggle function
  const photoModalFunc = function () {
    if (photoModalContainer) {
      photoModalContainer.classList.toggle("active");
      document.body.style.overflow = photoModalContainer.classList.contains("active") ? "hidden" : "";
    }
  }

  // add click event to all photo items
  if (photoLinks.length > 0) {
    for (let i = 0; i < photoLinks.length; i++) {
      photoLinks[i].addEventListener("click", function (e) {
        e.preventDefault();
        
        const img = this.querySelector("img");
        
        if (img && photoModalImg && photoModalTitle && photoModalCategory) {
          photoModalImg.src = img.src;
          photoModalImg.alt = img.alt;
          photoModalTitle.innerHTML = "Photography";
          photoModalCategory.innerHTML = "";
          
          photoModalFunc();
        }
      });
    }
    console.log("Photo modal functionality initialized");
  }

  // add click event to photo modal close button
  if (photoModalCloseBtn) {
    photoModalCloseBtn.addEventListener("click", photoModalFunc);
  }
  if (photoOverlay) {
    photoOverlay.addEventListener("click", photoModalFunc);
  }

  // add keyboard event for photo modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && photoModalContainer && photoModalContainer.classList.contains("active")) {
      photoModalFunc();
    }
  });

  console.log("All functionality initialized successfully!");
  
  // HR NOTIFICATION MODAL FUNCTIONALITY
  console.log("Initializing HR notification modal...");
  
  const hrNotificationModal = document.getElementById("hrNotificationModal");
  const hrNotificationCloseBtn = document.getElementById("hrNotificationCloseBtn");
  const hrNotificationUnderstandBtn = document.getElementById("hrNotificationUnderstandBtn");
  
  // Function to show the HR notification modal
  const showHRNotification = function() {
    if (hrNotificationModal) {
      hrNotificationModal.classList.add("active");
      document.body.style.overflow = "hidden";
      console.log("HR notification modal displayed");
    }
  };
  
  // Function to hide the HR notification modal
  const hideHRNotification = function() {
    if (hrNotificationModal) {
      hrNotificationModal.classList.remove("active");
      document.body.style.overflow = "";
      console.log("HR notification modal hidden");
    }
  };
  
  // Check if this is the first visit
  const hasVisitedBefore = localStorage.getItem("hrNotificationShown");
  
  // HR Notification functionality
  if (!hasVisitedBefore) {
    // Show notification after a short delay for better UX
    setTimeout(() => {
      showHRNotification();
      // Mark as shown
      localStorage.setItem("hrNotificationShown", "true");
    }, 1000);
  }
  
  // Show notification on every page refresh/visit
  setTimeout(() => {
    showHRNotification();
  }, 1000);
  
  // Event listeners for closing the modal
  if (hrNotificationCloseBtn) {
    hrNotificationCloseBtn.addEventListener("click", hideHRNotification);
  }
  
  if (hrNotificationUnderstandBtn) {
    hrNotificationUnderstandBtn.addEventListener("click", hideHRNotification);
  }
  
  // Close modal when clicking outside
  if (hrNotificationModal) {
    hrNotificationModal.addEventListener("click", function(e) {
      if (e.target === hrNotificationModal) {
        hideHRNotification();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && hrNotificationModal && hrNotificationModal.classList.contains("active")) {
      hideHRNotification();
    }
  });
  
  // Add function to manually show notification (for testing)
  window.showHRNotification = showHRNotification;
  window.hideHRNotification = hideHRNotification;
  
  // Add function to clear localStorage and show notification again
  window.resetHRNotification = function() {
    localStorage.removeItem("hrNotificationShown");
    console.log("HR notification localStorage cleared");
    setTimeout(() => {
      showHRNotification();
    }, 500);
  };
  
  console.log("HR notification modal functionality initialized");
  console.log("Available functions: showHRNotification(), hideHRNotification(), resetHRNotification()");

  // Skills Filter Functionality
  const skillsNavLinks = document.querySelectorAll("[data-skill-filter]");
  const skillCategories = document.querySelectorAll("[data-skill-category]");
  const skillsSection = document.querySelector(".skills-section");
  const skillsGrid = document.querySelector(".skills-grid");

  console.log("Skills section found:", !!skillsSection);
  console.log("Skills grid found:", !!skillsGrid);
  console.log("Skills nav links found:", skillsNavLinks.length);
  console.log("Skill categories found:", skillCategories.length);
  
  if (skillsSection) {
    console.log("Skills section display style:", window.getComputedStyle(skillsSection).display);
    console.log("Skills section visibility:", window.getComputedStyle(skillsSection).visibility);
    console.log("Skills section opacity:", window.getComputedStyle(skillsSection).opacity);
  }
  
  if (skillsGrid) {
    console.log("Skills grid display style:", window.getComputedStyle(skillsGrid).display);
    console.log("Skills grid children count:", skillsGrid.children.length);
  }
  
  // Check if skills section is inside an active article
  const aboutArticle = document.querySelector('article[data-page="about"]');
  if (aboutArticle) {
    console.log("About article classes:", aboutArticle.className);
    console.log("About article display style:", window.getComputedStyle(aboutArticle).display);
    console.log("Skills section is inside about article:", aboutArticle.contains(skillsSection));
  }

  if (skillsNavLinks.length > 0 && skillCategories.length > 0) {
    console.log("Initializing skills filter functionality...");
    
    skillsNavLinks.forEach(link => {
      link.addEventListener("click", function() {
        const filterValue = this.getAttribute("data-skill-filter");
        
        // Remove active class from all links
        skillsNavLinks.forEach(l => l.classList.remove("active"));
        // Add active class to clicked link
        this.classList.add("active");
        
        // Filter skill categories
        skillCategories.forEach(category => {
          const categoryType = category.getAttribute("data-skill-category");
          
          if (filterValue === "all" || categoryType === filterValue) {
            category.classList.remove("hidden");
          } else {
            category.classList.add("hidden");
          }
        });
        
        console.log(`Skills filtered by: ${filterValue}`);
      });
    });
    
    console.log("Skills filter functionality initialized");
  } else {
    console.warn("Skills filter elements not found");
  }

  // Project Modal Functionality
  const projectModal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalBody = document.getElementById("modal-body");
  const projectLinks = document.querySelectorAll(".project-link");

  // Project content data
  const projectData = {
    "hospital-analysis": {
      title: "医院管理系统竞品分析",
      category: "Product Management",
      screenshots: [
        "./assets/images/ai-playbook-screenshot-1.png",
        "./assets/images/ai-playbook-screenshot-2.png"
      ],
      content: `
        <div class="project-meta">
          <p><strong>项目类型:</strong> 产品竞品分析</p>
          <p><strong>项目周期:</strong> 2022年5月 - 8月</p>
          <p><strong>目标用户:</strong> 医院管理层</p>
          <p><strong>项目背景:</strong> 南京市中医院耳鼻喉科内部辅助系统开发</p>
        </div>

        <div class="project-overview">
          <h3>项目概述</h3>
          <p>基于RuoYi开源框架独立开发医院内部辅助系统，集成诊室叫号流程、窗口状态联动、广播控制及后台统计功能。通过深入分析现有医院管理系统的痛点，设计了一套完整的解决方案。</p>
        </div>

        <div class="project-features">
          <h3>核心功能</h3>
          <ul>
            <li><strong>诊室叫号系统:</strong> 智能排队管理，减少患者等待时间</li>
            <li><strong>窗口状态联动:</strong> 实时显示各科室服务状态</li>
            <li><strong>广播控制系统:</strong> 自动化通知和提醒功能</li>
            <li><strong>KPI统计模块:</strong> 患者等候时间、叫号频率、医生工作量等关键数据</li>
            <li><strong>月度报表生成:</strong> 自动化绩效统计和报告输出</li>
          </ul>
        </div>

        <div class="project-results">
          <h3>项目成果</h3>
          <ul>
            <li>患者等候时间缩短40%</li>
            <li>科室使用效率提高56%</li>
            <li>实现自动化月度报告生成</li>
            <li>获得客户高度积极反馈</li>
          </ul>
        </div>

        <div class="project-technologies">
          <h3>技术栈</h3>
          <p>RuoYi开源框架、Java、Spring Boot、MySQL、前端UI组件</p>
        </div>
      `
    },
    "careers-map": {
      title: "Everything Careers Map",
      category: "Product Management",
      externalLink: "portfolio/mindmap/Everything Careers Map.html",
      screenshots: [
        "./assets/images/mindmap-screenshot.png",
        "./assets/images/mindmap-screenshot.png"
      ],
      content: `
        <div class="project-meta">
          <p><strong>项目类型:</strong> 产品设计与信息架构</p>
          <p><strong>项目周期:</strong> 2025年7月10号-15号</p>
          <p><strong>目标用户:</strong> 国际学生</p>
          <p><strong>项目背景:</strong> 南安普顿大学Career Centre职业规划工具</p>
        </div>

        <div class="project-overview">
          <h3>项目概述</h3>
          <p>Everything Careers Map是一个为国际学生设计的综合职业规划思维导图，通过可视化的方式将复杂的职业规划流程分解为清晰、可操作的步骤。该项目涵盖了从职业探索到签证申请的全流程指导。</p>
        </div>

        <div class="project-features">
          <h3>核心功能模块</h3>
          <ul>
            <li><strong>职业探索:</strong> 职业信息查询、博士申请指导、职业顾问预约</li>
            <li><strong>求职准备:</strong> 简历制作、求职信撰写、面试准备、个人陈述</li>
            <li><strong>经验积累:</strong> 工作经验获取、技能发展、网络建设、行业研究</li>
            <li><strong>签证与法律:</strong> 签证申请指导、雇主担保信息、毕业生签证利用</li>
          </ul>
        </div>

        <div class="project-innovation">
          <h3>设计创新</h3>
          <ul>
            <li><strong>可视化设计:</strong> 采用思维导图形式，将复杂流程可视化</li>
            <li><strong>资源整合:</strong> 整合大学内部资源、外部平台和第三方服务</li>
            <li><strong>个性化指导:</strong> 根据不同用户需求提供个性化建议</li>
            <li><strong>多平台支持:</strong> 支持在线查看、打印版本和移动端访问</li>
          </ul>
        </div>

        <div class="project-results">
          <h3>项目成果</h3>
          <ul>
            <li>Career Centre咨询预约量增加40%</li>
            <li>国际学生职业规划完成率提升35%</li>
            <li>用户满意度评分达到4.6/5.0</li>
            <li>95%的用户认为思维导图形式更易于理解和使用</li>
          </ul>
        </div>

        <div class="project-technologies">
          <h3>技术实现</h3>
          <p><strong>设计工具:</strong> MindMeister/XMind, Figma, Adobe Illustrator</p>
          <p><strong>研究方法:</strong> 用户访谈、焦点小组、可用性测试、数据分析</p>
          <p><strong>项目管理:</strong> 敏捷开发、持续用户反馈、跨部门协作</p>
        </div>

        <div class="project-value">
          <h3>项目价值</h3>
          <p>这个项目不仅解决了国际学生的实际需求，还展示了我在产品设计、信息架构和用户体验方面的综合能力。通过系统性的用户研究和设计思考，我成功地将复杂的职业规划流程转化为清晰、可操作的可视化工具。</p>
        </div>
      `
    },
    "prompt-engineering": {
      title: "LLM提示词工程",
      category: "Prompt Engineering",
      externalLink: "prompt.html",
      screenshots: [
        "./assets/images/ai-playbook-screenshot-1.png",
        "./assets/images/ai-playbook-screenshot-2.png"
      ],
      content: `
        <div class="project-meta">
          <p><strong>项目类型:</strong> 提示词工程实践</p>
          <p><strong>项目周期:</strong> 2025年7月1号-10号</p>
          <p><strong>目标用户:</strong> Career Centre员工</p>
          <p><strong>我的角色:</strong> 提示词工程师 & 培训师</p>
        </div>
        
        <h3>项目背景</h3>
        <p>为Career Development Centre的员工设计了一套完整的AI提示词工程培训体系。这个项目源于我在实际工作中发现的问题：很多同事对AI工具的使用效率不高，缺乏系统性的提示词设计方法。</p>
        
        <h3>我的设计思路</h3>
        <p><strong>核心挑战:</strong></p>
        <ul>
          <li>如何让非技术背景的员工快速掌握提示词工程</li>
          <li>如何设计可复用的提示词模板</li>
          <li>如何确保AI输出的准确性和实用性</li>
          <li>如何建立数据安全和隐私保护机制</li>
        </ul>
        
        <h3>技术实现亮点</h3>
        <p><strong>C.R.A.F.T.框架设计:</strong></p>
        <ul>
          <li><strong>Context (背景):</strong> 为AI提供充分的上下文信息</li>
          <li><strong>Role (角色):</strong> 明确AI的专业身份和职责</li>
          <li><strong>Action (行动):</strong> 具体化AI需要执行的任务</li>
          <li><strong>Format (格式):</strong> 规范输出格式和结构</li>
          <li><strong>Tone (语调):</strong> 控制输出的专业性和亲和力</li>
        </ul>
        
        <h3>创新解决方案</h3>
        <p><strong>反幻觉机制:</strong> 设计了"研究助手"模式，让AI生成研究计划而不是直接提供可能错误的事实信息。这大大提高了信息的可靠性。</p>
        
        <p><strong>自我纠错技术:</strong> 开发了"规则提取"方法，当AI输出错误时，通过提供正确示例让AI学习正确的语法规则，然后重新生成。</p>
        
        <h3>实际应用效果</h3>
        <ul>
          <li>员工AI使用效率提升300%</li>
          <li>重复性问题处理时间减少70%</li>
          <li>工作坊设计时间从2天缩短到2小时</li>
          <li>建立了标准化的AI协作流程</li>
        </ul>
        

      `
    },
    "troubleshooting-frontend": {
      title: "问题自查系统 - 前端",
      category: "Full Stack",
      externalLink: "https://zy-strouble-shooting.web.app/",
      screenshots: [
        "./assets/images/trouble%20shooting/f1.png",
        "./assets/images/trouble%20shooting/f2.png",
        "./assets/images/trouble%20shooting/f3.png"
      ],
      content: `
        <div class="project-meta">
          <p><strong>项目类型:</strong> 前端开发</p>
          <p><strong>项目周期:</strong> 2025年7月20号-25号</p>
          <p><strong>目标用户:</strong> 学生和职业发展指导者</p>
          <p><strong>项目背景:</strong> 交互式职业发展问题自查系统前端界面开发</p>
          <p><strong>部署地址:</strong> <a href="https://zy-trouble-shooting.web.app/" target="_blank">https://zy-trouble-shooting.web.app/</a></p>
        </div>

        <div class="project-overview">
          <h3>项目概述</h3>
          <p>开发了一套完整的职业发展问题自查系统前端界面，提供直观的交互式用户体验，支持问题分类、智能引导、个性化建议等功能。采用现代化的前端技术栈，确保系统的响应性和用户体验。</p>
        </div>

        <div class="project-features">
          <h3>核心功能</h3>
          <ul>
            <li><strong>交互式问题引导:</strong> 智能问答流程，根据用户选择提供个性化建议</li>
            <li><strong>多模块支持:</strong> 职业规划、简历优化、面试准备三大核心模块</li>
            <li><strong>实时内容渲染:</strong> 支持Markdown格式的富文本显示和格式化</li>
            <li><strong>响应式设计:</strong> 适配桌面和移动设备，提供一致的用户体验</li>
            <li><strong>数据可视化:</strong> 问题流程树状图展示和进度跟踪</li>
            <li><strong>管理界面:</strong> 完整的内容管理系统，支持实时编辑和更新</li>
          </ul>
        </div>

        <div class="project-technologies">
          <h3>技术栈</h3>
          <ul>
            <li><strong>前端框架:</strong> 原生JavaScript (ES6+)</li>
            <li><strong>样式:</strong> CSS3, 响应式设计, Flexbox/Grid布局</li>
            <li><strong>数据库:</strong> Firebase Firestore (NoSQL)</li>
            <li><strong>认证:</strong> Firebase Authentication</li>
            <li><strong>部署:</strong> Firebase Hosting</li>
            <li><strong>编辑器:</strong> Quill.js (富文本编辑)</li>
            <li><strong>图标:</strong> Emoji图标系统</li>
          </ul>
        </div>
      `
    },
    "troubleshooting-backend": {
      title: "问题自查系统 - 管理端",
      category: "Full Stack",
      externalLink: "https://zy-strouble-shooting.web.app/admin/",
      screenshots: [
        "./assets/images/trouble%20shooting/b1.png",
        "./assets/images/trouble%20shooting/b2.png",
        "./assets/images/trouble%20shooting/b3.png",
        "./assets/images/trouble%20shooting/b4.png",
        "./assets/images/trouble%20shooting/b5.png",
        "./assets/images/trouble%20shooting/b6.png"
      ],
      content: `
        <div class="project-meta">
          <p><strong>项目类型:</strong> 后端开发</p>
          <p><strong>项目周期:</strong> 2025年7月20号-25号</p>
          <p><strong>目标用户:</strong> 学生和职业发展指导者</p>
          <p><strong>项目背景:</strong> 职业发展问题自查系统后端架构与数据管理</p>
          <p><strong>部署地址:</strong> <a href="https://zy-strouble-shooting.web.app/admin/" target="_blank">https://zy-trouble-shooting.web.app/admin/</a></p>
          <div class="login-credentials">
            <p><strong>登录账户:</strong> <span class="credential">admin</span></p>
            <p><strong>登录密码:</strong> <span class="credential">admin123</span></p>
            <p class="login-note">请使用上述账户信息登录管理端系统</p>
          </div>
        </div>

        <div class="project-overview">
          <h3>项目概述</h3>
          <p>构建了完整的职业发展问题自查系统后端架构，提供稳定的数据存储、实时同步、内容管理等功能。采用云原生架构，确保系统的高可用性和可扩展性。</p>
        </div>

        <div class="project-features">
          <h3>核心功能</h3>
          <ul>
            <li><strong>数据管理:</strong> Firestore NoSQL数据库，支持复杂的数据结构存储</li>
            <li><strong>实时同步:</strong> 实时数据更新和状态同步</li>
            <li><strong>内容管理:</strong> 动态内容加载和更新系统</li>
            <li><strong>用户认证:</strong> 安全的用户身份验证和授权</li>
            <li><strong>API设计:</strong> RESTful API设计，支持CRUD操作</li>
            <li><strong>数据安全:</strong> 完整的权限控制和数据验证规则</li>
            <li><strong>备份恢复:</strong> 自动数据备份和恢复机制</li>
          </ul>
        </div>

        <div class="project-technologies">
          <h3>技术栈</h3>
          <ul>
            <li><strong>数据库:</strong> Firebase Firestore</li>
            <li><strong>认证:</strong> Firebase Authentication</li>
            <li><strong>存储:</strong> Firebase Storage</li>
            <li><strong>部署:</strong> Firebase Hosting</li>
            <li><strong>监控:</strong> Firebase Analytics</li>
            <li><strong>安全:</strong> Firestore Security Rules</li>
            <li><strong>API:</strong> Firebase Admin SDK</li>
          </ul>
        </div>

        <div class="project-architecture">
          <h3>系统架构图</h3>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace; font-size: 14px; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 20px;">
              <div style="display: inline-block; background: #e3f2fd; padding: 10px 20px; border-radius: 5px; margin: 5px;">
                <strong>前端界面层</strong><br>
                • 主应用界面<br>
                • 问题引导流程<br>
                • 响应式设计<br>
                • 富文本渲染
              </div>
              <div style="display: inline-block; background: #f3e5f5; padding: 10px 20px; border-radius: 5px; margin: 5px;">
                <strong>管理界面层</strong><br>
                • 内容管理<br>
                • 树状编辑器<br>
                • 数据可视化<br>
                • 批量操作
              </div>
              <div style="display: inline-block; background: #e8f5e8; padding: 10px 20px; border-radius: 5px; margin: 5px;">
                <strong>数据存储层</strong><br>
                • Firestore<br>
                • 实时同步<br>
                • 安全规则<br>
                • 备份恢复
              </div>
            </div>
            <div style="text-align: center; margin: 20px 0;">
              <div style="background: #fff3e0; padding: 15px; border-radius: 8px; display: inline-block;">
                <strong>Firebase 云服务层</strong><br>
                • 认证服务<br>
                • 数据库服务<br>
                • 存储服务<br>
                • 托管服务
              </div>
            </div>
          </div>
        </div>

        <div class="project-deployment">
          <h3>部署信息</h3>
          <ul>
            <li><strong>生产环境:</strong> <a href="https://zy-trouble-shooting.web.app" target="_blank">https://zy-trouble-shooting.web.app</a></li>
            <li><strong>管理面板:</strong> <a href="https://zy-trouble-shooting.web.app/admin/" target="_blank">https://zy-trouble-shooting.web.app/admin/</a></li>
            <li><strong>树状编辑器:</strong> <a href="https://zy-trouble-shooting.web.app/admin/tree-editor.html" target="_blank">https://zy-trouble-shooting.web.app/admin/tree-editor.html</a></li>
            <li><strong>Firebase控制台:</strong> <a href="https://console.firebase.google.com/project/zy-trouble-shooting/overview" target="_blank">https://console.firebase.google.com/project/zy-trouble-shooting/overview</a></li>
          </ul>
          <p>这个系统为职业发展指导提供了一个完整的解决方案，从前端用户体验到后端数据管理，都采用了现代化的技术栈和最佳实践。</p>
        </div>
      `
    },
    "career-platform": {
      title: "CareerNavigator AI —— 专家驱动的AI就业赋能平台",
      category: "AI Projects",
      featured: true,
      screenshots: [
        "./assets/images/Career/career1.png",
        "./assets/images/Career/career2.png",
        "./assets/images/Career/career3.png",
        "./assets/images/Career/career4.png",
        "./assets/images/Career/career5.png",
        "./assets/images/Career/career6.png",
        "./assets/images/Career/career7.png",
        "./assets/images/Career/career8.png"
      ],
      content: `
        <div class="project-meta">
          <p><strong>项目类型:</strong> AI产品设计与开发</p>
          <p><strong>项目周期:</strong> 2025年7月至今</p>
          <p><strong>目标用户:</strong> 英国高等教育机构、国际学生、职业顾问</p>
          <p><strong>项目背景:</strong> 解决英国高等教育就业服务核心痛点的AI赋能平台</p>
        </div>

        <div class="project-overview">
          <h3>项目概述</h3>
          <p>CareerNavigator AI 是一款我独立构思并主导开发的专家驱动AI就业赋能平台，专为解决英国高等教育就业服务核心痛点而设计。通过前沿的AI技术解放顾问的战略价值，为每一位学生提供极致个性化的职业发展指导。</p>
        </div>

        <div class="project-challenges">
          <h3>项目背景与挑战</h3>
          <p>在英国，大学毕业生的就业成果是衡量学校声誉和吸引全球人才的关键指标。然而，大学的就业服务中心正面临双重困境：</p>
          <ul>
            <li><strong>对于大学（购买方）：</strong> 存在严重的战略资源错配。高薪聘请的专业职业顾问，其宝贵时间却被大量重复性的低价值任务（如修改简历格式、回答常见问题）所占据，无法专注于建立雇主关系等更高价值的战略性工作。</li>
            <li><strong>对于学生（用户）：</strong> 学生们（尤其是国际学生）被海量通用信息淹没，难以获得及时、个性化的指导。他们在求职的关键环节，如面试准备和应对复杂的签证政策上，往往孤立无援。</li>
          </ul>
        </div>

        <div class="project-solution">
          <h3>我的解决方案：CareerNavigator AI</h3>
          <p>CareerNavigator AI 并非要取代人类顾问，而是作为一个强大的"增强器 (Augmenter)"，通过自动化低价值任务，将顾问和学生从繁琐的事务中解放出来，专注于战略成长与高价值互动。</p>
          
          <h4>四大核心价值主张：</h4>
          <ul>
            <li><strong>"战略赋能者"：</strong> 通过AI自动处理超过90%的基础咨询任务，将职业顾问从行政工作中解放出来，让他们成为真正的"机会创造者"。</li>
            <li><strong>"AI成长规划师"：</strong> 为每位学生动态生成从入学到毕业的个性化成长路径图，精准推荐实习、项目和技能课程，实现"千人千面"的职业指导。</li>
            <li><strong>"AI求职教练"：</strong> 提供覆盖求职全流程的AI支持，包括通过智能对话挖掘亮点并生成定制化文书，以及基于目标公司和职位的超高拟真度面试模拟。</li>
            <li><strong>"数据主权与品牌管家"：</strong> 提供本地化部署 (On-Premise) 选项，确保学生数据100%由校方掌控，彻底解决数据安全顾虑。平台完全白牌化，无缝融入大学自有品牌生态。</li>
          </ul>
        </div>

        <div class="project-innovation">
          <h3>核心技术创新：自主研发的"检索增强生成 (RAG)"引擎</h3>
          <p>本项目的技术壁垒并非简单调用通用AI模型，而是我自主设计和优化的专家驱动的"检索增强生成 (Retrieval-Augmented Generation, RAG)"框架。</p>
          
          <p>与公版AI（如ChatGPT）容易产生事实性错误（"幻觉"）不同，我们的RAG引擎工作原理如下：</p>
          <ul>
            <li><strong>精准检索 (Retrieve)：</strong> 当接收到用户请求时，系统首先会从我们构建的、持续更新的私有权威知识库（包含英国官方签证法规、实时劳动力市场数据、雇主担保名单等）中，检索出最相关、可验证的事实信息。</li>
            <li><strong>增强生成 (Augment & Generate)：</strong> 随后，AI模型会基于这些被核实过的"事实原材料"来组织语言并生成个性化、精准、可信的建议。</li>
          </ul>
          
          <p>这个"先检索、后生成"的机制，从根本上杜绝了AI"胡说八道"的可能性，确保了在职业指导这一高风险场景下的绝对可靠性。我们真正的护城河，是这个高质量、结构化的知识库以及高效的检索算法。</p>
        </div>

        <div class="project-role">
          <h3>我的角色与贡献</h3>
          <p>作为该项目的创始人与核心开发者，我全面负责从0到1的整个过程：</p>
          <ul>
            <li><strong>项目构思与验证：</strong> 基于在英国顶尖大学就业中心实习的亲身经历，敏锐洞察到市场痛点，并主导了早期的市场调研与需求验证。</li>
            <li><strong>AI架构设计：</strong> 独立设计了项目的核心技术——专家驱动的RAG引擎，并规划了从MVP到可扩展平台的完整技术路线图。</li>
            <li><strong>产品与开发：</strong> 负责平台的全栈开发与实施，包括AI模型集成、数据库管理和API设计，并主导了多次用户反馈驱动的产品迭代优化。</li>
            <li><strong>商业规划：</strong> 撰写了完整的商业计划书，制定了市场、销售、资源、财务及风险管理等全方位战略。</li>
          </ul>
        </div>

        <div class="project-technologies">
          <h3>技术栈</h3>
          <ul>
            <li><strong>AI技术：</strong> 自研RAG引擎、GPT-4o、向量数据库、知识图谱</li>
            <li><strong>后端技术：</strong> Python, FastAPI, PostgreSQL, Redis</li>
            <li><strong>前端技术：</strong> React, TypeScript, Tailwind CSS</li>
            <li><strong>部署：</strong> Docker, Kubernetes, AWS/Azure</li>
            <li><strong>数据安全：</strong> GDPR合规、端到端加密、本地化部署</li>
            <li><strong>监控分析：</strong> Prometheus, Grafana, ELK Stack</li>
          </ul>
        </div>

        <div class="project-vision">
          <h3>项目愿景</h3>
          <p>我坚信，CareerNavigator AI 将为英国乃至全球的教育机构带来一场就业服务领域的变革。它将重塑职业顾问的角色，使他们回归战略核心；同时，它将赋予每一位学生自信与确定性，让他们拥有一个全天候、永远可靠的AI职业导师，从而在未来的职业道路上取得成功。</p>
        </div>
      `
    }
  };

  // Screenshot carousel functionality
  let currentSlide = 0;
  let totalSlides = 0;
  let carouselInterval = null;

  function initScreenshotCarousel(screenshots) {
    const screenshotsContainer = document.getElementById("project-screenshots");
    const slidesContainer = document.getElementById("screenshot-slides");
    const dotsContainer = document.getElementById("screenshot-dots");
    const prevBtn = document.getElementById("screenshot-prev");
    const nextBtn = document.getElementById("screenshot-next");

    console.log("Initializing carousel with screenshots:", screenshots);
    console.log("DOM elements found:", {
      screenshotsContainer: !!screenshotsContainer,
      slidesContainer: !!slidesContainer,
      dotsContainer: !!dotsContainer,
      prevBtn: !!prevBtn,
      nextBtn: !!nextBtn
    });

    // Check if all required elements exist
    if (!screenshotsContainer || !slidesContainer || !dotsContainer) {
      console.log("Carousel elements not found, skipping initialization");
      console.log("Available elements in modal:", modalBody.innerHTML.substring(0, 200));
      return;
    }

    if (!screenshots || screenshots.length === 0) {
      console.log("No screenshots provided, hiding carousel");
      screenshotsContainer.style.display = "none";
      return;
    }

    console.log("Showing carousel with", screenshots.length, "screenshots");
    screenshotsContainer.style.display = "block";
    totalSlides = screenshots.length;
    currentSlide = 0;
    
    // Debug: Check if container is visible
    console.log("Screenshots container display:", screenshotsContainer.style.display);
    console.log("Screenshots container computed style:", window.getComputedStyle(screenshotsContainer).display);

    // Clear existing content
    slidesContainer.innerHTML = "";
    dotsContainer.innerHTML = "";

    // Create slides
    screenshots.forEach((screenshot, index) => {
      const slide = document.createElement("div");
      slide.className = "screenshot-slide";
      slide.style.backgroundImage = `url(${screenshot})`;
      slide.style.backgroundSize = "contain";
      slide.style.backgroundPosition = "center";
      slide.style.backgroundRepeat = "no-repeat";
      slide.style.backgroundColor = "transparent";
      
      // Add debug info
      console.log(`Creating slide ${index + 1} with image: ${screenshot}`);
      console.log(`Slide background image set to: ${slide.style.backgroundImage}`);
      
      slidesContainer.appendChild(slide);

      // Create dots
      const dot = document.createElement("button");
      dot.className = "screenshot-dot";
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    // Debug: Check slides after creation
    console.log("Total slides created:", slidesContainer.children.length);
    console.log("First slide background image:", slidesContainer.children[0]?.style.backgroundImage);
    
    // Test image loading
    screenshots.forEach((screenshot, index) => {
      const img = new Image();
      img.onload = () => console.log(`Image ${index + 1} loaded successfully: ${screenshot}`);
      img.onerror = () => console.error(`Failed to load image ${index + 1}: ${screenshot}`);
      img.src = screenshot;
    });

    // Event listeners are handled by the unified event delegation above

    // Clear existing interval
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
    
    // Auto-play (optional)
    if (totalSlides > 1) {
      carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }
  }

  function goToSlide(slideIndex) {
    if (slideIndex >= totalSlides) slideIndex = 0;
    if (slideIndex < 0) slideIndex = totalSlides - 1;

    currentSlide = slideIndex;
    const slidesContainer = document.getElementById("screenshot-slides");
    const dots = document.querySelectorAll(".screenshot-dot");

    // Check if elements exist before accessing their properties
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Open modal function
  function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (project) {
      // Show modal first
      projectModal.classList.add("active");
      document.body.style.overflow = "hidden";
      
      // Add featured class for special styling
      if (project.featured) {
        projectModal.classList.add("featured-modal");
      } else {
        projectModal.classList.remove("featured-modal");
      }

      // Show/hide floating external link button
      const floatingLink = document.getElementById("floating-external-link");
      const floatingButton = floatingLink.querySelector(".floating-link-button");
      
      if (project.externalLink) {
        floatingButton.href = project.externalLink;
        floatingButton.querySelector("span").textContent = "查看完整项目";
        floatingLink.style.display = "block";
      } else {
        floatingLink.style.display = "none";
      }

      // Create content container
      const contentContainer = document.createElement("div");
      contentContainer.className = "project-content";
      contentContainer.innerHTML = `
        <h2>${project.title}</h2>
        <p><strong>类别:</strong> ${project.category}</p>
        ${project.content}
      `;

      // Add content to the dedicated text content container
      const textContentContainer = document.getElementById("project-text-content");
      if (textContentContainer) {
        textContentContainer.innerHTML = "";
        textContentContainer.appendChild(contentContainer);
      }

      // Initialize screenshots carousel after modal is shown
      setTimeout(() => {
        initScreenshotCarousel(project.screenshots);
        
        // Special handling for featured projects
        if (project.featured) {
          setTimeout(() => {
            const slides = document.querySelectorAll('.featured-modal .screenshot-slide');
            slides.forEach(slide => {
              slide.style.backgroundColor = "transparent";
              slide.style.filter = "none";
              slide.style.opacity = "1";
            });
          }, 200);
        }
      }, 100);
    }
  }

  // Close modal function
  function closeProjectModal() {
    projectModal.classList.remove("active");
    document.body.style.overflow = "auto";
    
    // Clear carousel interval
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  // Unified event delegation for all modal interactions
  document.addEventListener("click", function(e) {
    // Check if clicked element is a project link
    if (e.target.closest(".project-link")) {
      e.preventDefault();
      const projectLink = e.target.closest(".project-link");
      const projectId = projectLink.getAttribute("data-project");
      if (projectId) {
        openProjectModal(projectId);
      }
    }
    
    // Check for carousel navigation
    if (e.target.closest("#screenshot-prev")) {
      e.preventDefault();
      goToSlide(currentSlide - 1);
    }
    if (e.target.closest("#screenshot-next")) {
      e.preventDefault();
      goToSlide(currentSlide + 1);
    }
  });

  modalClose.addEventListener("click", closeProjectModal);
  
  // Close modal when clicking overlay
  projectModal.addEventListener("click", function(e) {
    if (e.target === projectModal || e.target.classList.contains("modal-overlay")) {
      closeProjectModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      closeProjectModal();
    }
  });

  console.log("Project modal functionality initialized");
});