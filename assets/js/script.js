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
  
  // HR Notification temporarily disabled
  /*
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
  */
  
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
  
  console.log("HR notification modal functionality initialized (currently disabled)");
  console.log("Available functions: showHRNotification(), hideHRNotification(), resetHRNotification()");

  // Skills Filter Functionality
  const skillsNavLinks = document.querySelectorAll("[data-skill-filter]");
  const skillCategories = document.querySelectorAll("[data-skill-category]");

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
          <p><strong>项目周期:</strong> 2024年，2个月</p>
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
          <p><strong>项目周期:</strong> 持续优化</p>
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
    "troubleshooting-prd": {
      title: "问题自查系统PRD",
      category: "Product Management",
      screenshots: [
        "./assets/images/project-4.png",
        "./assets/images/project-5.png",
        "./assets/images/project-6.png"
      ],
      content: `
        <div class="project-meta">
          <p><strong>项目类型:</strong> 产品需求文档 (PRD)</p>
          <p><strong>项目周期:</strong> 8周</p>
          <p><strong>团队规模:</strong> 5人</p>
          <p><strong>我的角色:</strong> 产品经理</p>
        </div>
        
        <h3>产品概述</h3>
        <p>智能问题自查系统是一个面向企业IT支持团队的自助式问题诊断与解决方案推荐平台。该系统旨在减少重复性支持工单，提升问题解决效率，改善用户体验。</p>
        
        <h3>用户需求分析</h3>
        <p><strong>痛点识别:</strong></p>
        <ul>
          <li>重复性问题占用大量支持资源（约40%的工单）</li>
          <li>用户等待时间长，平均响应时间超过2小时</li>
          <li>支持团队工作负荷不均衡，高峰期响应质量下降</li>
          <li>知识积累不足，解决方案缺乏系统性管理</li>
        </ul>
        
        <p><strong>用户画像:</strong></p>
        <ul>
          <li>主要用户：IT支持工程师（70%）- 需要快速诊断工具</li>
          <li>次要用户：系统管理员（20%）- 需要问题趋势分析</li>
          <li>终端用户：自助查询（10%）- 需要简单易用的界面</li>
        </ul>
        
        <h3>功能规格说明</h3>
        <p><strong>核心功能模块:</strong></p>
        <ul>
          <li>智能问题分类与诊断 - 基于NLP的问题自动分类</li>
          <li>解决方案知识库 - 结构化的问题-解决方案映射</li>
          <li>用户自助查询界面 - 直观的问题搜索和诊断流程</li>
          <li>支持工单自动分配 - 基于问题复杂度的智能路由</li>
          <li>问题解决效果跟踪 - 数据驱动的持续优化</li>
        </ul>
        
        <h3>技术架构设计</h3>
        <p><strong>技术栈:</strong></p>
        <ul>
          <li>前端：React + TypeScript + Ant Design</li>
          <li>后端：Node.js + Express + MongoDB</li>
          <li>AI引擎：自然语言处理 + 机器学习分类</li>
          <li>部署：Docker + Kubernetes + AWS</li>
        </ul>
        
        <h3>项目里程碑规划</h3>
        <ul>
          <li><strong>Phase 1 (4周):</strong> 需求调研与原型设计</li>
          <li><strong>Phase 2 (8周):</strong> 核心功能开发</li>
          <li><strong>Phase 3 (4周):</strong> 测试与优化</li>
          <li><strong>Phase 4 (2周):</strong> 上线与培训</li>
        </ul>
        
        <h3>项目成果</h3>
        <p>通过系统性的产品规划和执行，成功交付了问题自查系统，实现了：</p>
        <ul>
          <li>支持工单量减少60%</li>
          <li>问题解决效率提升3倍</li>
          <li>用户满意度从70%提升到90%</li>
          <li>支持团队工作效率提升40%</li>
        </ul>
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
      slide.style.backgroundColor = "var(--jet)";
      
      // Add debug info
      console.log(`Creating slide ${index + 1} with image: ${screenshot}`);
      
      slidesContainer.appendChild(slide);

      // Create dots
      const dot = document.createElement("button");
      dot.className = "screenshot-dot";
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
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

      // Find existing content area and replace it
      const existingContent = modalBody.querySelector(".project-content");
      if (existingContent) {
        existingContent.replaceWith(contentContainer);
      } else {
        // If no existing content, append to modal body
        modalBody.appendChild(contentContainer);
      }

      // Initialize screenshots carousel after modal is shown
      setTimeout(() => {
        initScreenshotCarousel(project.screenshots);
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