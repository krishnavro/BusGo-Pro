
import jsPDF from "jspdf";

const generateTicket = (booking) => {
    const doc = new jsPDF();

    const bus = booking.busId;
    const passenger = booking.userId;

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("BusGo Pro", 20, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Bus Reservation Ticket", 20, 28);

    doc.line(20, 35, 190, 35);

    // Booking Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Booking Details", 20, 48);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Booking ID: ${booking._id}`, 20, 60);
    doc.text(`Passenger: ${passenger?.name || "N/A"}`, 20, 70);
    doc.text(`Email: ${passenger?.email || "N/A"}`, 20, 80);

    // Bus Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Journey Details", 20, 98);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Bus: ${bus?.busName || "N/A"}`, 20, 110);
    doc.text(`Bus Number: ${bus?.busNumber || "N/A"}`, 20, 120);
    doc.text(`From: ${bus?.from || "N/A"}`, 20, 130);
    doc.text(`To: ${bus?.to || "N/A"}`, 20, 140);
    doc.text(`Departure: ${bus?.departureTime || "N/A"}`, 20, 150);
    doc.text(`Arrival: ${bus?.arrivalTime || "N/A"}`, 20, 160);

    // Ticket Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Ticket Information", 20, 178);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Seat Number: ${booking.seatNumber}`, 20, 190);
    doc.text(`Ticket Price: Rs. ${booking.price}`, 20, 200);
    doc.text(`Status: ${booking.bookingStatus}`, 20, 210);

    // Footer
    doc.line(20, 225, 190, 225);

    doc.setFontSize(10);
    doc.text("Thank you for choosing BusGo Pro!", 20, 235);

    // Download PDF
    doc.save(`BusGo-Ticket-${booking._id}.pdf`);
};

export default generateTicket;
