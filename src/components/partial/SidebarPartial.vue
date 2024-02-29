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
        <li>
            <router-link to="/base-kelas" class="nav-link collapsed">
            <i class="bi bi-circle"></i><span>Base Kelas</span>
            </router-link>
        </li>
        <li>
            <router-link to="/siswa" class="nav-link collapsed">
            <i class="bi bi-circle"></i><span>Siswa</span>
            </router-link>
        </li>
        <li>
            <router-link to="/guru" class="nav-link collapsed">
            <i class="bi bi-circle"></i><span>Guru</span>
            </router-link>
        </li>
        <li>
            <router-link to="/orangtua" class="nav-link collapsed">
            <i class="bi bi-circle"></i><span>Orang Tua (Wali)</span>
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

    </ul>

    </aside><!-- End Sidebar-->
</template>