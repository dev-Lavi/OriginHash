import React, { useState } from 'react';
import axios from 'axios';
import styles from './IssueCertificate.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:4001/api/v1/certs/issue';

const IssueCertificate = () => {
  const [form, setForm] = useState({
    studentEmail: '',
    studentName: '',
    courseName: '',
    issueDate: '',
    expiryDate: '',
  });
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setShowPreview(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(
        API_URL,
        {
          studentEmail: form.studentEmail,
          studentName: form.studentName,
          courseName: form.courseName,
          issueDate: form.issueDate,
          expiryDate: form.expiryDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setResponse(res.data.certificate);
      setShowPreview(true);
      toast.success("Certificate issued successfully!");
    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred';
      setError(message);
      setShowPreview(false);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.issueWrapper}>
      <ToastContainer />
      <h2>Issue Certificate</h2>
      <div className={styles.issueContainer}>
        {/* Left: Preview Section */}
        <div className={styles.previewSection}>
          <h3>PREVIEW</h3>
          <div className={styles.certificatePreview}>
            {showPreview && response ? (
              <>
                <div className={styles.certificateCard}>
                  <div className={styles.certificateTitle}>CERTIFICATE OF APPRECIATION</div>
                  <div className={styles.certificateRecipient}>{response.studentName}</div>
                  <div className={styles.certificateCourse}>For {response.courseName}</div>
                  <div className={styles.certificateDates}>
                    <span>Issued: {new Date(response.issueDate).toLocaleDateString()}</span>
                    <span>Expires: {new Date(response.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.certificateId}>Certificate ID: {response.uniqueId}</div>
                </div>
                <a href={response.pngUrl} download className={styles.downloadLink}>Download PNG</a>
                <a href={response.pdfUrl} download className={styles.downloadLink}>Download PDF</a>
              </>
            ) : (
              <div className={styles.placeholderPreview}>
                Fill the details and click Issue to preview certificate.
              </div>
            )}
          </div>
        </div>

        {/* Right: Form Section */}
        <form className={styles.formSection} onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              required
              name="studentEmail"
              value={form.studentEmail}
              onChange={handleChange}
            />
          </label>
          <label>
            Username
            <input
              type="text"
              required
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
            />
          </label>
          <label>
            Course name
            <input
              type="text"
              required
              name="courseName"
              value={form.courseName}
              onChange={handleChange}
            />
          </label>
          <label>
            Issue date
            <input
              type="date"
              required
              name="issueDate"
              value={form.issueDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Expiry date
            <input
              type="date"
              required
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Issuing..." : "Issue"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default IssueCertificate;
