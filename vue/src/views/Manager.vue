<template>
  <div class="app-container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="asideWidth" class="sidebar" :class="{ 'collapsed': isCollapse }">
        <svg width="52" height="52" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.0001 4.87499C11.5202 4.87499 10.0751 6.32915 10.0751 8.44999C10.0751 10.5708 11.5202 12.025 13.0001 12.025C13.5386 12.025 13.9751 12.4615 13.9751 13C13.9751 13.5385 13.5386 13.975 13.0001 13.975C10.1721 13.975 8.12508 11.3549 8.12508 8.44999C8.12508 5.54503 10.1721 2.92499 13.0001 2.92499C13.5386 2.92499 13.9751 3.36151 13.9751 3.89999C13.9751 4.43847 13.5386 4.87499 13.0001 4.87499Z" fill="url(#paint0_angular_513_633)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.25469 7.25476C6.20828 8.30116 6.21465 10.3513 7.7143 11.8509C9.21396 13.3506 11.2641 13.357 12.3105 12.3106C12.6913 11.9298 13.3086 11.9298 13.6894 12.3106C14.0701 12.6913 14.0701 13.3087 13.6894 13.6894C11.6897 15.6891 8.38956 15.2839 6.33545 13.2298C4.28133 11.1757 3.87615 7.87558 5.87583 5.8759C6.25659 5.49514 6.87392 5.49514 7.25469 5.8759C7.63545 6.25666 7.63545 6.87399 7.25469 7.25476Z" fill="url(#paint1_angular_513_633)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.87499 13C4.87499 14.4799 6.32915 15.925 8.44999 15.925C10.5708 15.925 12.025 14.4798 12.025 13C12.025 12.4615 12.4616 12.025 13.0001 12.025C13.5386 12.025 13.9751 12.4615 13.9751 13C13.9751 15.828 11.3549 17.875 8.44999 17.875C5.54503 17.875 2.92499 15.828 2.92499 13C2.92499 12.4615 3.36151 12.025 3.89999 12.025C4.43847 12.025 4.87499 12.4615 4.87499 13Z" fill="url(#paint2_angular_513_633)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.25479 18.7452C8.30119 19.7916 10.3513 19.7853 11.851 18.2856C13.3506 16.786 13.357 14.7358 12.3106 13.6894C11.9298 13.3087 11.9297 12.6913 12.3105 12.3106C12.6913 11.9298 13.3086 11.9298 13.6894 12.3106C15.689 14.3103 15.284 17.6104 13.2298 19.6645C11.1757 21.7186 7.87561 22.1238 5.87593 20.1241C5.49517 19.7433 5.49517 19.126 5.87593 18.7452C6.25669 18.3645 6.87402 18.3645 7.25479 18.7452Z" fill="url(#paint3_angular_513_633)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 21.125C14.4798 21.125 15.925 19.6708 15.925 17.55C15.925 15.4292 14.4799 13.975 13.0001 13.975C12.4616 13.975 12.025 13.5385 12.025 13C12.025 12.4615 12.4616 12.025 13.0001 12.025C15.8281 12.025 17.875 14.645 17.875 17.55C17.875 20.455 15.828 23.075 13 23.075C12.4615 23.075 12.025 22.6385 12.025 22.1C12.025 21.5615 12.4615 21.125 13 21.125Z" fill="url(#paint4_angular_513_633)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7454 18.7452C19.7918 17.6988 19.7854 15.6487 18.2857 14.149C16.7861 12.6494 14.7358 12.643 13.6894 13.6894C13.3086 14.0702 12.6914 14.0702 12.3106 13.6894C11.9298 13.3087 11.9297 12.6913 12.3105 12.3106C14.3102 10.3109 17.6105 10.7161 19.6646 12.7702C21.7187 14.8243 22.1239 18.1244 20.1242 20.1241C19.7435 20.5049 19.1261 20.5049 18.7454 20.1241C18.3646 19.7433 18.3646 19.126 18.7454 18.7452Z" fill="url(#paint5_angular_513_633)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1251 13C21.1251 11.5201 19.6709 10.075 17.5501 10.075C15.4292 10.075 13.9751 11.5201 13.9751 13C13.9751 13.5385 13.5386 13.975 13.0001 13.975C12.4616 13.975 12.025 13.5385 12.025 13C12.025 10.172 14.6451 8.12498 17.5501 8.12498C20.455 8.12498 23.0751 10.172 23.0751 13C23.0751 13.5385 22.6385 13.975 22.1001 13.975C21.5616 13.975 21.1251 13.5385 21.1251 13Z" fill="url(#paint6_angular_513_633)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7453 7.25475C17.6989 6.20835 15.6487 6.21471 14.1491 7.71437C12.6494 9.21403 12.643 11.2642 13.6894 12.3106C14.0701 12.6913 14.0701 13.3087 13.6894 13.6894C13.3086 14.0702 12.6914 14.0702 12.3106 13.6894C10.3109 11.6897 10.7161 8.38963 12.7702 6.33552C14.8243 4.2814 18.1244 3.87621 20.1241 5.8759C20.5049 6.25666 20.5049 6.87399 20.1241 7.25475C19.7434 7.63552 19.126 7.63552 18.7453 7.25475Z" fill="url(#paint7_angular_513_633)"/>
<defs>
<radialGradient id="paint0_angular_513_633" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13 13) rotate(107.65) scale(11.5434 11.5434)">
<stop offset="0.22998" stop-color="#66E3FF"/>
<stop offset="0.565055" stop-color="#4987FC"/>
<stop offset="0.895949" stop-color="#224994"/>
</radialGradient>
<radialGradient id="paint1_angular_513_633" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13 13) rotate(107.65) scale(11.5434 11.5434)">
<stop offset="0.22998" stop-color="#66E3FF"/>
<stop offset="0.565055" stop-color="#4987FC"/>
<stop offset="0.895949" stop-color="#224994"/>
</radialGradient>
<radialGradient id="paint2_angular_513_633" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13 13) rotate(107.65) scale(11.5434 11.5434)">
<stop offset="0.22998" stop-color="#66E3FF"/>
<stop offset="0.565055" stop-color="#4987FC"/>
<stop offset="0.895949" stop-color="#224994"/>
</radialGradient>
<radialGradient id="paint3_angular_513_633" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13 13) rotate(107.65) scale(11.5434 11.5434)">
<stop offset="0.22998" stop-color="#66E3FF"/>
<stop offset="0.565055" stop-color="#4987FC"/>
<stop offset="0.895949" stop-color="#224994"/>
</radialGradient>
<radialGradient id="paint4_angular_513_633" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13 13) rotate(107.65) scale(11.5434 11.5434)">
<stop offset="0.22998" stop-color="#66E3FF"/>
<stop offset="0.565055" stop-color="#4987FC"/>
<stop offset="0.895949" stop-color="#224994"/>
</radialGradient>
<radialGradient id="paint5_angular_513_633" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13 13) rotate(107.65) scale(11.5434 11.5434)">
<stop offset="0.22998" stop-color="#66E3FF"/>
<stop offset="0.565055" stop-color="#4987FC"/>
<stop offset="0.895949" stop-color="#224994"/>
</radialGradient>
<radialGradient id="paint6_angular_513_633" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13 13) rotate(107.65) scale(11.5434 11.5434)">
<stop offset="0.22998" stop-color="#66E3FF"/>
<stop offset="0.565055" stop-color="#4987FC"/>
<stop offset="0.895949" stop-color="#224994"/>
</radialGradient>
<radialGradient id="paint7_angular_513_633" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13 13) rotate(107.65) scale(11.5434 11.5434)">
<stop offset="0.22998" stop-color="#66E3FF"/>
<stop offset="0.565055" stop-color="#4987FC"/>
<stop offset="0.895949" stop-color="#224994"/>
</radialGradient>
</defs>
</svg>
<nav>
          <a href="#" :class="{ 'active': $route.path === '/more-model' }" @click="$router.push('/more-model')">
            <i class="el-icon-chat-line-round"></i>
            <span v-if="!isCollapse">多模型对话</span>
          </a>
          <a href="#" :class="{ 'active': $route.path === '/single-model' }" @click="$router.push('/single-model')">
            <i class="el-icon-chat-round"></i>
            <span v-if="!isCollapse">单模型对话</span>
          </a>
          <a href="#" :class="{ 'active': $route.path === '/about' }" @click="$router.push('/about')">
            <i class="el-icon-loading"></i>
            <span v-if="!isCollapse">关于</span>
          </a>
        </nav>
      </el-aside>

      <el-container class="main-container">
        <!-- 头部区域 -->
        <el-header>
          <i :class="collapseIcon" style="font-size: 26px; cursor: pointer;" @click="handleCollapse"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: $route.path }">{{ $route.meta.name }}</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="flex: 1; width: 0; display: flex; align-items: center; justify-content: flex-end">
            <i class="el-icon-full-screen" style="font-size: 26px; cursor: pointer;" @click="handleFull"></i>
            <el-dropdown placement="bottom">
              <div style="display: flex; align-items: center; cursor: pointer">
                <img :src="user.avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'" alt="" style="width: 40px; height: 40px; border-radius: 50%; margin: 0 5px">
                <span>{{ user.name }}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push('/person')">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="$router.push('/password')">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主体区域 -->
        <el-main>
          <router-view @update:user="updateUser" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Manager',
  data() {
    return {
      isCollapse: window.innerWidth <= 768, // 根据窗口大小设置初始值
      asideWidth: window.innerWidth <= 768 ? '64px' : '200px',
      collapseIcon: window.innerWidth <= 768 ? 'el-icon-s-unfold' : 'el-icon-s-fold',
      user: JSON.parse(localStorage.getItem('honey-user') || '{}'),
    };
  },
  methods: {
    handleFull() {
      document.documentElement.requestFullscreen();
    },
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.asideWidth = this.isCollapse ? '64px' : '200px';
      this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
    },
    updateUser(newUser) {
      this.user = newUser;
    },
    logout() {
      // 退出登录逻辑
    },
    handleResize() {
      if (window.innerWidth <= 768) {
        this.isCollapse = true;
        this.asideWidth = '64px';
        this.collapseIcon = 'el-icon-s-unfold';
      } else {
        this.isCollapse = false;
        this.asideWidth = '200px';
        this.collapseIcon = 'el-icon-s-fold';
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped>
.app-container {
  background-color: #8ED1FC;
  min-height: 100vh;
}

.el-container {
  height: 100vh; /* 确保容器高度为视口高度 */
}

.sidebar {
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
  padding: 10px;
  transition: width 0.3s ease;
  height: 100vh; /* 确保侧边栏高度为视口高度 */
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar nav {
  margin-top: 20px;
}

.sidebar nav a {
  display: flex;
  align-items: center;
  color: #333;
  padding: 10px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  opacity: 0.7;
}

.sidebar nav a i {
  font-size: 20px; /* 调整图标大小 */
}

.sidebar nav a:hover,
.sidebar nav a.active {
  background-color: #fff;
  color: #333;
  opacity: 1;
}

.sidebar nav a span {
  margin-left: 10px;
}

.sidebar.collapsed nav a span {
  display: none;
}

.el-header {
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
}

.el-main {
  background-color: transparent;
  color: #333;
  flex-grow: 1; /* 确保 el-main 占满剩余空间 */
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

/* 移动端自动收起侧边栏 */
@media (max-width: 768px) {
  .sidebar {
    width: 64px;
  }
  
  .sidebar.collapsed {
    width: 64px;
  }
  
  .sidebar nav a span {
    display: none;
  }
}
</style>