import React from 'react';
import styles from './Dashboard.module.css';
import { FaSearch, FaGraduationCap, FaUsers, FaBuilding, FaHandHolding } from 'react-icons/fa';
import { IoSchoolOutline } from 'react-icons/io5';
import { RiDashboardLine, RiQuestionnaireLine } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { MdUpdate } from 'react-icons/md';

const mockCourses = [
  {
    id: 1,
    title: 'Complete JavaScript',
    thumbnail: '/images/javascript.jpg',
    creator: 'Dr. Angela Yu',
    rating: 4.8,
    reviews: 1234
  },
  {
    id: 2,
    title: 'Complete ReactJS',
    thumbnail: '/images/react.jpg',
    creator: 'Dr. Angela Yu',
    rating: 4.9,
    reviews: 987
  },
  {
    id: 3,
    title: 'Complete JavaScript',
    thumbnail: '/images/js-advanced.jpg',
    creator: 'Dr. Angela Yu',
    rating: 4.7,
    reviews: 2341
  },
  {
    id: 4,
    title: 'Complete JavaScript',
    thumbnail: '/images/excel.jpg',
    creator: 'Dr. Angela Yu',
    rating: 4.9,
    reviews: 1567
  }
];

const sidebarItems = [
  { icon: <RiDashboardLine />, label: 'Startup' },
  { icon: <IoSchoolOutline />, label: 'Colleges' },
  { icon: <FaGraduationCap />, label: 'Students' },
  { icon: <FaBuilding />, label: 'Government' },
  { icon: <FaHandHolding />, label: 'NGO' },
  { icon: <FaUsers />, label: 'Groups' },
  { icon: <FaBuilding />, label: 'SME' },
  { icon: <FaBuilding />, label: 'Corporate' },
  { icon: <RiQuestionnaireLine />, label: 'FAQ' },
  { icon: <BiSupport />, label: 'Support' },
  { icon: <MdUpdate />, label: 'Update' },
  { icon: <FiSettings />, label: 'Settings' },
  { icon: <FiLogOut />, label: 'Logout' },
];

const Dashboard = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="OriginHash" />
        </div>
        <nav>
          {sidebarItems.map((item, index) => (
            <a key={index} href="#" className={styles.sidebarItem}>
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <FaSearch />
            <input type="text" placeholder="Search here..." />
          </div>
          <div className={styles.userProfile}>
            <img src="/profile-pic.jpg" alt="User Profile" />
          </div>
        </header>

        {/* Services Section */}
        <section className={styles.services}>
          <h2>Range of <span>Our Services</span></h2>
          <p>Click on any card below to know more about the service</p>
          
          <h3>Recommended courses</h3>
          <div className={styles.courseGrid}>
            {mockCourses.map(course => (
              <div key={course.id} className={styles.courseCard}>
                <img src={course.thumbnail} alt={course.title} />
                <div className={styles.courseInfo}>
                  <h4>{course.title}</h4>
                  <p>{course.creator}</p>
                  <div className={styles.rating}>
                    {'★'.repeat(Math.floor(course.rating))}
                    <span>({course.reviews})</span>
                  </div>
                  <button className={styles.knowMore}>Know more</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.viewMore}>
            <a href="#">click here to know more</a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

