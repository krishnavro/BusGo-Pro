
import jsPDF from "jspdf";

const generateTicket = (booking) => {
    try {
        const doc = new jsPDF();

        const bus = booking.busId || {};
        const passenger = booking.userId || {};

        const pageWidth = 210;
        const left = 20;
        const right = 190;
        const contentWidth = right - left;

        // Basic formatting
        const formatDate = (date) => {
            if (!date) return "N/A";

            return new Date(date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
        };

        // Text helper
        const heading = (text, y) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(20, 20, 20);
            doc.text(text, left, y);

            doc.setDrawColor(70, 70, 70);
            doc.setLineWidth(0.3);
            doc.line(left, y + 3, right, y + 3);
        };

        // Table row helper
        const tableRow = (label, value, y, labelWidth = 55) => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);

            doc.text(label, left + 3, y);

            doc.setFont("helvetica", "bold");
            doc.setTextColor(20, 20, 20);

            const valueLines = doc.splitTextToSize(
                String(value ?? "N/A"),
                contentWidth - labelWidth - 8
            );

            doc.text(valueLines.slice(0, 2), left + labelWidth, y);

            return y + Math.max(9, valueLines.slice(0, 2).length * 5 + 4);
        };

        // =========================
        // HEADER
        // =========================

        doc.setFont("helvetica", "bold");
        doc.setFontSize(23);
        doc.setTextColor(0, 0, 0);

        doc.text("BUSGO PRO", pageWidth / 2, 25, {
            align: "center",
        });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);

        doc.text("BUS RESERVATION TICKET", pageWidth / 2, 33, {
            align: "center",
        });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        doc.text("Electronic Travel Ticket", pageWidth / 2, 39, {
            align: "center",
        });

        doc.setDrawColor(30, 30, 30);
        doc.setLineWidth(0.6);
        doc.line(left, 46, right, 46);

        // =========================
        // BOOKING INFORMATION
        // =========================

        let y = 57;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);

        doc.text("Booking ID:", left, y);

        doc.setFont("helvetica", "normal");
        doc.text(String(booking._id || "N/A"), left + 28, y);

        doc.setFont("helvetica", "bold");
        doc.text("Status:", 140, y);

        doc.setFont("helvetica", "normal");
        doc.text(booking.bookingStatus || "N/A", 157, y);

        y += 9;

        doc.setFont("helvetica", "bold");
        doc.text("Booking Date:", left, y);

        doc.setFont("helvetica", "normal");
        doc.text(formatDate(booking.bookingDate), left + 28, y);

        doc.setDrawColor(130, 130, 130);
        doc.line(left, y + 6, right, y + 6);

        // =========================
        // JOURNEY DETAILS
        // =========================

        y += 18;

        heading("JOURNEY DETAILS", y);

        y += 15;

        // Journey table header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);

        doc.text("FROM", left + 3, y);
        doc.text("TO", 115, y);

        y += 8;

        doc.setFontSize(15);
        doc.text(bus.from || "N/A", left + 3, y);
        doc.text(bus.to || "N/A", 115, y);

        y += 9;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text("Departure Time", left + 3, y);
        doc.text("Arrival Time", 115, y);

        y += 7;

        doc.setFont("helvetica", "bold");
        doc.text(bus.departureTime || "N/A", left + 3, y);
        doc.text(bus.arrivalTime || "N/A", 115, y);

        y += 10;

        doc.setDrawColor(180, 180, 180);
        doc.line(left, y, right, y);

        // =========================
        // PASSENGER DETAILS
        // =========================

        y += 13;

        heading("PASSENGER DETAILS", y);

        y += 14;

        y = tableRow("Passenger Name", passenger.name, y);
        y = tableRow("Email Address", passenger.email, y);
        y = tableRow("Seat Number", booking.seatNumber, y);

        doc.setDrawColor(180, 180, 180);
        doc.line(left, y, right, y);

        // =========================
        // BUS DETAILS
        // =========================

        y += 13;

        heading("BUS DETAILS", y);

        y += 14;

        y = tableRow("Bus Name", bus.busName, y);
        y = tableRow("Bus Number", bus.busNumber, y);
        y = tableRow("Ticket Price", `Rs. ${booking.price ?? "N/A"}`, y);

        // =========================
        // FOOTER
        // =========================

        y += 8;

        doc.setDrawColor(30, 30, 30);
        doc.setLineWidth(0.5);
        doc.line(left, y, right, y);

        y += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);

        doc.text(
            "Please carry a valid ID proof during boarding.",
            pageWidth / 2,
            y,
            { align: "center" }
        );

        y += 9;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);

        doc.text(
            "Thank you for choosing BusGo Pro!",
            pageWidth / 2,
            y,
            { align: "center" }
        );

        y += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        doc.text(
            "Have a safe and comfortable journey.",
            pageWidth / 2,
            y,
            { align: "center" }
        );

        // Download PDF
        doc.save(`BusGo-Ticket-${booking._id}.pdf`);

    } catch (error) {
        console.error("Ticket generation failed:", error);
        alert("Unable to generate ticket. Please try again.");
    }
};

export default generateTicket;
