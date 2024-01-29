<template>
  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

    <li class="nav-item">
        <router-link to="/" class="nav-link collapsed">
        <i class="bi bi-grid"></i>
        <span>Dashboard</span>
        </router-link>
    </li><!-- End Dashboard Nav -->

    <li class="nav-item">
        <router-link to="/testing" class="nav-link collapsed">
            <i class="bi bi-grid"></i>
            <span>Testing</span>
        </router-link>
    </li>

     <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#ReferenceData" data-bs-toggle="collapse" href="#">
        <i class="bi bi-database-fill-gear"></i><span>Reference Data</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="ReferenceData" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
            <router-link to="/semester" class="nav-link collapsed">
            <i class="bi bi-circle"></i><span>Semester</span>
            </router-link>
        </li>
        <li>
            <router-link to="/mata-pelajaran" class="nav-link collapsed">
            <i class="bi bi-circle"></i><span>Mata Pelajaran</span>
            </router-link>
        </li>
        <li>
            <router-link to="/base-mata-pelajaran" class="nav-link collapsed">
            <i class="bi bi-circle"></i><span>Base Mata Pelajaran</span>
            </router-link>
        </li>
        </ul>
    </li>


    <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
        <i class="bi bi-wrench"></i><span>Setup</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
            <router-link to="/roles" class="nav-link collapsed">
            <i class="bi bi-circle"></i><span>Roles</span>
            </router-link>
        </li>
        <li>
            <router-link to="/permission" class="nav-link collapsed">
            <i class="bi bi-circle"></i><span>Permission</span>
            </router-link>
        </li>
        
        </ul>
        
    </li>

   
    <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
        <i class="bi bi-gem"></i><span>Icons</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
            <a href="icons-bootstrap.html">
            <i class="bi bi-circle"></i><span>Bootstrap Icons</span>
            </a>
        </li>
        <li>
            <a href="icons-remix.html">
            <i class="bi bi-circle"></i><span>Remix Icons</span>
            </a>
        </li>
        <li>
            <a href="icons-boxicons.html">
            <i class="bi bi-circle"></i><span>Boxicons</span>
            </a>
        </li>
        </ul>
    </li>

    </ul>

    </aside><!-- End Sidebar-->
</template>