const nodemailer = require('nodemailer');
const sendEmail = require('../utils/Sendmail');
const Course = require('../models/Courses');
const User = require('../models/User');
exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalTeachers = await User.find().countDocuments({ role: 'teacher' });
  const totalStudents = await User.find().countDocuments({ role: 'student' });

  res.status(200).render('index', {
    page_name: 'index',
    courses,
    totalCourses,
    totalTeachers,
    totalStudents,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};
exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.getSendMail = async (req, res) => {
  try {
    const { recipient, subject, message, html } = req.body;

    // Verilerin doğru şekilde alındığını kontrol etmek için konsola yazdırın
    console.log('Form data received:', req.body);

    const response = await sendEmail(recipient, subject, message, html);
    req.flash('success', 'We Received your message succesfully');
    res.status(200).redirect('contact');
  } catch (error) {
    req.flash('error', `Something happened! ${error}`);
    res.status(500).redirect('contact');
  }
};
