const cron = require("node-cron");
const BusModel = require("../models/Bus");

cron.schedule("*/5 * * * *", async () => {

    try {

        console.log("Checking completed buses...");

        const buses = await BusModel.find({
            isActive: true,
            runsDaily: false,
        });

        const now = new Date();

        for (const bus of buses) {

            if (!bus.journeyDate) {
                continue;
            }

            const journey = new Date(bus.journeyDate);

            const [time, modifier] = bus.arrivalTime.split(" ");

            let [hours, minutes] = time.split(":").map(Number);

            if (modifier === "PM" && hours !== 12) {
                hours += 12;
            }

            if (modifier === "AM" && hours === 12) {
                hours = 0;
            }

            journey.setHours(hours);
            journey.setMinutes(minutes);
            journey.setSeconds(0);
            journey.setMilliseconds(0);

            if (journey < now) {

                bus.isActive = false;

                await bus.save();

                console.log(
                    `${bus.busName} automatically deactivated.`
                );

            }

        }

    } catch (error) {

        console.log(error.message);

    }

});