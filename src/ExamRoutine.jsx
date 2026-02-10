import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExamRoutine() {
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [admissionAmount, setAdmissionAmount] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [months, setMonths] = useState("");

  const totalAmount =
    (Number(monthlyFee) || 0) * (Number(months) || 0) +
    (Number(admissionAmount) || 0);

  const routine = [
    ["02-03-2026 MONDAY", "ENGLISH (Nursery to Class VIII)"],
    ["03-03-2026 TUESDAY", "ASSAMESE (UKG to Class VIII)"],
    ["05-03-2026 THURSDAY", "MATHEMATICS (Nursery to Class VIII)"],
    [
      "06-03-2026 FRIDAY",
      "DRAWING (Nursery to Class II)\nSST (Class III to VIII)",
    ],
    [
      "07-03-2026 SATURDAY",
      "RHYMES (Nursery & LKG)\nEVS (UKG)\nHINDI (Class I to VIII)",
    ],
    [
      "09-03-2026 MONDAY",
      "GK (Nursery to UKG)\nEVS (Class I & II)\nG. SCIENCE (Class III to VIII)",
    ],
    [
      "10-03-2026 TUESDAY",
      "CONVERSATION (Nursery to UKG)\nCOMPUTER (Class I to VIII)",
    ],
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Kaizen Academy", 105, 15, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("2nd Semester Exam, 2025-26", 105, 25, { align: "center" });
    doc.setFontSize(12);
    doc.text("Nursery to Class VIII", 105, 35, { align: "center" });
    doc.text("Full Marks: 100   Time: 3 hours", 105, 45, { align: "center" });

    // Routine Table
    autoTable(doc, {
      head: [["Day/Date", "Subject/Class (9.00 am to 12.00 noon)"]],
      body: routine,
      startY: 55,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [60, 60, 60], textColor: [255, 255, 255] },
    });

    // Notes Section
    const notes = [
      "1. The remaining oral/practical exam will be conducted between 16th to 27th March, 2026, for Class I to VIII.",
      "2. UKG Rhymes (Oral).",
      "3. Admit Cards are available for Download starting today for students who have paid fees up to March, 2026.",
      "4. Result Declaration Date: 18th March, 2026.",
      "5. Renewal Admission Schedule:",
      "   - 19/03/2026 (Nursery & LKG)",
      "   - 20/03/2026 (UKG & Class I)",
      "   - 21/03/2026 (Class II, III, IV)",
      "   - 23/03/2026 (Class V, VI, VII)",
      "   - 24/03/2026 (Class VIII, IX, X)",
      "6. Pending dues of the Students should be cleared for the Session 2025-26 within 26th February, 2026.",
    ];

    let y = doc.lastAutoTable.finalY + 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    notes.forEach((line) => {
      doc.text(line, 15, y);
      y += 5; // tighter spacing to fit one page
    });

    // Student Info + Fees
    y += 8;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Student Information", 15, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${studentName || "-"}`, 15, y);

    y += 6;
    doc.text(`Class: ${studentClass || "-"}`, 15, y);

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Pending Fees", 15, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Admission Amount: Rs.${admissionAmount || 0}`, 15, y);

    y += 6;
    doc.text(`Monthly Fee: Rs.${monthlyFee || 0}`, 15, y);

    y += 6;
    doc.text(`Months: ${months || 0}`, 15, y);

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: Rs.${totalAmount || 0}`, 15, y);

    // Signatures block (stacked neatly on the right)
    y += 14;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Principal", 140, y);

    y += 6; // spacing between lines
    doc.text("Kaizen Academy Dhakuakhana", 140, y);

    // Disclaimer at bottom of page (centered)
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginBottom = 5; // space above bottom edge

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // subtle gray for disclaimer
    doc.text(
      "This is an electronically generated document and does not require a signature.",
      105,
      pageHeight - marginBottom,
      { align: "center" },
    );

    // Save PDF
    doc.save("exam-routine.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Kaizen Academy</h1>
      <h2 className="text-xl text-center mb-6">
        2nd Semester Exam Routine (2025-26)
      </h2>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Admission Amount"
          value={admissionAmount}
          onChange={(e) => setAdmissionAmount(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Monthly Fee"
          value={monthlyFee}
          onChange={(e) => setMonthlyFee(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Fee Calculation */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <p className="font-semibold">Total Amount: ₹{totalAmount || 0}</p>
      </div>

      {/* Routine Table (on-screen only) */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border p-2">Day/Date</th>
            <th className="border p-2">Subject/Class</th>
          </tr>
        </thead>
        <tbody>
          {routine.map(([date, subject], idx) => (
            <tr key={idx}>
              <td className="border p-2">{date}</td>
              <td className="border p-2 whitespace-pre-line">{subject}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        disabled={!studentName || !studentClass}
        className={`mt-6 w-full py-2 rounded 
          ${
            !studentName || !studentClass
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
      >
        Download Routine PDF
      </button>
    </div>
  );
}
